import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import { TextInitialValue } from '../../components/ElementMenu/InsertTypographyOption';
import { colors } from '../../theme/palette';
import * as api from '../api-client';
import * as core from '../core-api/core';
import { AssignedTopic, Content, FileLanguage, FileType, Language } from '../models';
import { newContent as _newContent } from '../models/file/FileContent';
import { newFileLanguage } from '../models/file/FileLanguage';
import { AppState } from '../store';
import {
  addNewContentId,
  addSingleLanguageElement,
  editorContentFocused,
  removeAllLanguageIds,
  removeSingleLanguageElement,
} from './editorSlice';
import { saveLocation } from './locationSlice';
import { saveTopic } from './topicSlice';

export interface ContentState {
  contents: Content[];
  selectedContent: Content;
  isLoading: boolean;
}

const initContentState: ContentState = {
  contents: [],
  selectedContent: null,
  isLoading: false,
};

export type ContentReorderPayload = {
  oldIndex: number;
  newIndex: number;
};

export const fetchContents = createAsyncThunk<Content[], string, { state: AppState }>(
  'content/fetchContents',
  async (topicId: string, { getState }) => {
    const contents = await api.getContentByTopicId(topicId);
    return contents;
  }
);

export const contentDelete = createAsyncThunk<Content[], number, { state: AppState }>(
  'content/contentDelete',
  async (index: number, { getState, dispatch }) => {
    let newContents: Content[] = cloneDeep(getState().content.contents);
    let id = newContents[index]._id;
    newContents.splice(index, 1);
    dispatch(removeSingleLanguageElement(id));
    return newContents;
  }
);

export const addNewContent = createAsyncThunk<
  { newContents: Content[]; selectedContent: Content },
  any,
  { state: AppState }
>('content/addNewContent', async (payload: any, { getState, dispatch }) => {
  const { contentType, index, tag, contentLanguage, languages } = payload;
  const content = createNewContent(languages, contentType, tag, contentLanguage);

  let newContents = cloneDeep(getState().content.contents);
  newContents.splice(index, 0, content);

  dispatch(contentFocused(content._id));

  const activeLanguageCode = getState().editor.activeLanguageCode;

  dispatch(
    addSingleLanguageElement({
      active: activeLanguageCode,
      languages: languages.filter((lang) => lang !== activeLanguageCode),
      id: content._id,
    })
  );

  dispatch(editorContentFocused(content._id));
  dispatch(addNewContentId(content._id));

  return { newContents, selectedContent: content };
});

export const saveContents = createAsyncThunk<void, void, { state: AppState }>(
  'content/saveContents',
  async (_, { getState, dispatch }) => {
    const isOrg = getState().editor.isOrg;
    let contents = getState().content.contents;
    let topic = getState().topic.selectedTopic;
    let location = getState().location.selectedLocation;
    contents = cloneDeep(contents);
    topic = cloneDeep(topic);
    const assignedTopic = new AssignedTopic({ _id: topic.id, name: topic.name });
    const orgId = topic.organizationId;

    //save contents and update local ids
    for (const content of contents) {
      if (content._id.startsWith('local-')) {
        content._id = '';
        content.assignedTopics = [assignedTopic];
        content.organizationId = orgId;
      }

      let id: string;
      if (isOrg) {
        id = await api.saveContent(content);
      } else {
        const organizationId = getState().location.selectedLocation?.organizationId;
        id = await core.saveContentCore(organizationId, content);
      }
      if (content._id === '') {
        content._id = id;
      }
    }
    //update and save topic
    const contentOrder = contents.map((content) => content._id);
    topic.content = contentOrder;
    topic.contentExpanded = contents;
    await dispatch(saveTopic(topic));
    //TODO save section will go here when feature is added
    //NOTE: may need to implement saving sections for multilanguage
    await dispatch(saveLocation(location));
    dispatch(removeAllLanguageIds());
    return;
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState: initContentState,
  reducers: {
    rehydrateContent(state: ContentState, action: PayloadAction<Content[]>) {
      state.contents = action.payload;
    },
    contentReorder(state: ContentState, action: PayloadAction<ContentReorderPayload>) {
      const contentToReorder = state.contents[action.payload.oldIndex];
      state.contents.splice(action.payload.oldIndex, 1);
      state.contents.splice(action.payload.newIndex, 0, contentToReorder);
    },
    contentFocused(state: ContentState, action: PayloadAction<string>) {
      state.selectedContent = state.contents.filter((content) => content._id === action.payload)[0];
    },
    contentChanged(state: ContentState, action: PayloadAction<{ primary?: boolean; content: Partial<FileLanguage> }>) {
      state.selectedContent?.languages.some((lang, index) => {
        // use "some" to short-circuit when found
        if (action.payload.primary && !state.selectedContent.languages[index].fileUrl) {
          // image/video is primary language and first time being updated
          state.selectedContent.languages = state.selectedContent.languages.map((lang) => {
            const fileName =
              lang.language +
              '_' +
              action.payload.content.fileName.substring(action.payload.content.fileName.indexOf('_') + 1);
            const fileUrl = action.payload.content.fileUrl;
            return { ...lang, fileName, fileUrl };
          });
          return true;
        } else {
          if (lang.language === action.payload.content.language) {
            state.selectedContent.languages[index] = {
              ...state.selectedContent.languages[index],
              ...action.payload.content,
            }; // equal itself and any overrides in payload
            return true; //found it
          }
          return false; //keep looking
        }
      });

      state.contents = state.contents.map((content) => {
        if (content._id === state.selectedContent._id) {
          return state.selectedContent;
        }
        return content;
      });
    },
    duplicateContent(state: ContentState, action: PayloadAction<any>) {
      const { contentType, index, languages } = action.payload;
      const content = createDuplicateContent(languages, contentType);
      state.contents.splice(index, 0, content);
      state.selectedContent = content;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contents = action.payload;
      })
      .addCase('content/deleteTopic', (state, action) => {
        state.contents = [];
        state.selectedContent = {};
      })
      .addCase(addNewContent.fulfilled, (state, action) => {
        state.contents = action.payload.newContents;
        state.selectedContent = action.payload.selectedContent;
      })
      .addCase(contentDelete.fulfilled, (state, action) => {
        state.contents = action.payload;
        state.selectedContent = null;
      });

    builder
      // isLoading while async ops are pending
      .addMatcher(isAnyOf(fetchContents.pending, saveContents.pending), (state) => {
        state.isLoading = true;
      })
      // !isLoading if async op returned
      .addMatcher(isAnyOf(fetchContents.rejected, saveContents.rejected, saveContents.fulfilled), (state) => {
        state.isLoading = false;
      });
  },
});

// Export reducer
export default contentSlice.reducer;

// Export actions
export const { contentReorder, contentFocused, contentChanged, duplicateContent, rehydrateContent } =
  contentSlice.actions;

// Export selectors
export const _contents = (state) => state.content.contents;
export const _selectedContent = (state) => state.content.selectedContent;
export const _contentIsLoading = (state) => state.content.isLoading;
export const _comparableSelectedContent = (state) => JSON.stringify(state.content.selectedContent);

// Helper method for addNewContent reducer
export const createNewContent = (
  supportedLanguages: string[],
  contentType: FileType,
  tag?: string,
  contentLanguage?: Partial<FileLanguage>
) => {
  let languages: FileLanguage[] = [];

  supportedLanguages.forEach((code) => {
    let newLanguage = newFileLanguage({
      language: code as Language,
      title: contentType === 'webview' ? `Button` : `New ${contentType}`,
      content: !!tag
        ? `<${tag}>${TextInitialValue[tag]}</${tag}>`
        : contentType === 'webview'
        ? `Button`
        : `New ${contentType}`,
      description: '',
      fileName: `${code}_placeholder`,
      fileUrl: '',
      fileData: null,
      url: '',
      background: colors.btnBack,
      justify: 'center',
    });
    languages.push(newFileLanguage({ ...newLanguage, ...contentLanguage })); //overwrite with passed in params
  });

  const newContent = _newContent({
    _id: `local-${Date.now()}`,
    createdDate: null,
    modifiedDate: null,
    status: 1,
    type: contentType,
    languages: languages,
    assignedTopics: [],
    folderId: '',
    organizationId: '',
    isShared: false,
    readOnly: false,
  });

  return newContent;
};

// Helper method for addNewContent reducer
export const createDuplicateContent = (supportedLanguages: string[], contentType: FileType) => {
  const newContent = _newContent({
    _id: `local-${Date.now()}`,
    createdDate: null,
    modifiedDate: null,
    status: 1,
    type: contentType,
    languages: supportedLanguages,
    assignedTopics: [],
    folderId: '',
    organizationId: '',
    isShared: false,
    readOnly: false,
  });

  return newContent;
};
