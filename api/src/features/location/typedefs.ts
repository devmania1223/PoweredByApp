import { liiingoLanguages } from '@liiingo/core-api-client-typescript';
import { resolve } from 'dns';
import { schemaComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { v1 as uuidV1 } from 'uuid';
import { liiingo } from '../../';
import { UpdateOneLocationExhibitTemplatedContentInput } from '../../data/types';
import { AppContext } from '../../server';
import { uploadFile } from '../../services/s3';
import { logger } from '../../util/logger';
import { OrganizationModel, OrganizationTC } from '../organizations/model';
import { Location, LocationModel } from './model';

const LocationTC = composeWithMongoose(Location, {});

LocationTC.addRelation<OrganizationModel>('organization', {
  resolver: () => OrganizationTC.getResolver('findById'),
  prepareArgs: {
    _id: (source) => source.organizationId,
  },
  projection: { organizationId: true },
});
LocationTC.removeField('organizationId');

LocationTC.addFields({
  qrCode: {
    type: 'String',
    resolve: async (location: LocationModel, args, context: AppContext, info): Promise<string> => {
      const localLocation = await Location.findById(location._id);
      if (!localLocation) {
        return '';
      }
      try {
        const getTopicResponse = await liiingo.getTopicPublic(
          localLocation.exhibit.liiingoExhibitId,
          localLocation.liiingoLocationId,
          true
        );
        return getTopicResponse?.data?.exhibit?.qr;
      } catch (e) {
        return '';
      }
    },
  },
  zipPath: {
    type: 'String',
    resolve: async (location: LocationModel, args, context: AppContext, info): Promise<string> => {
      const localLocation = await Location.findById(location._id);
      if (!localLocation) {
        return '';
      }

      const downloadLink = await liiingo.getDownloadLink(
        localLocation.exhibit.liiingoExhibitId,
        localLocation.liiingoLocationId,
        true
      );

      return downloadLink?.data?.zipPath;
    },
  },
  liiingoUrl: {
    type: 'String',
    resolve: async (location: LocationModel, args, context: AppContext, info): Promise<string> => {
      const localLocation = await Location.findById(location._id);
      if (!localLocation) {
        return '';
      }
      return location.liiingoUrl;
    },
  },
});

schemaComposer.createObjectTC({
  name: 'ContentLanguagesContent',
  fields: {
    name: 'String',
    value: 'String',
    fileUrl: 'String',
  },
});

schemaComposer.createObjectTC({
  name: 'ContentLanguages',
  fields: liiingoLanguages.reduce((accumulator, language) => {
    accumulator[language.replace('-', '_')] = 'ContentLanguagesContent';
    return accumulator;
  }, {}),
});

schemaComposer.getOTC('LocationExhibitTemplatedContent').setField('languages', {
  name: 'languages',
  type: 'ContentLanguages',
});

LocationTC.wrapResolverAs('locationUpdateOne', 'updateOne', (newResolver) => {
  const images = ['customQrLogoImage', 'headerImage', 'headerLogoImage', 'topicBackgroundImage'];

  // Add input fields for all the images nested under the 'record' input field
  newResolver.getArgITC('record').addFields({
    customQrLogoImage: { type: 'Upload' },
    headerImage: { type: 'Upload' },
    headerLogoImage: { type: 'Upload' },
    topicBackgroundImage: { type: 'Upload' },
  });

  // The '_id' field is the ONLY way to specify which Location to update.
  // If we want to enable updates by other criteria, we'll need to enforce
  // permissions in the resolvers themselves rather than as a top-level request middleware.
  newResolver.getArgITC('filter').removeOtherFields(['_id']).makeRequired(['_id']);
  newResolver.makeRequired('filter');

  return newResolver.wrapResolve((next) => async (rp) => {
    const { record, filter } = rp.args;
    // This UUID is appended to the S3 file URL to bust the browser cache when an S3 image is updated
    const uuid = uuidV1();

    const uploadPromises = images
      .filter((imageName) => !!record[imageName]) // Don't attempt to process images that weren't included in the mutation
      .map((imageName) => {
        return record[imageName].then((file: any) => {
          return new Promise((resolve, reject) => {
            try {
              const { createReadStream, mimetype } = file;
              const fileStream = createReadStream();
              // handle file upload
              const s3Response = uploadFile(
                filter._id,
                mimetype,
                `${imageName}.${mimetype.slice(mimetype.indexOf('/') + 1)}`,
                fileStream
              );
              s3Response.then((response) => {
                record[`${imageName}Url`] = `${response.Location}?hash=${uuid}`;
                resolve(imageName);
              });
            } catch (err) {
              logger.error(err);
              reject(imageName);
            }
          });
        });
      });

    const contentUploadPromises = record?.exhibit?.templatedContent.map(
      (content: UpdateOneLocationExhibitTemplatedContentInput) => {
        return Object.keys(content.languages || {}).map((language) => {
          // Don't attempt to process content pieces without a file upload
          if (!content?.languages?.[language]?.binaryValue) {
            return new Promise((resolve, reject) => {
              resolve(`${language}-${content.languages![language].name}`);
            });
          }
          return content?.languages?.[language]?.binaryValue.then((file: any) => {
            return new Promise((resolve, reject) => {
              try {
                const { createReadStream, mimetype } = file;
                const fileStream = createReadStream();
                // handle file upload
                const s3Response = uploadFile(
                  filter._id,
                  mimetype,
                  `${content.languages![language].name}-${language}.${mimetype.slice(mimetype.indexOf('/') + 1)}`,
                  fileStream
                );
                s3Response.then((response) => {
                  delete content.languages![language].binaryValue;
                  content.languages![language].value = `${response.Location}?hash=${uuid}`;
                  resolve(`${language}-${content.languages![language].name}`);
                });
              } catch (err) {
                logger.error(err);
                reject(content.languages![language].name);
              }
            });
          });
        });
      }
    );
    if (typeof uploadPromises !== 'undefined') {
      await Promise.all(uploadPromises);
    }
    if (typeof contentUploadPromises !== 'undefined') {
      const promiseArray = (contentUploadPromises as []).reduce((accumulator, oneLanguagePromises) => {
        return accumulator.concat(oneLanguagePromises);
      }, []);
      await Promise.all(promiseArray);
    }
    return next(rp);
  });
});

export { LocationTC };
