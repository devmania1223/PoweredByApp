import { BSONConverter } from 'mongodb-bson-types';
import { Topic } from '../topic/Topic';
import { Status } from '../status/Status';
import { Title } from '../title/Title';
import { Language } from '../location/Language';

export interface Section extends ReturnType<typeof newSection> {}

export const newSection = (fetchedSection: Partial<SectionConstructorParams>) => {
  const _section = new _Section(fetchedSection); //for data conversions (_id -> id, etc.)
  const section = JSON.parse(JSON.stringify(_section)); // serialized-converted Section
  return section;
};
interface SectionConstructorParams {
  id: string;
  _id: any;
  name: Title[];
  status: Status;
  exhibits: Topic[]; // back-compat
  exhibitOrder: string[]; // back-compat
  topicOrder: string[];
  locationId: string;
  organizationId: string;
}

export class _Section {
  public id: string = '';
  public name: Title[] = [];
  public status: Status = Status.Hidden;
  public topicOrder: string[] = [];
  public locationId: string = '';
  public organizationId: string = '';

  constructor(data?: Partial<SectionConstructorParams>) {
    if (!!data) {
      if (data._id) {
        this.id = BSONConverter.objectId(data._id);
      }
      this.id = data.id || this.id;
      this.status = data.status || this.status;
      this.locationId = data.locationId || this.locationId; // back-compat
      this.locationId = data.locationId || this.locationId;

      if (data.name && Array.isArray(data.name)) {
        this.name = [...data.name];
      }

      if (!!data.exhibitOrder) {
        this.topicOrder = data.exhibitOrder;
      }
      if (!!data.topicOrder) {
        this.topicOrder = data.topicOrder;
      }
      this.organizationId = data.organizationId || this.organizationId;
    }
  }

  public getName(): string {
    const title = this.name.find((n) => n.language === Language.English);
    if (!!title) {
      return title.name;
    } else {
      return this.name[0].name;
    }
  }
}
