import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { LinkDialogMenuOption } from '../../components/SettingsMenuOptions/Dialog/LinkDialog';
import { PhoneOption, PhoneScheme } from '../../components/SettingsMenuOptions/Dialog/LinkDialogComponents/Phone';
import { SETTINGS_MENU } from '../../components/SettingsMenuOptions/SettingsMenu';
import { Language } from '../models/location/Language';
import { saveContents } from './contentSlice';
import { saveLanguages } from './locationSlice';
import { addTopic, deleteTopic } from './topicSlice';

export interface EditorState {
  saving: boolean;
  saveSuccess: boolean;
  saveFailure: boolean;
  activeLanguageCode: Language;
  focusedContentId: string | null;
  focusedTopicId: string | null;
  leftDrawerMenu: string;
  linkDialogMenu: LinkDialogMenuOption;
  buttonLink: {
    invalid: boolean;
    web: string;
    email: string;
    phone: PhoneOption;
  };
  qrZipPath: string;
  unsavedChanges: boolean;
  newLanguageIds: any;
  isOrg: boolean;
  mlOpen: boolean;
  cropImageUrl: string | null;
  overState: boolean;
  tipQueue: string[];
  newContentId: string;
  leftDrawerWidth: number;
}

const initEditorState: EditorState = {
  saving: false,
  saveSuccess: false,
  saveFailure: false,
  activeLanguageCode: 'en' as Language,
  focusedContentId: SETTINGS_MENU,
  focusedTopicId: '',
  leftDrawerMenu: 'element',
  linkDialogMenu: 'web',
  buttonLink: {
    invalid: true,
    web: '',
    email: '',
    phone: {
      scheme: 'tel',
      number: '',
    },
  },
  qrZipPath: '',
  unsavedChanges: false,
  newLanguageIds: {},
  isOrg: false,
  mlOpen: false,
  cropImageUrl: '',
  overState: false,
  tipQueue: [],
  newContentId: '',
  leftDrawerWidth: 260,
};

interface ChangeButtonPayload {
  link: string;
  linkOption: LinkDialogMenuOption;
  phoneScheme?: PhoneScheme;
}

const editorSlice = createSlice({
  name: 'editor',
  initialState: initEditorState,

  reducers: {
    setActiveLanguageCode: (state: EditorState, action: PayloadAction<Language>) => {
      state.activeLanguageCode = action.payload;
    },

    setQrZip: (state: EditorState, action: PayloadAction<string>) => {
      state.qrZipPath = action.payload;
    },
    setIsOrg: (state: EditorState, action: PayloadAction<boolean>) => {
      state.isOrg = action.payload;
    },
    editorContentFocused: (state: EditorState, action: PayloadAction<string>) => {
      state.focusedContentId = action.payload;
    },
    editorSetOverState: (state: EditorState, action: PayloadAction<boolean>) => {
      state.overState = action.payload;
    },
    editorTopicFocused: (state: EditorState, action: PayloadAction<string>) => {
      state.focusedTopicId = action.payload;
    },
    contentUnfocused: (state: EditorState) => {
      state.focusedContentId = '';
    },
    changeLeftDrawerMenu: (state: EditorState, action: PayloadAction<string>) => {
      state.leftDrawerMenu = action.payload;
    },
    linkDialogMenuChange: (state: EditorState, action: PayloadAction<LinkDialogMenuOption>) => {
      state.linkDialogMenu = action.payload;
    },
    buttonLinkChange: (state: EditorState, action: PayloadAction<ChangeButtonPayload>) => {
      if (action.payload.linkOption === 'phone') {
        state.buttonLink.phone.number = action.payload.link;
        state.buttonLink.phone.scheme = action.payload.phoneScheme;
      } else {
        state.buttonLink[action.payload.linkOption] = action.payload.link;
      }
    },
    buttonLinkInvalid: (state: EditorState, action: PayloadAction<boolean>) => {
      state.buttonLink.invalid = action.payload;
    },
    saveSuccessfully: (state: EditorState, action: PayloadAction<boolean>) => {
      state.saveSuccess = action.payload;
    },
    saveFailure: (state: EditorState, action: PayloadAction<boolean>) => {
      state.saveFailure = action.payload;
    },
    isSaving: (state: EditorState, action: PayloadAction<boolean>) => {
      state.saving = action.payload;
    },
    setDrawerWidth: (state: EditorState, action: PayloadAction<number>) => {
      state.leftDrawerWidth = action.payload;
    },
    makeChange: (state: EditorState, action: PayloadAction<boolean>) => {
      state.unsavedChanges = action.payload;
    },
    addSingleLanguageElement: (
      state: EditorState,
      action: PayloadAction<{ active: Language; languages: Language[]; id: string }>
    ) => {
      let old = state.newLanguageIds;
      let temp: { [key: string]: string[] };
      if (Object.keys(old).length === 0) {
        temp = action.payload.languages.reduce(
          (total, current) => ({
            ...total,
            [current]: [action.payload.id],
          }),
          { [action.payload.active]: [] }
        );
        state.newLanguageIds = temp;
      } else {
        temp = old;
        action.payload.languages.forEach((lang) => {
          temp[lang].push(action.payload.id);
        });
        state.newLanguageIds = temp;
      }
    },
    removeSingleLanguageElement: (state: EditorState, action: PayloadAction<string>) => {
      state.newLanguageIds = Object.keys(state.newLanguageIds).reduce((total, current) => {
        return {
          ...total,
          [current]: state.newLanguageIds[current].filter((id) => id !== action.payload),
        };
      }, {});
    },
    removeAllLanguageIds: (state: EditorState, action: PayloadAction) => {
      state.newLanguageIds = {};
    },
    addNewLanguageIds: (state: EditorState, action: PayloadAction<{ language: Language; ids: string[] }>) => {
      // this tracks every entity that received a clone of default language
      // called when adding a new language via Multilanguage selection tool
      const { language, ids } = action.payload;
      state.newLanguageIds[language] = ids;
    },
    removeNewLanguageIds: (state: EditorState, action: PayloadAction<{ language: Language; ids: string[] }>) => {
      // this removes every id that has been focused (acknowledged) or removed via MultilanguageDeleteDialog
      const { language, ids } = action.payload;
      if (!state.newLanguageIds[language]) {
        return;
      }
      state.newLanguageIds[language] = state.newLanguageIds[language]?.filter((id) => !ids.includes(id));
    },
    toggleMlDrawer: (state: EditorState, action: PayloadAction<boolean>) => {
      state.mlOpen = action.payload;
    },
    setCropImageUrl: (state: EditorState, action: PayloadAction<string>) => {
      state.cropImageUrl = action.payload;
    },
    addTip: (state: EditorState, action: PayloadAction<string>) => {
      state.tipQueue.push(action.payload);
    },
    removeTip: (state: EditorState, action: PayloadAction) => {
      state.tipQueue.pop();
    },
    addNewContentId: (state: EditorState, action: PayloadAction<string>) => {
      state.newContentId = action.payload;
    },
  },
  extraReducers: (builder) => {
    // generalized, add any actions that save using this logic
    builder
      // pending
      .addMatcher(isAnyOf(addTopic.pending, deleteTopic.pending, saveContents.pending), (state) => {
        state.saving = true;
      })
      // fulfilled
      .addMatcher(
        isAnyOf(addTopic.fulfilled, deleteTopic.fulfilled, saveContents.fulfilled, saveLanguages.fulfilled),
        (state) => {
          state.saving = false;
          state.saveSuccess = true;
        }
      )
      // rejected
      .addMatcher(
        isAnyOf(addTopic.rejected, deleteTopic.rejected, saveContents.rejected, saveLanguages.rejected),
        (state) => {
          state.saving = false;
          state.saveFailure = true;
        }
      );
  },
});

// here's you a reducer
export default editorSlice.reducer;

//here's you sum actions
export const {
  setActiveLanguageCode,
  setIsOrg,
  setQrZip,
  editorContentFocused,
  editorTopicFocused,
  contentUnfocused,
  changeLeftDrawerMenu,
  linkDialogMenuChange,
  buttonLinkChange,
  buttonLinkInvalid,
  saveSuccessfully,
  saveFailure,
  isSaving,
  makeChange,
  addSingleLanguageElement,
  removeSingleLanguageElement,
  removeAllLanguageIds,
  addNewLanguageIds,
  removeNewLanguageIds,
  toggleMlDrawer,
  setCropImageUrl,
  editorSetOverState,
  addTip,
  removeTip,
  addNewContentId,
  setDrawerWidth,
} = editorSlice.actions;

export const _activeLanguageCode = (state) => state.editor.activeLanguageCode;
export const _currentLanguages = (state) => state.editor.currentLanguages;
export const _focusedContentId = (state) => state.editor.focusedContentId;
export const _leftDrawerMenu = (state) => state.editor.leftDrawerMenu;
export const _linkDialogMenu = (state) => state.editor.linkDialogMenu;
export const _buttonLink = (state) => state.editor.buttonLink;
export const _buttonLinkInvalid = (state) => state.editor.buttonLink.invalid;
export const _saveSuccess = (state) => state.editor.saveSuccess;
export const _saveFailure = (state) => state.editor.saveFailure;
export const _saving = (state) => state.editor.saving;
export const _qrZipPath = (state) => state.editor.qrZipPath;
export const _unsavedChanges = (state) => state.editor.unsavedChanges;
export const _newLanguageIds = (state) => state.editor.newLanguageIds;
export const _isOrg = (state) => state.editor.isOrg;
export const _mlOpen = (state) => state.editor.mlOpen;
export const _cropImageUrl = (state) => state.editor.cropImageUrl;
export const _overState = (state) => state.editor.overState;
export const _tips = (state) => state.editor.tipQueue;
export const _newContentId = (state) => state.editor.newContentId;
export const _leftDrawerWidth = (state) => state.editor.leftDrawerWidth;
