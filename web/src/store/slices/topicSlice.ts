import { cloneDeep } from '@apollo/client/utilities';
import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import * as api from '../api-client';
import * as core from '../core-api/core';
import { newTopic, Status, Title, Topic } from '../models';
import { AppState } from '../store';
import { ContentReorderPayload, fetchContents } from './contentSlice';
import { setQrZip } from './editorSlice';
import { saveTopicOrder, selectSection } from './sectionSlice';

export interface TopicState {
  topics: Topic[];
  selectedTopic: Topic;
  isLoading: boolean;
}

export type BackgroundPayload = {
  name: string;
  url: string;
};

export type UploadImage = {
  preview: string;
  file: File;
};

const initTopicState: TopicState = {
  topics: [],
  selectedTopic: null,
  isLoading: false,
};

// FETCH ALL TOPICS
export const fetchTopics = createAsyncThunk<Topic[], string, { state: AppState }>(
  'topic/fetchTopics',
  async (locationId: string, { dispatch }) => {
    // TODO: probably don't want to hydrate based on location, rather by selected section? (see "getTopicsBySectionId" in api-client)
    // not using sections yet, so doing this for now
    let topics = await api.getTopicsByLocationId(locationId);
    topics = await Promise.all(
      topics.map(async (topic) => {
        let qrZip = await api.getZipPath('topic', topic.id);
        return { ...topic, qrZip };
      })
    );

    // TEMP: Select section based on first topic's sectionId
    let firstTopic = topics[0];
    dispatch(selectSection(firstTopic.sectionId));

    // automatically route to first topic for now. When a topic is chosen in the editor, it will replace the selectedTopic
    // dispatch(push(`app-editor?locationId=${locationId}&topicId=${firstTopic.id}`));
    dispatch(selectTopic(firstTopic.id));
    return topics;
  }
);

export const checkQrStatus = createAsyncThunk<void, string, { state: AppState }>(
  'topic/checkQrStatus',
  async (topicId: string, { dispatch, getState }) => {
    const locationQrUpdateTime = parseInt(getState().location.selectedLocation.qrUpdatedAt.$date.$numberLong);
    const topicQrUpdateTime = parseInt(
      getState().topic?.topics?.find(({ id }) => id === topicId)?.qrUpdatedAt?.$date?.$numberLong
    );

    if (topicQrUpdateTime < locationQrUpdateTime) {
      dispatch(refreshTopic(topicId));
    }
    return;
  }
);

// SELECT A TOPIC
export const selectTopic = createAsyncThunk<{ topicId: string; topicBackground: string }, string, { state: AppState }>(
  'topic/selectTopic',
  async (topicId: string, { dispatch, getState }) => {
    const locationQrUpdateTime = parseInt(getState().location?.selectedLocation?.qrUpdatedAt?.$date?.$numberLong);
    const topicQrUpdateTime = parseInt(
      getState().topic?.topics?.find(({ id }) => id === topicId)?.qrUpdatedAt?.$date?.$numberLong
    );

    if (topicQrUpdateTime < locationQrUpdateTime) {
      dispatch(refreshTopic(topicId));
    }

    const qrZipPath = await api.getZipPath('topic', topicId);
    dispatch(setQrZip(qrZipPath));
    dispatch(fetchContents(topicId));
    //temporarily select section based on which topic has been selected
    const topic = getState().topic.topics.find(({ id }) => id === topicId);
    dispatch(selectSection(topic.sectionId));
    // end temp
    const topicBackground = await api.getTopicBackground(topicId);
    return { topicId, topicBackground };
  }
);

export const updateTopicOptions = createAsyncThunk<
  Topic,
  { topicId: string; enableSharing?: boolean; status?: Status },
  { state: AppState }
>(
  'topic/updateTopicOptions',
  async (payload: { topicId: string; enableSharing?: boolean; status?: Status }, { getState, dispatch }) => {
    const isOrg = getState().editor.isOrg;
    const topic = getState().topic.topics.find((topic) => topic.id === payload.topicId);
    const updatedTopic = {
      ...topic,
      enableSharing: payload.enableSharing ?? topic.enableSharing,
      status: payload.status ?? topic.status,
    };
    delete updatedTopic['qr'];
    delete updatedTopic['qrZip'];

    if (isOrg) {
      await api.saveTopic(updatedTopic);
    } else {
      const organizationId = getState().location.selectedLocation?.organizationId;
      await core.saveTopicCore(organizationId, updatedTopic);
    }
    dispatch(refreshTopic(payload.topicId));
    return payload;
  }
);

// SAVE A TOPIC
export const saveTopic = createAsyncThunk<Topic, Partial<Topic>, { state: AppState }>(
  'content/saveTopic',
  async (topicUpdates: Partial<Topic>, { getState }) => {
    const isOrg = getState().editor.isOrg;
    let selectedTopic = getState().topic.selectedTopic;
    //topicUpdates only has one Title for active language, don't wipe out other languages
    if (topicUpdates.name) {
      //cast to array of Titles
      topicUpdates.name = selectedTopic.name.map((title) => {
        if (title.language === topicUpdates.name.language) {
          return topicUpdates.name;
        }
        return title;
      });
    }
    const topic = { ...selectedTopic, ...topicUpdates }; //injects any optional updates before saving
    if (isOrg) {
      await api.saveTopic(topic);
    } else {
      const organizationId = getState().location.selectedLocation?.organizationId;
      await core.saveTopicCore(organizationId, topic);
    }
    // return value is used as extraReducer's fulfilled payload
    return topic;
  }
);

// RENAME A TOPIC (even if not selected topic)
export const renameTopic = createAsyncThunk<Topic, { topicId: string; name: Title }, { state: AppState }>(
  'topic/renameTopic',
  async (payload: { topicId: string; name: Title }, { getState }) => {
    let name = payload.name;
    let topic = getState().topic.topics.find((topic) => topic.id === payload.topicId);
    const isOrg = getState().editor.isOrg;

    name = topic.name.map((title) => {
      if (title.language === name.language) {
        return name;
      }
      return title;
    });

    const newTopic = { ...topic, name };

    if (isOrg) {
      await api.saveTopic(newTopic);
    } else {
      const organizationId = getState().location.selectedLocation?.organizationId;
      await core.saveTopicCore(organizationId, newTopic);
    }

    let qrZip = await api.getZipPath('topic', topic.id);
    return { ...newTopic, qrZip };
  }
);

// ADD A NEW TOPIC
export const addTopic = createAsyncThunk<
  Topic,
  { sectionId: string; topicOrder: string[]; pageName?: string },
  { state: AppState }
>(
  'content/addTopic',
  async (payload: { sectionId: string; topicOrder: string[]; pageName?: string }, { getState, dispatch }) => {
    const isOrg = getState().editor.isOrg;
    const sectionId = payload.sectionId;
    const topicOrder = payload.topicOrder;
    const pageCount = topicOrder.length;
    const pageName = payload.pageName
      ? payload.pageName === ''
        ? `Page ${pageCount + 1}`
        : payload.pageName
      : `Page ${pageCount + 1}`;
    const languages = getState().location.selectedLocation.supportedLanguages;
    let topic = createNewTopic(pageName, languages, sectionId);

    if (isOrg) {
      topic = await api.saveTopic(topic);
      topic = await api.getTopicById(topic._id); //refetching in case any props were added by backend
    } else {
      const organizationId = getState().location.selectedLocation?.organizationId;
      topic = await core.saveTopicCore(organizationId, topic);
      topic = await api.getTopicById(topic._id); //refetching in case any props were added by backend
    }

    var newTopicOrder = [...topicOrder, topic.id];
    dispatch(saveTopicOrder({ sectionId: sectionId, topicOrder: newTopicOrder }));

    // navigate to new topic path
    const locationId = getState().location.selectedLocation.id;
    dispatch(push(`app-editor?locationId=${locationId}&topicId=${topic.id}`));

    // get qrZip
    let qrZip = await api.getZipPath('topic', topic.id);

    return { ...topic, qrZip };
  }
);

// REFRESH TOPIC
export const refreshTopic = createAsyncThunk<Topic, string, { state: AppState }>(
  'topic/refreshTopic',
  async (topicId: string) => {
    const topic = await api.getTopicById(topicId);
    let qrZip = await api.getZipPath('topic', topic.id);
    return { ...topic, qrZip };
  }
);

// DELETE A TOPIC
export const deleteTopic = createAsyncThunk<string, string, { state: AppState }>(
  'content/deleteTopic',
  async (topicId: string, { getState, dispatch }) => {
    const isOrg = getState().editor.isOrg;
    const topics = getState().topic.topics;
    // api request to delete the Topic
    let topic = topics.find((t) => t.id === topicId);
    if (isOrg) {
      await api.deleteTopic(topic);
    } else {
      const organizationId = getState().location.selectedLocation?.organizationId;
      await core.deleteTopicCore(organizationId, topic);
    }

    // update the section's topicOrder
    let sectionId = topic.sectionId;
    const updatedTopicOrder = topics
      .filter((topic) => topic.id !== topicId && topic.sectionId === sectionId) // filter out the topic
      .map((topic) => topic.id); //map to list of ids
    dispatch(saveTopicOrder({ sectionId, topicOrder: updatedTopicOrder }));

    // if a user deletes a page, select the next page
    // if there is no next page, select the previous page
    // if there is no previous page, we shouldn't be here!
    const topicIndex = topics.findIndex((topic) => topic.id === topicId);
    let nextTopicId;
    if (topicIndex < topics.length - 1) {
      nextTopicId = topics[topicIndex + 1].id;
    } else {
      nextTopicId = topics[topicIndex - 1].id;
    }
    //TODO: navigating to a new page before topics[] is updated (in extraReducer) may cause problems
    const locationId = getState().location.selectedLocation.id;

    dispatch(selectTopic(nextTopicId));
    // if the selectedTopic was deleted, route to another topic
    if (getState().topic.selectedTopic.id === topicId) {
      dispatch(push(`app-editor?locationId=${locationId}&topicId=${nextTopicId}`));
    }
    // return topicId to trigger extraReducer and update this slice
    return topicId;
  }
);

type ReorderTopicPayload = { oldIndex: number; oldSectionId: string; newIndex: number; newSectionId: string };
// REORDER TOPICS
export const reorderTopic = createAsyncThunk<
  { sectionId: string; topicId: string },
  ReorderTopicPayload,
  { state: AppState }
>('content/reorderTopic', async (payload: ReorderTopicPayload, { getState, dispatch }) => {
  let reorderPayload: { sectionId: string; topicId: string };
  if (payload.oldSectionId === payload.newSectionId && payload.oldIndex === payload.newIndex) {
    return;
  } else {
    // SAME SECTION
    if (payload.oldSectionId === payload.newSectionId) {
      let topicOrder = cloneDeep(
        getState().section.sections.find((section) => section.id === payload.oldSectionId).topicOrder
      );
      const tempTopicId = topicOrder[payload.oldIndex];
      topicOrder.splice(payload.oldIndex, 1);
      topicOrder.splice(payload.newIndex, 0, tempTopicId);
      dispatch(saveTopicOrder({ sectionId: payload.oldSectionId, topicOrder }));
      reorderPayload = { sectionId: payload.oldSectionId, topicId: tempTopicId };
    } else {
      // CROSS SECTION
      let oldSectionTopicOrder = cloneDeep(
        getState().section.sections.find((section) => section.id === payload.oldSectionId).topicOrder
      );
      let isOrg = getState().editor.isOrg;
      const tempTopicId = oldSectionTopicOrder[payload.oldIndex];
      let topic = cloneDeep(getState().topic.topics.find((topic) => topic.id === tempTopicId));
      // change sectionId in topic
      if (isOrg) {
        await api.saveTopic({ ...topic, sectionId: payload.newSectionId });
      } else {
        const organizationId = getState().location.selectedLocation?.organizationId;
        await core.saveTopicCore(organizationId, { ...topic, sectionId: payload.newSectionId });
      }
      // delete tempTopicId from oldSection
      oldSectionTopicOrder.splice(payload.oldIndex, 1);
      dispatch(saveTopicOrder({ sectionId: payload.oldSectionId, topicOrder: oldSectionTopicOrder }));
      // add tempTopicId to newSection
      let newSectionTopicOrder = cloneDeep(
        getState().section.sections.find((section) => section.id === payload.newSectionId).topicOrder
      );
      newSectionTopicOrder.splice(payload.newIndex, 0, tempTopicId);
      dispatch(saveTopicOrder({ sectionId: payload.newSectionId, topicOrder: newSectionTopicOrder }));
      reorderPayload = { sectionId: payload.newSectionId, topicId: tempTopicId };
    }
  }

  return reorderPayload;
});

// TOPIC SLICE
const topicSlice = createSlice({
  name: 'topic',
  initialState: initTopicState,
  // REGULAR REDUCERS
  reducers: {
    topicContentReorder(state: TopicState, action: PayloadAction<ContentReorderPayload>) {
      const contentToReorder = state.selectedTopic.content[action.payload.oldIndex];
      state.selectedTopic.content.splice(action.payload.oldIndex, 1);
      state.selectedTopic.content.splice(action.payload.newIndex, 0, contentToReorder);

      const replaceIndex = state.topics.findIndex((topic) => (topic.id = state.selectedTopic.id));
      state.topics.splice(replaceIndex, 1, state.selectedTopic);
    },
    topicContentDelete(state: TopicState, action: PayloadAction<number>) {
      state.selectedTopic.content.splice(action.payload, 1);
      const replaceIndex = state.topics.findIndex((topic) => topic.id === state.selectedTopic.id);
      state.topics.splice(replaceIndex, 1, state.selectedTopic);
    },
    changeBackground(state: TopicState, action: PayloadAction<BackgroundPayload>) {
      state.selectedTopic.backgroundImageName = action.payload.name;
      state.selectedTopic.exhibitImage = action.payload.url;
    },
    rehydrateTopic(state: TopicState, action: PayloadAction<{ topics: Topic[]; id: string }>) {
      state.topics = action.payload.topics;
      state.selectedTopic = action.payload.topics.find((topic) => topic.id === action.payload.id);
    },
  },
  // EXTRA REDUCERS
  extraReducers: (builder) => {
    // SINGLE CASES
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshTopic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshTopic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedTopic = action.payload;
        state.topics = state.topics.map((topic) => {
          if (topic.id === action.payload.id) {
            return action.payload;
          }
          return topic;
        });
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topics = action.payload;
      })
      .addCase(selectTopic.fulfilled, (state, action) => {
        if (!state.isLoading) {
          state.selectedTopic = state.topics.find((topic) => topic.id === action.payload.topicId);
          state.selectedTopic.exhibitImage = action.payload.topicBackground;
        }
      })
      .addCase(saveTopic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedTopic = action.payload;
        state.topics = state.topics.map((topic) => {
          if (topic.id === action.payload.id) {
            //replace with payload topic
            return action.payload;
          }
          return topic; // leave it alone
        });
      })
      .addCase(updateTopicOptions.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(renameTopic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topics = state.topics.map((topic) => {
          if (topic.id === action.payload.id) {
            return action.payload;
          }
          return topic;
        });
        if (state.selectedTopic.id === action.payload.id) {
          state.selectedTopic = action.payload;
        }
      })
      .addCase(addTopic.fulfilled, (state, action) => {
        state.isLoading = false;
        //TODO: make sure current selectedTopic isn't dirty before changing it!
        state.selectedTopic = action.payload;
        state.topics = [...state.topics, state.selectedTopic];
      })
      .addCase(deleteTopic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topics = state.topics.filter((topic) => topic.id !== action.payload);
      })
      .addCase(reorderTopic.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.topics = state.topics.map((topic) => {
            if (topic.id === action.payload.topicId) {
              return { ...topic, sectionId: action.payload.sectionId };
            }
            return topic;
          });
        }
      });

    // COMBINED CASES
    builder
      // isLoading while async ops are pending
      .addMatcher(
        isAnyOf(
          renameTopic.pending,
          reorderTopic.pending,
          saveTopic.pending,
          fetchTopics.pending,
          addTopic.pending,
          deleteTopic.pending,
          updateTopicOptions.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      // !isLoading if async op failed
      .addMatcher(
        isAnyOf(
          renameTopic.rejected,
          reorderTopic.rejected,
          saveTopic.rejected,
          fetchTopics.rejected,
          addTopic.rejected,
          deleteTopic.rejected,
          updateTopicOptions.rejected
        ),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

// Export reducer
export default topicSlice.reducer;

// Export actions
export const { topicContentReorder, topicContentDelete, changeBackground, rehydrateTopic } = topicSlice.actions;

// Export selectors
export const _topics = (state) => state.topic.topics;
export const _selectedTopic = (state) => state.topic.selectedTopic;
export const _topicIsLoading = (state) => state.topic.isLoading;
export const _topicBackground = (state) => state.topic.selectedTopic?.exhibitImage;

// Helper method for addTopic Thunk above
export const createNewTopic = (pageName: string, language: string[], sectionId: string) => {
  const languageNames = language.map((code) => {
    return { name: pageName, language: code };
  });
  const topic = newTopic({
    background: '',
    backgroundImageName: '',
    branchLinkUrl: '',
    branchUrl: '',
    content: [],
    contentExpanded: [],
    enableSharing: true,
    exhibitImage: '',
    id: '',
    loc: null,
    name: languageNames,
    organizationId: '',
    qr: '',
    sectionId: sectionId,
    slideshowSettings: { defaultSeconds: 10, contentSeconds: {} },
    status: 1, //TODO: was set to 2 (hidden) in Admin Panel request. I like 1 better, let's see what happens
  });

  return topic;
};
