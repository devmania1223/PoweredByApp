import { Device } from './Device';
import { BoxUpdate } from './BoxUpdate';
import { DocBase } from '../collection/DocBase';
import { Organization } from '../organization/Organization';

export class Box extends DocBase {
  public name: string = '';
  public device: Device = new Device();
  public shortCode: string = '';
  public organizationId: string = '';
  public organization: Organization = new Organization();
  public topicId: string = '';
  public topicName?: string = '';
  public content: BoxUpdate = new BoxUpdate();
  public binary: BoxUpdate = new BoxUpdate();
  public notes: string = '';

  constructor(params?: Partial<Box>) {
    super(params);
    if (!!params) {
      this.name = params.name || this.name;
      if (!!params.device) {
        this.device = new Device(params.device);
      }
      if (!!params.organization) {
        this.organization = new Organization(params.organization);
      }
      this.shortCode = params.shortCode || this.shortCode;
      this.organizationId = params.organizationId || this.organizationId;
      this.topicId = params.topicId || this.topicId;
      this.topicName = params.topicName || this.topicName;
      if (!!params.content) {
        this.content = new BoxUpdate(params.content);
      }
      if (!!params.binary) {
        this.binary = new BoxUpdate(params.binary);
      }
      this.notes = params.notes || this.notes;
    }
  }
}
