import { BSONConverter } from 'mongodb-bson-types';
import { newTitle, Title } from '../title/Title';
import { Language } from '../location/Language';

export class AssignedTopic {
  public _id: string = '';
  public name: Title[] = [];

  constructor(params?: Partial<AssignedTopic>) {
    if (!!params) {
      this._id = BSONConverter.objectId(params._id) || this._id;
      if (Array.isArray(params.name)) {
        this.name = params.name.map((n) => newTitle(n));
      }
    }
  }

  public getDisplayTitle(): string {
    return this.getLanguageField('name');
  }

  public getLanguageField(fieldName: string): any {
    const language = this.name.find((n) => n.language === Language.English);
    if (!!language && !!language[fieldName]) {
      return language[fieldName];
    } else if (!!this.name[0] && !!this.name[0][fieldName]) {
      return this.name[0][fieldName];
    } else {
      return 'No Title';
    }
  }
}
