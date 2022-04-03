import { cloneDeep } from '@apollo/client/utilities';
import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import * as api from '../api-client';
import { urlToFile } from '../api-client';
import * as core from '../core-api/core';
import { AssignedTopic, Content, Location, Section, Topic } from '../models';
import { AppState } from './../store';
import { rehydrateContent } from './contentSlice';
import { addNewLanguageIds, removeNewLanguageIds } from './editorSlice';
import { fetchSections, rehydrateSection } from './sectionSlice';
import { fetchTopics, refreshTopic, rehydrateTopic } from './topicSlice';

export interface LocationState {
  locations: Location[];
  selectedLocation: Location;
  isLoading: boolean;
  original: Location;
}

export type AppChangedPayload = {
  key: string;
  value: any;
};

export type LogoChangePayload = {
  name: string;
  url: string;
};

const initLocationState: LocationState = {
  locations: [],
  selectedLocation: null,
  isLoading: false,
  original: null,
};

export const fetchAllLocations = createAsyncThunk<Location[], void, { state: AppState }>(
  'location/fetchAllLocations',
  async (_, { dispatch }) => {
    const locations = await api.getAllLocations();
    const id = locations[0].id;
    dispatch(fetchSections(id));
    dispatch(fetchTopics(id));
    return locations;
  }
);

export const fetchLocationsByEmail = createAsyncThunk<Location[], string, { state: AppState }>(
  'location/fetchLocationsByEmail',
  async (email: string, { dispatch }) => {
    const locations = await api.getLocationsByEmail(email);
    const id = locations[0].id;
    dispatch(fetchSections(id));
    dispatch(fetchTopics(id));
    return locations;
  }
);

export const fetchLocation = createAsyncThunk<Location, string, { state: AppState }>(
  'location/fetchLocation',
  async (id: string, { dispatch }) => {
    // dispatch other actions to populate our store
    dispatch(fetchSections(id));
    dispatch(fetchTopics(id));
    const location = await api.getLocationById(id);
    if (!location.supportedLanguages.includes(location.defaultLanguage)) {
      location.supportedLanguages.push(location.defaultLanguage);
    }
    return location;
  }
);

export const saveLocation = createAsyncThunk<Location, Partial<Location>, { state: AppState }>(
  'location/saveLocation',
  async (locationUpdates: Partial<Location>, { getState, dispatch }) => {
    const isOrg = getState().editor.isOrg;
    const location = { ...getState().location.selectedLocation, ...locationUpdates }; //injects any optional updates before saving the selectedLocation

    if (isOrg) {
      if (location.headerLogo.includes('blob')) {
        const file = await urlToFile(location.headerLogo, location.headerLogoImageName);
        await api.saveHeaderLogo(location, file);
      }
      await api.saveLocation(location);
    } else {
      const organizationId = getState().location.selectedLocation?.organizationId;
      await core.saveLocationCore(organizationId, location);
    }
    return location;
  }
);

export const saveCustomQr = createAsyncThunk<Location, void, { state: AppState }>(
  'location/saveCustomQr',
  async (_, { getState, dispatch }) => {
    const isOrg = getState().editor.isOrg;
    const location = { ...getState().location.selectedLocation }; //gets QR changes from state
    const topic = { ...getState().topic.selectedTopic };

    if (isOrg) {
      if (location.customQrLogo.includes('blob')) {
        const logoFile = await urlToFile(location.customQrLogo, location.customQrLogoImageName);
        await api.saveQrLogo(location, logoFile);
      } else {
        await api.saveLocation(location);
      }
    } else {
      const organizationId = getState().location.selectedLocation?.organizationId;
      if (location.customQrLogo.includes('blob')) {
        await core.saveQrLogoCore(organizationId, location);
      } else {
        await core.saveLocationCore(organizationId, location);
      }
    }

    dispatch(refreshTopic(topic.id));

    return location;
  }
);

export const saveSectionOrder = createAsyncThunk<
  { locationId: string; sectionOrder: string[] },
  { locationId: string; sectionOrder: string[]; skip?: boolean },
  { state: AppState }
>(
  'location/saveSectionOrder',
  async (
    { locationId, sectionOrder, skip }: { locationId: string; sectionOrder: string[]; skip: boolean },
    { getState }
  ) => {
    const isOrg = getState().editor.isOrg;
    const organizationId = getState().location.selectedLocation?.organizationId;
    if (isOrg) {
      api.saveSectionOrder(locationId, sectionOrder);
    } else if (!skip) {
      core.saveSectionOrderCore(organizationId, locationId, sectionOrder);
    }
    return { locationId, sectionOrder };
  }
);

export const saveLanguages = createAsyncThunk<Topic[], void, { state: AppState }>(
  'location/saveLanguages',
  async (_, { getState, dispatch }) => {
    const isOrg = getState().editor.isOrg;
    const organizationId = getState().location.selectedLocation?.organizationId;
    const selectedLocation = getState().location.selectedLocation;
    const topicId = getState().topic.selectedTopic.id;
    const selectedLocationLanguages = selectedLocation.supportedLanguages;
    const locationLanguages = getState().location.locations.find(
      (location) => location.id === selectedLocation.id
    ).supportedLanguages;
    const addLanguages = selectedLocationLanguages.filter((lang) => !locationLanguages.includes(lang));

    const removeLanguages = locationLanguages.filter((lang) => !selectedLocationLanguages.includes(lang));

    var updatedTopics: Topic[];
    var updatedSections: Section[];

    if (addLanguages.length > 0 || removeLanguages.length > 0) {
      const sections = cloneDeep(getState().section.sections);
      const topics = cloneDeep(getState().topic.topics);
      const defaultLanguage = getState().location.selectedLocation.defaultLanguage;

      updatedTopics = await Promise.all(
        topics.map(async (topic) => {
          const contents = await api.getContentByTopicId(topic.id);
          var updatedContents: Content[] = contents;

          removeLanguages.forEach((code) => {
            //removing from content
            updatedContents = updatedContents.map((content) => {
              const languages = content.languages.filter((content) => content.language !== code);
              return { ...content, languages };
            });

            //removing from topic
            topic.name = topic.name.filter((languageName) => languageName.language !== code);
          });

          addLanguages.forEach((code) => {
            //adding to content
            const newLanguageContents = updatedContents.map((content) => {
              const defaultContent = content.languages.find((lang) => lang.language === defaultLanguage);
              const language = defaultContent.fileName
                ? { ...defaultContent, language: code, fileName: `${code}+${defaultContent.fileName}` }
                : { ...defaultContent, language: code };
              return content.languages.concat(language);
            });
            updatedContents = updatedContents.map((content, index) => {
              return { ...content, languages: newLanguageContents[index] };
            });

            //adding to topic
            const defaultTopicName = topic.name.find((langName) => langName.language === defaultLanguage).name;
            topic.name.push({ name: defaultTopicName, language: code });
          });

          const assignedTopic = new AssignedTopic({ _id: topic.id, name: topic.name });
          const orgId = topic.organizationId;

          for (const content of updatedContents) {
            if (content._id.startsWith('local-')) {
              content._id = '';
              content.assignedTopics = [assignedTopic];
              content.organizationId = orgId;
            }
            let id: string;
            if (isOrg) {
              id = await api.saveContent(content);
            } else {
              id = await core.saveContentCore(organizationId, content);
            }
            if (content._id === '') {
              content._id = id;
            }
          }

          const topicFull = { ...topic, contentExpanded: updatedContents };
          if (isOrg) {
            await api.saveTopic(topicFull);
          } else {
            await core.saveTopicCore(organizationId, topicFull);
          }
          return topicFull;
        })
      );

      updatedSections = await Promise.all(
        sections.map(async (section) => {
          removeLanguages.forEach((code) => {
            section.name = section.name.filter((languageName) => languageName.language !== code);
          });
          addLanguages.forEach((code) => {
            const defaultSectionName = section.name.find((langName) => langName.language === defaultLanguage).name;
            section.name.push({ name: defaultSectionName, language: code });
          });
          if (isOrg) {
            await api.saveSection(section);
          } else {
            await core.saveSectionCore(organizationId, section);
          }
          return section;
        })
      );

      if (isOrg) {
        await api.saveLocation(selectedLocation);
      } else {
        await core.saveLocationCore(organizationId, selectedLocation);
      }
      dispatch(rehydrateLocations(selectedLocation));
      dispatch(rehydrateSection(updatedSections));
      dispatch(rehydrateTopic({ topics: updatedTopics, id: topicId }));
      dispatch(rehydrateContent(updatedTopics.find((topic) => topic.id === topicId).contentExpanded));

      // update array of entity ids that had a language added or removed, for triggering 50% opaque overlay
      let sectionIds = [],
        topicIds = [],
        contentIds = []; // dont add locationIds - no language specific props
      sectionIds = selectedLocation.sectionOrder;
      updatedSections.forEach((section) => {
        topicIds = [...topicIds, ...section.topicOrder];
      });
      updatedTopics.forEach((topic) => {
        contentIds = [...contentIds, ...topic.content];
      });

      removeLanguages.forEach((lang) => {
        dispatch(removeNewLanguageIds({ language: lang, ids: [...sectionIds, ...topicIds, ...contentIds] }));
      });
      addLanguages.forEach((lang) => {
        dispatch(addNewLanguageIds({ language: lang, ids: [...sectionIds, ...topicIds, ...contentIds] }));
      });
    }
    return updatedTopics ?? null;
  }
);

//TODO: populate available locations with a Thunk - use getLocationsByOrgId api

const locationSlice = createSlice({
  name: 'location',
  initialState: initLocationState,
  reducers: {
    rehydrateLocations(state: LocationState, action: PayloadAction<Location>) {
      state.locations = state.locations.map((location) => {
        location = location.id === action.payload.id ? action.payload : location;
        return location;
      });
    },
    loadAllLocations(state: LocationState, action: PayloadAction<Location[]>) {
      state.locations = action.payload.sort((a, b) => (a.name > b.name ? 1 : -1));
    },
    changeHeaderLogo(state: LocationState, action: PayloadAction<LogoChangePayload>) {
      state.selectedLocation.headerLogoImageName = action.payload.name;
      state.selectedLocation.headerLogo = action.payload.url;
    },
    changeLocationName(state: LocationState, action: PayloadAction<string>) {
      state.selectedLocation.name = action.payload;
    },
    changeCompanyName(state: LocationState, action: PayloadAction<string>) {
      state.selectedLocation.companyName = action.payload;
    },
    changeQrLogo(state: LocationState, action: PayloadAction<LogoChangePayload>) {
      state.selectedLocation.customQrLogo = action.payload.url;
      state.selectedLocation.customQrLogoImageName = action.payload.name;
    },
    changeQrPrimaryColor(state: LocationState, action: PayloadAction<string>) {
      state.selectedLocation.customQrColorPrimary = action.payload;
    },
    changeQrSecondaryColor(state: LocationState, action: PayloadAction<string>) {
      state.selectedLocation.customQrColorSecondary = action.payload;
    },
    addSupportedLanguage(state: LocationState, action: PayloadAction<string>) {
      state.selectedLocation.supportedLanguages.push(action.payload);
    },
    removeSupportedLanguage(state: LocationState, action: PayloadAction<string>) {
      const index = state.selectedLocation.supportedLanguages.indexOf(action.payload);
      if (index > -1) {
        state.selectedLocation.supportedLanguages.splice(index, 1);
      }
    },
    changeDefaultLanguage(state: LocationState, action: PayloadAction<string>) {
      state.selectedLocation.defaultLanguage = action.payload;
    },
    leaveWithoutSaving(state: LocationState) {
      state.selectedLocation = state.original;
    },
  },
  extraReducers: (builder) => {
    // this is temporary. Eventually when we support multiple apps a new extraReducer will be needed fetching all locations
    builder.addCase(fetchLocation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedLocation = action.payload;
      state.original = action.payload;
      state.locations.push(action.payload);
    });
    builder.addCase(fetchAllLocations.fulfilled, (state, action) => {
      state.locations = action.payload;
      state.selectedLocation = action.payload[0];
      state.isLoading = false;
    });
    builder.addCase(fetchLocationsByEmail.fulfilled, (state, action) => {
      state.locations = action.payload;
      state.selectedLocation = action.payload[0];
      state.isLoading = false;
    });
    builder.addCase(saveLanguages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(saveLanguages.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(saveLanguages.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchAllLocations.rejected, () => {});
    builder.addCase(saveSectionOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedLocation.sectionOrder = action.payload.sectionOrder;
      state.locations.find((location) => location.id === action.payload.locationId).sectionOrder =
        action.payload.sectionOrder;
    });

    builder
      // same reducer for multiple actions
      .addMatcher(
        isAnyOf(
          saveLocation.pending,
          saveSectionOrder.pending,
          fetchLocation.pending,
          fetchAllLocations.pending,
          fetchLocationsByEmail.pending,
          saveCustomQr.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          saveLocation.rejected,
          saveSectionOrder.rejected,
          fetchLocation.rejected,
          fetchLocationsByEmail.rejected,
          saveCustomQr.rejected
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(isAnyOf(saveLocation.fulfilled, saveCustomQr.fulfilled), (state, action) => {
        state.isLoading = false;
        //update the selectedLocation
        state.selectedLocation = action.payload;
        //update the original
        state.original = action.payload;
        //update the item in locations[]
        state.locations = state.locations.map((l) => {
          if (l.id === action.payload.id) {
            return action.payload;
          }
          return l;
        });
      });
  },
});

// Export reducer
export default locationSlice.reducer;

// Export actions
export const {
  loadAllLocations,
  changeHeaderLogo,
  changeLocationName,
  changeCompanyName,
  changeQrLogo,
  changeQrPrimaryColor,
  changeQrSecondaryColor,
  changeDefaultLanguage,
  addSupportedLanguage,
  removeSupportedLanguage,
  rehydrateLocations,
  leaveWithoutSaving,
} = locationSlice.actions;

// Export selectors
export const _locations = (state) => state.location.locations;
export const _selectedLocation = (state) => state.location.selectedLocation;
export const _appName = (state) => state.location.selectedLocation?.name;
export const _headerLogo = (state) => state.location.selectedLocation?.headerLogo;
export const _qrLogo = (state) => state.location.selectedLocation?.customQrLogo;
export const _qrPrimary = (state) => state.location.selectedLocation?.customQrColorPrimary;
export const _qrSecondary = (state) => state.location.selectedLocation?.customQrColorSecondary;
export const _locationIsLoading = (state) => state.location.isLoading; //state.isLoading;
export const _defaultLanguage = (state) => state.location.selectedLocation?.defaultLanguage;
export const _supportedLanguages = (state) => state.location.selectedLocation?.supportedLanguages;
export const _sectionOrder = (state) => state.location.selectedLocation?.sectionOrder;
export const _organizationId = (state) => state.location.selectedLocation?.organizationId;
