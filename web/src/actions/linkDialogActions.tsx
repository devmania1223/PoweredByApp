import { Action } from 'redux';
import { LinkDialogMenuOption } from '../components/SettingsMenuOptions/Dialog/LinkDialog';
import { PhoneScheme } from '../components/SettingsMenuOptions/Dialog/LinkDialogComponents/Phone';

/**
 *
 * CHANGE LINK DIALOG MENU
 *
 */

// Action strings
const CHANGE_LINK_DIALOG_MENU = 'CHANGE_LINK_DIALOG_MENU';

// Action interfaces
export interface ChangeLinkDialogMenuAction extends Action<string> {
  payload: LinkDialogMenuOption;
}

// Action creators
export type ChangeLinkDialogMenuActionCreator = (menuOption: LinkDialogMenuOption) => ChangeLinkDialogMenuAction;
export const createChangeLinkDialogMenuAction: ChangeLinkDialogMenuActionCreator = (menuOption) => ({
  type: CHANGE_LINK_DIALOG_MENU,
  payload: menuOption,
});

// Type guards
export const isChangeLinkDialogMenuAction = (action: Action<string>): action is ChangeLinkDialogMenuAction => {
  return [CHANGE_LINK_DIALOG_MENU].includes(action.type);
};

/**
 *
 * CHANGE BUTTON LINK
 *
 */

// Action strings
const CHANGE_BUTTON_LINK = 'CHANGE_BUTTON_LINK';

// Action interfaces
export interface ChangeButtonLinkAction extends Action<string> {
  payload: {
    link: string;
    linkOption: LinkDialogMenuOption;
    phoneScheme?: PhoneScheme;
  };
}

// Action creators
export type ChangeButtonLinkActionCreator = (
  link: string,
  linkOption: LinkDialogMenuOption,
  phoneScheme?: PhoneScheme
) => ChangeButtonLinkAction;
export const createChangeButtonLinkAction: ChangeButtonLinkActionCreator = (link, linkOption, phoneScheme = 'tel') => ({
  type: CHANGE_BUTTON_LINK,
  payload: {
    link,
    linkOption,
    phoneScheme,
  },
});

// Type guards
export const isChangeButtonLinkAction = (action: Action<string>): action is ChangeButtonLinkAction => {
  return [CHANGE_BUTTON_LINK].includes(action.type);
};

/**
 * CHANGE BUTTON LINK INVALID
 *
 */

// Action strings
const CHANGE_BUTTON_LINK_INVALID = 'CHANGE_BUTTON_LINK_INVALID';

// Action interfaces

export interface SetButtonLinkInvalidAction extends Action<string> {
  payload: boolean;
}

// Action creators
export type SetButtonLinkInvalidActionCreator = (invalid: boolean) => SetButtonLinkInvalidAction;
export const createSetButtonLinkInvalidAction: SetButtonLinkInvalidActionCreator = (invalid) => ({
  type: CHANGE_BUTTON_LINK_INVALID,
  payload: invalid,
});

// Type guards
export const isSetButtonLinkInvalidAction = (action: Action<string>): action is SetButtonLinkInvalidAction => {
  return [CHANGE_BUTTON_LINK_INVALID].includes(action.type);
};
