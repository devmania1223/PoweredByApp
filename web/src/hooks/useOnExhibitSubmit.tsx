import { MutationHookOptions, useMutation } from '@apollo/client';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { uploadVideoToJWPlayer } from '../services/jwPlayer';
import { UPDATE_EXHIBIT_CONTENT } from '../services/schema';
import {
  ContentLanguagesContentInput,
  EnumLocationExhibitTemplatedContentLiiingoContentType,
  UpdateOneLocationExhibitTemplatedContentInput,
} from '../types/globalTypes';
import { updateExhibitContent, updateExhibitContentVariables } from '../types/updateExhibitContent';

export const useOnExhibitSubmit = <TFieldValues extends FieldValues>(
  locationId: updateExhibitContentVariables['locationId'],
  contentMap: { [key: string]: any },
  mutationOptions?: MutationHookOptions<updateExhibitContent, updateExhibitContentVariables>
) => {
  const [updateExhibitContent, { loading }] = useMutation<updateExhibitContent>(
    UPDATE_EXHIBIT_CONTENT,
    mutationOptions ?? {}
  );
  const [videoIsUploading, setVideoIsUploading] = useState(false);

  const onSubmit = async (data: TFieldValues) => {
    let liiingoContent: UpdateOneLocationExhibitTemplatedContentInput = {};
    const content = await Object.entries(contentMap).reduce(async (contentAccumulator, [fieldName, contentMapItem]) => {
      const content = await contentAccumulator;
      liiingoContent = {
        liiingoContentId: contentMapItem.content?.liiingoContentId,
        liiingoContentType: contentMapItem.liiingoContentType,
      };

      const languagePromises = Object.keys(data).map(async (language) => {
        const contentForOneLanguage: ContentLanguagesContentInput = {
          name: contentMapItem?.name,
        };
        if (!data[language][fieldName]) {
          return { [language]: contentForOneLanguage };
        }
        switch (liiingoContent.liiingoContentType) {
          case EnumLocationExhibitTemplatedContentLiiingoContentType['video']:
            if (data[language][`${fieldName}JwpUploadUrl`]) {
              setVideoIsUploading(true);
              const jwPlayerShortCode = await uploadVideoToJWPlayer(
                data[language][`${fieldName}JwpUploadUrl`],
                data[language][fieldName]
              );
              setVideoIsUploading(false);
              contentForOneLanguage.value = jwPlayerShortCode;
            } else {
              contentForOneLanguage.value = data[language][fieldName];
            }
            break;

          case EnumLocationExhibitTemplatedContentLiiingoContentType['image']:
            // existing upload
            if (typeof data[language][fieldName] === 'string') {
              contentForOneLanguage.value = data[language][fieldName];
            } else {
              // new upload
              contentForOneLanguage.binaryValue = data[language][fieldName];
            }
            break;

          case EnumLocationExhibitTemplatedContentLiiingoContentType['webview']:
            contentForOneLanguage.name = data[language][`${fieldName}ButtonLabel`] ?? contentMapItem?.name;
            contentForOneLanguage.value = data[language][fieldName] ?? contentMapItem?.default;
            break;

          default:
            // If an optional mutation callback is defined for this field in the contentMap, apply it to the raw form data
            contentForOneLanguage.value = contentMapItem.mutateData
              ? contentMapItem.mutateData(data[language][fieldName])
              : `${contentMapItem.prefix || ''}${data[language][fieldName]}${contentMapItem.suffix || ''}` ??
                contentMapItem?.default;
            break;
        }
        return Promise.resolve({ [language]: contentForOneLanguage });
      }, Promise.resolve());
      const contentForAllLanguages = await Promise.all(languagePromises);
      liiingoContent.languages = contentForAllLanguages.reduce((accumulator, contentForOneLanguage) => {
        if (
          contentForOneLanguage[Object.keys(contentForOneLanguage)[0]].value ||
          contentForOneLanguage[Object.keys(contentForOneLanguage)[0]].binaryValue
        ) {
          return { ...accumulator, ...contentForOneLanguage };
        }
        return accumulator;
      }, {});
      if (Object.keys(liiingoContent.languages).length === 0) {
        return content;
      }
      return [...content, liiingoContent];
    }, Promise.resolve([]) as Promise<UpdateOneLocationExhibitTemplatedContentInput[]>);

    updateExhibitContent({
      variables: {
        locationId,
        content,
      },
    });
  };

  return [onSubmit, { loading: loading || videoIsUploading }] as const;
};
