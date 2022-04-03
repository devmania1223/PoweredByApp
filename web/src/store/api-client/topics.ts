import { cloneDeep } from 'lodash';
import axiosInstance from '.';
import { newTopic, SimpleTopic, Status, Topic } from '../models';
import { urlToFile } from './file';

function stripQuotes(res: any): string {
  if (typeof res === 'string' && res !== 'null') {
    return res.replace(/['"]+/g, '');
  } else {
    return '';
  }
}

export const getTopicById = (topicId: string) => {
  return axiosInstance.post<any>('/exhibit/getExhibitById', { exhibitId: topicId }).then((res: any) => {
    return newTopic(res.data.exhibit);
  });
};

export const getAllTopics = () => {
  return axiosInstance
    .post<Topic[]>('/exhibit/getAllExhibits', {})
    .then((res: any) => res.data.map((r) => newTopic(r)));
};

export const getLastViewedTopicId = () => {
  return axiosInstance.post('/exhibit/lastViewed', {}, { responseType: 'text' }).then((res) => stripQuotes(res.data));
};

export const getTopicsBySectionId = (sectionId: string) => {
  return axiosInstance
    .post<Topic[]>('/exhibit/getExhibitsByAreaId', { areaId: sectionId })
    .then((res: any) => res.data.map((r) => newTopic(r)));
};

export const getTopicsByLocationId = (locationId: string) => {
  return axiosInstance
    .post<Topic[]>('/exhibit/getExhibitsByLocationId', { locationId: locationId })
    .then((res: any) => res.data.map((r) => newTopic(r)));
};

export const saveTopic = async (topic: Topic) => {
  if (topic.exhibitImage?.includes('blob')) {
    const file = await urlToFile(topic.exhibitImage, topic.backgroundImageName);
    await saveTopicImageExpanded(file, topic.backgroundImageName, topic.id);
  }
  const response = await axiosInstance.post('/exhibit/save', topic);
  return response.data;
};

export const deleteTopic = (topic: Topic) => {
  let cloneTopic = cloneDeep(topic);
  cloneTopic.status = Status.Deleted;
  return saveTopic(cloneTopic).then((res: any) => res.data);
};

export const saveTopicOrder = async (sectionId: string, topicOrder: string[]) => {
  const response = await axiosInstance.post('/area/setExhibitOrder', {
    id: sectionId,
    exhibitOrder: topicOrder,
  });
  return response.data;
};

export const getMyTopicsList = () => {
  return axiosInstance
    .post<Topic[]>('/exhibit/getExhibitsByOrganizationId', {})
    .then((res: any) => res.data.map((r) => newTopic(r)));
};

export const getMySimpleTopicsList = () => {
  return axiosInstance
    .get<SimpleTopic[]>('/exhibit/getMyExhibitListSimple')
    .then((res: any) => res.data.map((r) => new SimpleTopic(r)));
};

export const saveTopicImage = (topic: Topic) => {
  const { background, backgroundImageName, id } = topic;
  const formData = new FormData();
  formData.append(`background`, background);
  formData.append(`backgroundImageName`, backgroundImageName);
  formData.append(`id`, id);
  return axiosInstance.post('/exhibit/saveBackground', formData).then((res: any) => res.data);
};

export const saveTopicImageExpanded = async (background: File, backgroundImageName: string, id: string) => {
  const formData = new FormData();
  formData.append(`background`, background);
  formData.append(`backgroundImageName`, backgroundImageName);
  formData.append(`id`, id);
  const response = await axiosInstance.post('/exhibit/saveBackground', formData);
  return response.data;
};

export const getZipPath = (type: string, id: string) => {
  return axiosInstance
    .post('/exhibit/getZipPath', {
      topicId: id,
      type,
    })
    .then((res) => res.data.zipPath);
};
