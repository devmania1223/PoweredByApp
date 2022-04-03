import { getVideoUploadUrl, saveTopicImageExpanded, uploadVideoToJWPlayer, urlToFile } from '../api-client';
import { Content, Location, Section, Status, Topic } from '../models';
import LiiingoHelper from './liiingo';

let Impersonation = new LiiingoHelper();

const checkImpersonationSetup = async (organizationId) => {
  if (!Impersonation.liiingo) {
    await Impersonation.setup(organizationId);
  }
  return;
};

// return contentId string
export const saveContentCore = async (orgId: string, contentRequest: Content) => {
  await checkImpersonationSetup(orgId);

  const formData = new FormData();
  for (let i = 0; i < contentRequest.languages.length; i++) {
    if (contentRequest.languages[i].fileUrl.includes('blob')) {
      const file = await urlToFile(contentRequest.languages[i].fileUrl, contentRequest.languages[i].fileName);
      if (contentRequest.type === 'video') {
        const uploadUrl = await getVideoUploadUrl();
        const videoKey = await uploadVideoToJWPlayer(uploadUrl, file);
        contentRequest.languages[i].fileUrl = videoKey;
        contentRequest.languages[i].content = videoKey;
      } else {
        //image
        contentRequest.languages[i].fileUrl = {};
        formData.append(`file[${i}]`, file);
      }
    } else if (contentRequest.languages[i].fileData) {
      formData.append(`file[${i}]`, contentRequest.languages[i].fileData);
      delete contentRequest.languages[i].fileData;
    }
  }
  if (!!contentRequest._id) {
    contentRequest['id'] = contentRequest._id; // back-compat
  }
  formData.append(`content`, JSON.stringify(contentRequest));

  return await Impersonation.callWithToken(Impersonation.liiingo.saveContent, formData);
};

// Save Location
export const saveLocationCore = async (orgId: string, locationRequest: Location) => {
  await checkImpersonationSetup(orgId);

  // check if logo is new
  if (locationRequest.headerLogo.includes('blob')) {
    const file = await urlToFile(locationRequest.headerLogo, locationRequest.headerLogoImageName);
    const formData = new FormData();
    formData.append('file[0]', file);
    formData.append('location', JSON.stringify(locationRequest));
    return await Impersonation.callWithToken(Impersonation.liiingo.updateLogo, formData);
  }
  return await Impersonation.callWithToken(Impersonation.liiingo.updateApp, locationRequest);
};

export const saveQrLogoCore = async (orgId: string, locationRequest: Location) => {
  await checkImpersonationSetup(orgId);
  const file = await urlToFile(locationRequest.customQrLogo, locationRequest.customQrLogoImageName);
  const formData = new FormData();
  formData.append('customQrLogo', file);
  formData.append('location', JSON.stringify(locationRequest));
  return await Impersonation.callWithToken(Impersonation.liiingo.updateLogo, formData);
};

// Save Topic
export const saveTopicCore = async (orgId: string, topicRequest: Topic) => {
  await checkImpersonationSetup(orgId);

  if (topicRequest.exhibitImage?.includes('blob')) {
    const file = await urlToFile(topicRequest.exhibitImage, topicRequest.backgroundImageName);
    await saveTopicImageExpanded(file, topicRequest.backgroundImageName, topicRequest.id);
  }

  return await Impersonation.callWithToken(Impersonation.liiingo.updateTopic, topicRequest);
};

export const deleteTopicCore = async (orgId: string, topic: Topic) => {
  let deletedTopic = { ...topic, status: Status.Deleted };
  return saveTopicCore(orgId, deletedTopic);
};

export const deleteSectionCore = async (orgId: string, section: Section) => {
  let deletedSection = { ...section, status: Status.Deleted, menuId: section.locationId };
  return saveSectionCore(orgId, deletedSection);
};

// Save Section
export const saveSectionCore = async (orgId: string, sectionRequest: Section) => {
  await checkImpersonationSetup(orgId);
  const id = await Impersonation.callWithToken(Impersonation.liiingo.updateSection, {
    ...sectionRequest,
    menuId: sectionRequest.locationId,
  });
  return id;
};

// Save Topic Order
export const saveTopicOrderCore = async (orgId: string, payload: { id: string; exhibitOrder: string[] }) => {
  await checkImpersonationSetup(orgId);
  return await Impersonation.impersonatedOrg.callWithToken(Impersonation.liiingo.updateTopicOrder, payload);
};

// Save Section Order
export const saveSectionOrderCore = async (orgId: string, locationId: string, sectionOrder: string[]) => {
  await checkImpersonationSetup(orgId);
  return await Impersonation.impersonatedOrg.callWithToken(Impersonation.liiingo.updateSectionOrder, {
    id: locationId,
    areaOrder: sectionOrder,
  });
};
