// Didn't finish translating this into react, don't think we'll be needing it
export {};
// import { Injectable } from '@angular/core';
// import { MatDialog, MatDialogRef } from '@angular/material';z
// import {
//   Title,
//   Topic,
//   TopicSettingsResponse,
//   NumberInputOptions,
//   defaultNumberInputOptions,
//   AutocompleteOptions,
//   defaultAutocompleteOptions,
// } from '../../state/models';
// import {
//   ConfirmDialogComponent,
//   TextInputComponent,
//   TitleTranslationsComponent,
//   TopicSettingsComponent,
//   NumberInputComponent,
//   AutocompleteComponent,
//   PushNotificationComponent,
//   SetLocationComponent,
// } from '@liiingo/shared/overlays';

//   export const openConfirmDialog = (message?: string,confirmButton?: string,cancelButton?: string) => {
//     return this._matDialog.open(ConfirmDialogComponent, {
//       data: { message, confirmButton, cancelButton },
//       panelClass: 'confirm-dialog-modal',
//     });
//   }

//   export const openTopicTitleTranslationsOverlay = (names: Title[] = []) => {
//     return this._matDialog.open(TitleTranslationsComponent, {
//       data: {
//         titles: names,
//         overlayTitle: 'Page Name Translations',
//       },
//     });
//   }

//   export const openSectionTitleTranslationsOverlay = (names: Title[] = []) => {
//     return this._matDialog.open(TitleTranslationsComponent, {
//       data: {
//         titles: names,
//         overlayTitle: 'Section Name Translations',
//       },
//     });
//   }

//   export const openPushNotificationOverlay = (reqParam) => {
//     return this._matDialog.open(PushNotificationComponent, {
//       data: {
//         ...reqParam,
//       },
//       width: '500px',
//     });
//   }

//   export const openSetLocationOverlay = (reqParam) => {
//     return this._matDialog.open(SetLocationComponent, {
//       data: {
//         ...reqParam,
//       },
//     });
//   }

//   export const openTextInputOverlay = (placeholder: string = '',value: string = '',saveButtonText: string = 'Save',inputType: 'input' | 'textarea' = 'input') => {
//     return this._matDialog.open(TextInputComponent, {
//       data: {
//         placeholder: placeholder,
//         value: value,
//         saveButtonText: saveButtonText,
//         inputType: inputType,
//       },
//       panelClass: 'folder-name-overlay',
//     });
//   }

//   export const openTopicSettingsOverlay = (topic: Topic) => {
//     return this._matDialog.open(TopicSettingsComponent, {
//       data: {
//         topic: topic,
//       },
//     });
//   }

//   export const openNumberInputOverlay = (options: Partial<NumberInputOptions>) => {
//     return this._matDialog.open(NumberInputComponent, {
//       data: { ...defaultNumberInputOptions, ...options },
//       panelClass: 'folder-name-overlay',
//     });
//   }

//   export const openAutocompleteOverlay<T> = (options: Partial<AutocompleteOptions<T>>) => {
//     return this._matDialog.open(AutocompleteComponent, {
//       data: { ...defaultAutocompleteOptions, ...options },
//       panelClass: 'folder-name-overlay',
//     });
//   }
