import {
  AppEditRequest,
  AreaStatus,
  ContentRequest,
  ExhibitStatus,
  ImpersonatedOrg,
  LiiingoLanguage,
  TopicEditRequest,
} from '@liiingo/core-api-client-typescript';
import { AxiosResponse } from 'axios';
import mongoose, { Document, Schema } from 'mongoose';
import { liiingo } from '../../';
import { logger } from '../../util/logger';
import { ContentModel, ContentSchema } from '../content/model';
import { ModelWithTimestamps } from '../modeltypes';
import { Organization } from '../organizations/model';

export const LocationSchema = new Schema<LocationModel>(
  {
    name: String,
    contactName: String,
    phone: String,
    companyName: String,
    email: String,
    customQrLogoImageUrl: {
      type: String,
    },
    customQrCodeColors: {
      primary: String,
      secondary: String,
    },
    headerImageUrl: {
      type: String,
    },
    headerLogoImageUrl: {
      type: String,
    },
    topicBackgroundImageUrl: {
      type: String,
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'organizations',
    },
    liiingoLocationId: String,
    liiingoSectionId: String,
    liiingoUrl: String,
    exhibit: {
      liiingoExhibitId: String,
      qrCodeUrl: String,
      templateId: String,
      templatedContent: [ContentSchema],
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);
export type LiiingoContentType = 'webview' | 'text' | 'image' | 'video';

export interface LocationModel extends Document<string>, ModelWithTimestamps {
  _id: string;
  name: string;
  contactName: string;
  companyName: string;
  phone: string;
  email: string;
  customQrLogoImageUrl: string;
  customQrCodeColors: {
    primary: string;
    secondary: string;
  };
  headerImageUrl: string;
  headerLogoImageUrl: string;
  topicBackgroundImageUrl: string;
  organizationId: string;
  liiingoLocationId: string;
  liiingoSectionId: string;
  liiingoUrl: string;
  exhibit: {
    liiingoExhibitId: string;
    qrCodeUrl: string;
    templateId: string;
    templatedContent?: ContentModel[];
  };
}

LocationSchema.index({ createdAt: 1, updatedAt: 1 });

const upsertContent = (
  impersonatedOrg: ImpersonatedOrg,
  templatedContent: ContentModel[]
): (Promise<AxiosResponse<any>> | undefined)[] => {
  const promises: (Promise<AxiosResponse<any>> | undefined)[] = [];
  templatedContent.forEach(async (content) => {
    const contentRequest: ContentRequest = transformContentToLiiingo(content);
    promises.push(
      impersonatedOrg.callWithToken(liiingo.updateContent, contentRequest).catch((e) => {
        logger.error(`liiingo.updateContent failed for this piece of content: ${JSON.stringify(contentRequest)}`);
      })
    );
  });
  return promises;
};

const transformContentToLiiingo = (content: ContentModel) => {
  const contentRequest: ContentRequest = {
    _id: content.liiingoContentId || '',
    id: content.liiingoContentId || '',
    type: content.liiingoContentType,
    languages: [],
  };
  Object.keys(content.languages || {}).forEach((languageKey) => {
    const formattedLanguageKey = languageKey.replace('_', '-');
    switch (content.liiingoContentType) {
      case 'webview':
        contentRequest.languages.push({
          language: formattedLanguageKey as LiiingoLanguage,
          title: content.languages[languageKey]?.name!,
          url: content.languages[languageKey]?.value,
          fileName: `placeholder-${languageKey}.png`,
        });
        break;
      case 'text':
        contentRequest.languages.push({
          language: formattedLanguageKey as LiiingoLanguage,
          title: content.languages[languageKey]?.name!,
          content: content.languages[languageKey]?.value!,
        });
        break;
      case 'image':
        contentRequest.languages.push({
          language: formattedLanguageKey as LiiingoLanguage,
          title: content.languages[languageKey]?.name!,
          content: '',
          description: '',
          fileUrl: content.languages[languageKey]?.value!,
          fileName: `placeholder-${languageKey}.png`,
        });
        break;
      case 'video':
        contentRequest.languages.push({
          language: formattedLanguageKey as LiiingoLanguage,
          title: content.languages[languageKey]?.name!,
          content: content.languages[languageKey]?.value!,
          description: '',
          fileName: `placeholder-${languageKey}.mov`,
        });
        break;
    }
  });
  return contentRequest;
};

LocationSchema.pre<LocationModel>('save', async function updateLiiingo(next) {
  // liiingo service updates
  const location = this;
  const organization = await Organization.findById(location.organizationId);
  if (!organization) {
    throw new Error(`Location: ${location._id} has no linked org! ${location.organizationId}`);
  }
  // TODO: This needs to update the Topic using a Template
  const impersonatedOrg = await new ImpersonatedOrg({
    liiingoClient: liiingo,
  })
    .withOrgId(organization.liiingoOrganizationId)
    .impersonate();

  const updateAppParams: AppEditRequest = {
    ...location.toObject(),
    phoneNumber: location.phone,
    id: location.liiingoLocationId,
    defaultLanguage: 'en',
    supportedLanguages: location.exhibit.templatedContent
      ?.reduce((accumulator, content) => accumulator.concat(Object.keys(content.languages || [])), [] as string[])
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((language) => language.replace('_', '-')) as LiiingoLanguage[],
    status: 1,
    background: location.headerImageUrl,
    backgroundImageName: 'background.png',
    customQrColorPrimary: location.customQrCodeColors.primary,
    customQrColorSecondary: location.customQrCodeColors.secondary,
    customQrLogo: location.customQrLogoImageUrl,
    customQrLogoImageName: 'qr.png',
    headerLogo: location.headerLogoImageUrl,
    headerLogoImageName: 'logo.png',
  };
  logger.info(`Updating App (${updateAppParams.name}) for Organization (${organization.name})`);
  await impersonatedOrg.callWithToken(liiingo.updateApp, updateAppParams);

  // Update the Section Name, in case it has changed.  We don't store the Section object in poweredby and the Liiingo API doesn't do sparse updates,
  // so reconstruct the entire Section object and send it up.
  const liiingoSection = await impersonatedOrg.callWithToken(liiingo.updateSection, {
    id: location.liiingoSectionId,
    menuId: location.liiingoLocationId,
    name: [
      {
        name: location.companyName, // The Section will have the same name as the Company Name - this seems OK when using a Liiingo Start template
        language: 'en',
      },
    ],
    organizationId: organization.liiingoOrganizationId,
    status: AreaStatus.ACTIVE,
  });

  if (location?.exhibit?.templatedContent) {
    try {
      const contentResults = await Promise.all(upsertContent(impersonatedOrg, location?.exhibit.templatedContent));
      location.exhibit.templatedContent.forEach((_, i) => {
        if ('SUCCESS'.localeCompare(contentResults[i]?.data, undefined, { sensitivity: 'accent' })) {
          location.exhibit.templatedContent![i].liiingoContentId = contentResults[i]?.data;
        }
      });
    } catch (e) {
      logger.error(
        'An error occurred during upsertContent in the LocationModel pre-save hook. This is most likely a due to a Liiingo API validation error on one of the content objects.'
      );
      throw e;
    }
  }

  const updateTopicBackgroundResult = !!location.topicBackgroundImageUrl
    ? await impersonatedOrg.callWithToken(liiingo.updateTopicBackground, {
        id: location.exhibit?.liiingoExhibitId,
        backgroundImageUrl: location.topicBackgroundImageUrl,
        backgroundImageName: 'topicBackgroundImagePlaceholder.png',
      })
    : await Promise.resolve();

  const topicUpdateParams: TopicEditRequest = {
    id: location.exhibit.liiingoExhibitId,
    name: [{ name: location.contactName, language: 'en' }],
    organizationId: organization.liiingoOrganizationId,
    sectionId: location.liiingoSectionId,
    status: ExhibitStatus.ACTIVE,
    enableSharing: true,
    content: location?.exhibit?.templatedContent?.map((content: ContentModel) => content.liiingoContentId) ?? [], // the order of elements in this array determines the order in which content is displayed in the Liiingo app
  };
  const topicUpdateStatus = await impersonatedOrg.callWithToken(liiingo.updateTopic, topicUpdateParams);
  if (topicUpdateStatus == 'Success') {
    // We should update the response of the updateTopic endpoint to return the updated topic instead of the word "Success",
    // then we wouldn't need to make an additional API call to fetch the updated 'liiingoUrl' here.
    const newTopicInfo = await liiingo.getTopicPublic(
      location.exhibit.liiingoExhibitId,
      organization.liiingoOrganizationId,
      true
    );
    location.liiingoUrl = newTopicInfo?.data?.exhibit?.branchLinkUrl;
  } else {
    logger.error(
      `Liiingo API failed to update liiingo topic ${topicUpdateParams.id} for organization ${topicUpdateParams.organizationId}`
    );
  }
  return next();
});

export const Location = mongoose.model<LocationModel>('Location', LocationSchema);
