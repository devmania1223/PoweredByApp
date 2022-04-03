import S3 from 'aws-sdk/clients/s3';
import { ReadStream } from 'fs-extra';
import { config } from '../config';
import { logger } from '../util/logger';

const s3 = new S3({
  apiVersion: '2006-03-01',
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_KEY,
  },
  region: 'us-west-2',
});

export type S3FileListing = {
  title: string;
  url: string;
};

export const uploadFile = async (
  organizationId: string,
  mimeType: string,
  fileName: string,
  file: ReadStream
): Promise<S3.ManagedUpload.SendData> => {
  logger.info(`uploading ${fileName} to s3 for ${organizationId}`);
  const params = {
    Bucket: config.S3_IMAGE_BUCKET,
    Key: `${organizationId}/${fileName}`,
    Body: file,
    ContentType: mimeType,
  };
  const s3Response = s3.upload(params).promise();
  return s3Response;
};

const s3KeyToHumanTitle = (key: string): string => {
  // remove everything last / and before
  key = key.substring(key.lastIndexOf('/') + 1);
  // remove file extension
  key = key.substring(0, key.lastIndexOf('-thumb.'));
  // replace - with ' '
  key = key.replace(/-/g, ' ');

  return key;
};

export const getFileListing = async (templateName: string, planName: string): Promise<S3FileListing[]> => {
  const params = {
    Bucket: config.S3_IMAGE_BUCKET,
    Delimiter: '/',
    Prefix: `${templateName}/communications-toolkit/${planName}/thumbnails/`,
    StartAfter: `${templateName}/communications-toolkit/${planName}/thumbnails/`,
  };

  const data: S3.ListObjectsV2Output = await s3.listObjectsV2(params).promise();

  return (
    data?.Contents?.map((file) => {
      return {
        title: s3KeyToHumanTitle(file.Key || ''),
        url: `https://${config.S3_IMAGE_BUCKET}.s3.us-west-2.amazonaws.com/${file.Key}`,
      };
    }) || []
  );
};
