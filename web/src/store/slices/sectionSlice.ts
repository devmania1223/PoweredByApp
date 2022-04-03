import { cloneDeep } from '@apollo/client/utilities';
import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import * as api from '../api-client';
import * as core from '../core-api/core';
import { newSection, Section } from '../models';
import { AppState } from '../store';
import { saveSectionOrder } from './locationSlice';
import { addTopic } from './topicSlice';

export interface SectionState {
  sections: Section[];
  selectedSection: Section;
  isLoading: boolean;
}

const initSectionState: SectionState = {
  sections: [],
  selectedSection: null,
  isLoading: false,
};

export const fetchSections = createAsyncThunk<Section[], string, { state: AppState }>(
  'section/fetchSections',
  async (locationId: string, { dispatch }) => {
    const sections = await api.getSectionsByLocationId(locationId);
    return sections;
  }
);

export const saveSection = createAsyncThunk<Section, Partial<Section>, { state: AppState }>(
  'content/saveSection',
  async (sectionUpdates: Partial<Section>, { getState }) => {
    const isOrg = getState().editor.isOrg;
    let selectedSection = getState().section.selectedSection;

    if (sectionUpdates.name) {
      //cast to array of Titles
      sectionUpdates.name = selectedSection.name.map((title) => {
        if (title.language === sectionUpdates.name.language) {
          return sectionUpdates.name;
        }
        return title;
      });
    }

    const section = { ...getState().section.selectedSection, ...sectionUpdates }; //injects any optional updates before saving

    if (isOrg) {
      await api.saveSection(section);
    } else {
      const organizationId = getState().location.selectedLocation?.organizationId;
      await core.saveSectionCore(organizationId, section);
    }
    return section;
  }
);

export const saveTopicOrder = createAsyncThunk<
  { sectionId: string; topicOrder: string[] },
  { sectionId: string; topicOrder: string[] },
  { state: AppState }
>('section/saveTopicOrder', async (payload: { sectionId: string; topicOrder: string[] }, { getState }) => {
  const isOrg = getState().editor.isOrg;
  if (isOrg) {
    api.saveTopicOrder(payload.sectionId, payload.topicOrder);
  } else {
    const organizationId = getState().location.selectedLocation?.organizationId;
    core.saveTopicOrderCore(organizationId, { id: payload.sectionId, exhibitOrder: payload.topicOrder });
  }
  return payload;
});

export const addSection = createAsyncThunk<Section, string, { state: AppState }>(
  'section/addSection',
  async (sectionName: string, { getState, dispatch }) => {
    const locationId = getState().location.selectedLocation.id;
    const sectionOrder = getState().location.selectedLocation.sectionOrder;
    const languages = getState().location.selectedLocation.supportedLanguages;
    const isOrg = getState().editor.isOrg;

    let section = createNewSection(locationId, sectionName, languages);

    if (isOrg) {
      section = await api.saveSection(section);
    } else {
      const organizationId = getState().location.selectedLocation?.organizationId;
      section = await core.saveSectionCore(organizationId, section);
    }
    section = await api.getSectionById(section);

    var newSectionOrder = [...sectionOrder, section.id];
    dispatch(saveSectionOrder({ locationId, sectionOrder: newSectionOrder, skip: true }));
    dispatch(addTopic({ sectionId: section.id, topicOrder: [] }));

    return section;
  }
);

export const deleteSection = createAsyncThunk<Section, string, { state: AppState }>(
  'section/deleteSection',
  async (sectionId: string, { getState, dispatch }) => {
    const isOrg = getState().editor.isOrg;
    const sections = getState().section.sections;
    let section = sections.find((section) => section.id === sectionId);

    if (isOrg) {
      await api.deleteSection(section);
    } else {
      const organizationId = getState().location.selectedLocation?.organizationId;
      await core.deleteSectionCore(organizationId, section);
    }

    const updatedSectionOrder = sections.filter((section) => section.id !== sectionId).map((section) => section.id);
    dispatch(saveSectionOrder({ locationId: section.locationId, sectionOrder: updatedSectionOrder, skip: true }));

    const topicId = getState().topic.selectedTopic.id;
    if (section.topicOrder.includes(topicId)) {
      const locationId = getState().location.selectedLocation.id;
      const nextTopicId = getState().section.sections[0].topicOrder[0];
      dispatch(push(`app-editor?locationId=${locationId}&topicId=${nextTopicId}`));
    }

    return sectionId;
  }
);

export const reorderSection = createAsyncThunk<Section[], { oldIndex: number; newIndex: number }, { state: AppState }>(
  'section/reorderSection',
  async (payload: { oldIndex: number; newIndex: number }, { getState, dispatch }) => {
    const locationId = getState().location.selectedLocation.id;
    //changing sectionOrder
    let sectionOrder = cloneDeep(getState().location.selectedLocation.sectionOrder);
    const tempSectionId = sectionOrder[payload.oldIndex];
    sectionOrder.splice(payload.oldIndex, 1);
    sectionOrder.splice(payload.newIndex, 0, tempSectionId);
    dispatch(saveSectionOrder({ locationId, sectionOrder }));

    //changing section
    let sections = cloneDeep(getState().section.sections);
    const tempSection = sections[payload.oldIndex];
    sections.splice(payload.oldIndex, 1);
    sections.splice(payload.newIndex, 0, tempSection);

    return sections;
  }
);

const sectionSlice = createSlice({
  name: 'section',
  initialState: initSectionState,
  reducers: {
    selectSection(state: SectionState, action: PayloadAction<string>) {
      // update the selectedSection to match selectedTopic.sectionId
      // this is just temporary, until we're able to select a section in UI
      state.selectedSection = state.sections.find((section) => section.id === action.payload);
    },
    addLanguageSection(state: SectionState, action: PayloadAction<{ languageCode: string; defaultLanguage: string }>) {
      const sections = state.sections;
      sections.forEach((section) => {
        const defaultName = section.name.find((langName) => langName.language === action.payload.defaultLanguage).name;
        section.name.push({ name: defaultName, language: action.payload.languageCode });
      });
    },
    rehydrateSection(state: SectionState, action: PayloadAction<Section[]>) {
      state.sections = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sections = action.payload;
      })
      .addCase(saveSection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedSection = action.payload;
        state.sections = state.sections.map((section) => {
          if (section.id === action.payload.id) {
            return action.payload;
          }
          return section;
        });
      })
      .addCase(saveTopicOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        // TODO: revisit selecting a section
        // state.selectedSection.topicOrder = action.payload.topicOrder;
        state.sections.find((section) => section.id === action.payload.sectionId).topicOrder =
          action.payload.topicOrder;
      })
      .addCase(addSection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedSection = action.payload;
        state.sections = [...state.sections, state.selectedSection];
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sections = state.sections.filter((section) => section.id !== action.payload);
      })
      .addCase(reorderSection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sections = action.payload;
      });

    builder
      // isLoading while async ops are pending
      .addMatcher(
        isAnyOf(
          addSection.pending,
          saveSection.pending,
          deleteSection.pending,
          fetchSections.pending,
          saveTopicOrder.pending,
          reorderSection.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      // !isLoading if async op failed
      .addMatcher(
        isAnyOf(
          addSection.rejected,
          saveSection.rejected,
          deleteSection.rejected,
          fetchSections.rejected,
          saveTopicOrder.rejected,
          reorderSection.rejected
        ),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

// Export reducer
export default sectionSlice.reducer;

// Export actions
export const { selectSection, addLanguageSection, rehydrateSection } = sectionSlice.actions;

// Export selectors
export const _sections = (state) => state.section.sections;
export const _selectedSection = (state) => state.section.selectedSection;
export const _section = (state) => state.section.selectedSection;
export const _sectionIsLoading = (state) => state.section.isLoading;
export const _topicOrder = (state) =>
  Object.assign({}, ...state.section.sections.map((section) => ({ [section.id]: section.topicOrder })));

export const createNewSection = (locationId: string, sectionName: string, languages: string[]) => {
  const languageNames = languages.map((language) => {
    return { name: sectionName, language };
  });

  const section = newSection({
    id: '',
    name: languageNames,
    status: 1,
    exhibits: [],
    exhibitOrder: [],
    topicOrder: [],
    locationId: locationId,
    organizationId: '',
  });

  return section;
};
