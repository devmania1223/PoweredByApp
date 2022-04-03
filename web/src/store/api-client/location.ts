import axiosInstance from '.';
import { Location, newLocation, newTopic, Topic } from '../models';

export const getAllLocations = () => {
  return axiosInstance
    .post<Location[]>('/location/get', {})
    .then((res: any) => res.data.map((r: any) => newLocation(r)));
};

//TODO: Implement this endpoint in PHP api
export const getLocationsByEmail = async (email: string) => {
  return axiosInstance
    .post<Location[]>('/location/get', {})
    .then((res: any) => res.data.map((r: any) => newLocation(r)))
    .then((locations: Location[]) => locations.filter((loc) => loc.email === email));
};

export const getLocationsByOrgId = (organization_id) => {
  return axiosInstance
    .post<Location[]>('/location/getLocationsByOrgId', { organization_id })
    .then((res: any) => res.data.map((r) => newLocation(r)));
};

export const getLocationById = (locationId: string) => {
  return axiosInstance.post<Location>('/location/get', { locationId: locationId }).then((res) => newLocation(res.data));
};

// probably going to rewrite this later; generalize for all location images (splashScreenLogo, background, customQrLogo, mobileBackground, mobileLogo)
export const saveHeaderLogo = async (location: Location, file: File) => {
  const formData = new FormData();
  formData.append('file[0]', file);
  formData.append('location', JSON.stringify(location));
  const response = await axiosInstance.post('/location/save', formData);
  return response.data;
};

export const saveQrLogo = async (location: Location, file: File) => {
  const formData = new FormData();
  formData.append('customQrLogo', file);
  formData.append('location', JSON.stringify(location));
  const response = await axiosInstance.post('/location/save', formData);
  return response.data;
};

export const saveLocation = async (location: Location) => {
  const formData = new FormData();
  formData.append(`location`, JSON.stringify(location));
  const response = await axiosInstance.post('/location/save', formData);
  return response.data;
};

export const deleteLocationImg = (locationId: string, imgField: string) => {
  return axiosInstance
    .post('/location/deleteImg', {
      locationId: locationId,
      imgField: imgField,
    })
    .then((res: any) => res.data);
};

export const saveQrSettings = async (qrSettings: any, locationId) => {
  try {
    const formData = new FormData();

    if (!!qrSettings.logo) {
      formData.append(`customQrLogo`, qrSettings.logo);
    }

    const data = { color: qrSettings.color, locationId: locationId };
    formData.append(`customQrSettings`, JSON.stringify(data));
    const response = await axiosInstance.post<any>('/location/saveCustomQrSettings', formData);
    return response;
  } catch (err) {}
};

export const getTopicOfParent = (id, parentLocationId) => {
  return axiosInstance
    .post<Topic[]>('/location/getParent', { id, parentLocationId })
    .then((res: any) => res.data.map((r) => newTopic(r)));
};
