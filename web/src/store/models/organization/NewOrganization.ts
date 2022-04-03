import { OrganizationType } from './OrganizationType';

export interface NewOrganization {
  name: string;
  email: string;
  type: OrganizationType;
  password: string;
  password2: string;
}
