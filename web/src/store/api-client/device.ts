import axiosInstance from '.';
import { Box } from '../models';

export const pairDevice = (shortCode: string) => {
  return axiosInstance.post('/box/pairDevice', { shortCode: shortCode }).then((res: any) => res.data);
};

export const deviceList = (
  organizationIds: string[] = [],
  limit: number = 26,
  sortBy: string = null,
  sortOrder: number = 1
) => {
  return axiosInstance
    .post<Box[]>('/box/deviceList', {
      organizationIds: organizationIds,
      limit: limit,
      sortBy: sortBy,
      sortOrder: sortOrder,
    })
    .then((res: any) => res.data.map((r) => new Box(r)));
};

export const setBoxTopic = (boxId: string, topicId: string) => {
  return axiosInstance
    .post<boolean>('/box/setTopic', {
      boxId: boxId,
      topicId: topicId,
    })
    .then((res: any) => res.data);
};

export const setBoxName = (boxId: string, name: string) => {
  return axiosInstance
    .post<boolean>('/box/setName', {
      boxId: boxId,
      name: name,
    })
    .then((res: any) => res.data);
};

export const setBoxNotes = (boxId: string, notes: string) => {
  return axiosInstance
    .post<boolean>('/box/setNotes', {
      boxId: boxId,
      notes: notes,
    })
    .then((res: any) => res.data);
};

export const deleteBox = (boxId: string) => {
  return axiosInstance
    .post<boolean>('/box/delete', {
      boxId: boxId,
    })
    .then((res: any) => res.data);
};
