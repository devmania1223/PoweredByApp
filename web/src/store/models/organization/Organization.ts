import { DocBase } from '../collection/DocBase';
import { OrganizationType } from './OrganizationType';

export class Organization extends DocBase {
  public name: string = '';
  public email: string = '';
  public type: OrganizationType = null;
  public parentId: string = '';
  public parentLocationId: string = '';

  constructor(params?: Partial<Organization>) {
    super(params);
    if (!!params) {
      this.name = params.name || this.name;
      this.email = params.email || this.email;
      this.type = params.type || this.type;
      this.parentId = params.parentId || this.parentId;
      this.parentLocationId = params.parentLocationId || this.parentLocationId;
      this.status = params.status;
    }
  }
}
