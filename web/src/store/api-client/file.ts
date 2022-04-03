import axiosInstance from '.';
import { Content, Folder, newContent } from '../models';
import axios from 'axios';

export const urlToFile = async (url: string, name: string) => {
  const file = await fetch(url)
    .then((r) => r.blob())
    .then((blobFile) => new File([blobFile], name, { type: blobFile.type }));
  return file;
};

export const saveContent = async (content: Content) => {
  const formData = new FormData();
  for (let i = 0; i < content.languages.length; i++) {
    if (content.languages[i].fileUrl.includes('blob')) {
      const file = await urlToFile(content.languages[i].fileUrl, content.languages[i].fileName);
      if (content.type === 'video') {
        const uploadUrl = await getVideoUploadUrl();
        const videoKey = await uploadVideoToJWPlayer(uploadUrl, file);
        content.languages[i].fileUrl = videoKey;
        content.languages[i].content = videoKey;
      } else {
        //image
        content.languages[i].fileUrl = {};
        formData.append(`file[${i}]`, file);
      }
    } else if (content.languages[i].fileData) {
      formData.append(`file[${i}]`, content.languages[i].fileData);
      delete content.languages[i].fileData;
    }
  }
  if (!!content._id) {
    content['id'] = content._id; // back-compat
  }
  formData.append(`content`, JSON.stringify(content));
  return axiosInstance.post('/content/save', formData).then((res: any) => res.data);
};

export const uploadVideoToJWPlayer = (url: string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  //use axios directly so we don't get overridden by our axiosInstance's default headers and baseurl
  return axios.post(url, formData).then((res: any) => res.data.media.key);
};

export const getVideoUploadUrl = () => {
  return axiosInstance
    .post<string>('/content/getJWPUploadLink', {})
    .then(
      (res: any) =>
        `https://${res.data.link.address}${res.data.link.path}?api_format=json&key=${res.data.link.query.key}&token=${res.data.link.query.token}`
    );
};

export const getContentById = (fileId: string) => {
  return axiosInstance
    .post<Content>('/content/getById', {
      id: fileId,
    })
    .then((res) => newContent(res.data));
};

export const searchFiles = (searchTerm: string, sortBy?: string, sortOrder?: number) => {
  return axiosInstance
    .post<Content[]>('/content/search', {
      searchTerm: searchTerm,
      sortBy: sortBy,
      sortOrder: sortOrder,
    })
    .then((res: any) => res.data.map((r) => newContent(r)));
};

export const duplicateContent = (contentId: string) => {
  return axiosInstance.post<string>('/content/duplicate', { id: contentId }).then((res) => res.data);
};

export const deleteContent = (contentId: string) => {
  return axiosInstance.post('/content/delete', { id: contentId }).then((res) => res.data);
};

export const toggleShareContent = (contentId: string) => {
  return axiosInstance.post('/content/share', { id: contentId }).then((res) => res.data);
};

export const getRootFolder = (sortBy?: string, sortOrder?: number) => {
  return axiosInstance
    .post<Folder>('/folder/root', {
      sortBy: sortBy,
      sortOrder: sortOrder,
    })
    .then((res) => new Folder(res.data));
};

export const getFolderById = (folderId: string, sortBy?: string, sortOrder?: number) => {
  return axiosInstance
    .post<Folder>('/folder/get', {
      id: folderId,
      sortBy: sortBy,
      sortOrder: sortOrder,
    })
    .then((res) => new Folder(res.data));
};

export const createNewFolder = (folderName: string, parentFolderId: string) => {
  return axiosInstance
    .post('/folder/create', {
      name: folderName,
      parentFolderId: parentFolderId,
    })
    .then((res) => res.data['folderId']);
};

export const updateFolder = (folderId: string, folderName: string, parentFolderId: string) => {
  return axiosInstance
    .post('/folder/update', {
      id: folderId,
      name: folderName,
      parentFolderId: parentFolderId,
    })
    .then((res) => res.data);
};

export const getImageConent = (
  id: string | number,
  searchTerm: string = '',
  page: number = 1,
  pageSize: number = 10
) => {
  return axiosInstance
    .post(`/content/getOrganizationContent`, { id, page, searchTerm, pageSize })
    .then((res) => res.data);
};

export const getContentByExhibitId = (topicId: string) => {
  return axiosInstance.post<Content[]>('/content/getByExhibitId', { id: topicId }).then((res: any) => {
    return res.data.content.map((r) => newContent(r));
  });
};

// Can't get content for hidden pages (weird Liiingo API legacy behavior..) so we need to get contentExpanded from /getExhibitById endpoint
export const getContentByTopicId = (topicId: string) => {
  return axiosInstance
    .post<Content[]>('/exhibit/getExhibitById', { exhibitId: topicId })
    .then((res: any) => res.data.exhibit.contentExpanded.map((r) => newContent(r)));
};

export const getTopicBackground = async (topicId: string) => {
  return axiosInstance
    .post<string>('/exhibit/getExhibitById', { exhibitId: topicId })
    .then((res: any) => res.data.exhibit.exhibitImage);
};
