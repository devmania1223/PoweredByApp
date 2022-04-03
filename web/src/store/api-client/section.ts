import axiosInstance, { stripQuotes } from '.';
import { newSection, Section, Status } from '../models';

export const getSectionById = (sectionId: string) => {
  return axiosInstance.post('/area/getAreaById', { areaId: sectionId }).then((res) => newSection(res.data));
};

export const getSectionsByLocationId = (locationId: string) => {
  return axiosInstance
    .post<Section[]>('/area/getAreasByLocationId', { locationId: locationId })
    .then((res: any) => res.data.map((r) => newSection(r)));
};

export const saveSection = async (section: Section) => {
  return axiosInstance.post('/area/save', { ...section, menuId: section.locationId }).then((res) => {
    if (typeof res.data === 'string') {
      return stripQuotes(res.data);
    } else {
      return res.data;
    }
  });
};

export const deleteSection = async (section: Section) => {
  let deletedSection = { ...section, status: Status.Deleted, menuId: section.locationId };
  return axiosInstance.post<any>('/area/save', deletedSection).then((res: any) => res.data);
};

export const saveSectionOrder = (locationId: string, sectionOrder: string[]) => {
  return axiosInstance
    .post('/location/setAreaOrder', { id: locationId, areaOrder: sectionOrder })
    .then((res: any) => res.data);
};
