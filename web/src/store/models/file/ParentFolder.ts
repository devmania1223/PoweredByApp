import { DocBase } from '../collection/DocBase';
import { BSONConverter } from 'mongodb-bson-types';

export class ParentFolder extends DocBase {
  public name: string = '';
  public parentFolderId: string = '';

  constructor(params?: Partial<ParentFolder>) {
    super(params);
    if (!!params) {
      this.name = params.name || this.name;
      if (!!params.parentFolderId) {
        this.parentFolderId = BSONConverter.objectId(params.parentFolderId);
      }
    }
  }
}
