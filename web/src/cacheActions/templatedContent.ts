import { ApolloClient } from '@apollo/client';
import { templatedContentFragment } from '../services/schema';
import {
  getLocation_getLocationById_exhibit_templatedContent,
  getLocation_getLocationById_exhibit_templatedContent_languages,
} from '../types/getLocation';
import { EnumLocationExhibitTemplatedContentLiiingoContentType } from '../types/globalTypes';
import { Location_location_exhibit } from '../types/Location_location_exhibit';
import { LANGUAGE_MAP } from '../util/constants';

export type CreateTemplatedContentProps = {
  contentType: EnumLocationExhibitTemplatedContentLiiingoContentType;
  name?: string;
  value?: string;
};
export const createTemplatedContent = ({ contentType, name = '', value = null }: CreateTemplatedContentProps) => {
  const newContentId = `local-${Date.now()}`;
  let contentForEveryLanguage = {} as getLocation_getLocationById_exhibit_templatedContent_languages;
  Object.keys(LANGUAGE_MAP).forEach((languageCode) => {
    contentForEveryLanguage[languageCode] = {
      __typename: 'ContentLanguagesContent',
      name: name || newContentId,
      value: value,
      fileUrl: null,
    };
  });

  const newContent: getLocation_getLocationById_exhibit_templatedContent = {
    __typename: 'LocationExhibitTemplatedContent',
    _id: newContentId,
    liiingoContentId: null,
    liiingoContentType: contentType,
    languages: {
      __typename: 'ContentLanguages',
      ...contentForEveryLanguage,
    },
  };

  return newContent;
};

/**
 * Add a new piece of content to the local Apollo cache for the specified Exhibit.
 * This does not send the update over the network, it only updates local state.
 */
export const addContentToExhibitWithApollo = ({
  client,
  exhibit,
  contentType,
}: {
  client: ApolloClient<any>;
  exhibit: Location_location_exhibit;
  contentType: EnumLocationExhibitTemplatedContentLiiingoContentType;
}) => {
  const { cache } = client;
  // const newContentId = `local-${Date.now()}`;

  const newContent = createTemplatedContent({ contentType });

  cache.modify({
    id: cache.identify({ ...exhibit }),
    fields: {
      templatedContent(existingContentRefs = []) {
        const newContentRef = cache.writeFragment({
          id: `LocationExhibitTemplatedContent:${newContent._id}`,
          data: newContent,
          fragment: templatedContentFragment,
          fragmentName: 'Location_location_exhibit_templatedContent',
        });

        return [newContentRef, ...existingContentRefs];
      },
    },
  });
};
