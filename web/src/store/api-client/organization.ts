import axiosInstance from '.';
import { NewOrganization, Organization } from '../models';

export const getOrganizationById = (orgId?: string) => {
  return axiosInstance.post<Organization>('/organization/get', { id: orgId }).then((res) => new Organization(res.data));
};

export const updateOrgEmail = async (org: Organization, email: string, firstName?: string) => {
  const name = firstName ? `${email} (${firstName})` : email + org.name.slice(org.name.indexOf(' '));
  const updatedOrg = { ...org, email, name, id: org._id, _id: '' };
  return axiosInstance
    .post<{ organizationId: string }>('/organization/create', updatedOrg)
    .then((res: any) => res.data);
};

export const getAllOrganizations = () => {
  return axiosInstance
    .post<Organization[]>('/organization/getAll', {})
    .then((res: any) => res.data.map((r) => new Organization(r)));
};

export const deleteOrganization = (orgId: string) => {
  return axiosInstance.post('/organization/delete', { id: orgId }).then((res: any) => res.data);
};

export const undoDeleteOrganization = (orgId: string) => {
  return axiosInstance.post('/organization/undoDelete', { id: orgId }).then((res: any) => res.data);
};

export const saveOrganization = (newOrg: NewOrganization) => {
  return axiosInstance.post<{ organizationId: string }>('/organization/create', newOrg).then((res: any) => res.data);
};

export const updateOrganization = (org: Organization) => {
  return axiosInstance.post<{ organizationId: string }>('/organization/create', org).then((res: any) => res.data);
};

export const resetForgottenPassword = (token: string, passwords: Object) => {
  return axiosInstance
    .post('/organization/updateForgottenPassword', passwords, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res: any) => res.data);
};

export const resetPasswordEmail = (email: string) => {
  return axiosInstance.post('/organization/resetPasswordEmail', { email: email }).then((res: any) => res.data);
};
