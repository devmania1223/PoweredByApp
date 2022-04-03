import { BSONConverter } from 'mongodb-bson-types';
import { DocStatus } from './DocStatus';

export interface DocBaseModel {
  _id: string;
  createdDate: Date;
  modifiedDate: Date;
  status: DocStatus;
}

export class DocBase {
  public _id: string = '';
  public createdDate: Date = null;
  public modifiedDate: Date = null;
  public status: DocStatus = DocStatus.Active;

  constructor(data?: any) {
    if (!!data) {
      this.status = data.status || this.status;
      if (!!data._id) {
        this._id = BSONConverter.objectId(data._id);
      }
      if (!!data.createdDate) {
        if (data.createdDate instanceof Date) {
          this.createdDate = data.createdDate;
        } else {
          this.createdDate = new Date(BSONConverter.UTCDateTime(data.createdDate));
        }
      }
      if (!!data.modifiedDate) {
        if (data.modifiedDate instanceof Date) {
          this.modifiedDate = data.modifiedDate;
        } else {
          this.modifiedDate = new Date(BSONConverter.UTCDateTime(data.modifiedDate));
        }
      }
    }
  }
}
