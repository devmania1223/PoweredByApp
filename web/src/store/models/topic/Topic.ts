import { Status } from '../status/Status';
import { newTitle, Title } from '../title/Title';
import { Language } from '../location/Language';
import { BSONConverter } from 'mongodb-bson-types';
import { Content, newContent } from '../file/FileContent';
import { SlideshowSettings } from './SlideshowSettings';

export interface Topic extends ReturnType<typeof newTopic> {}

export const newTopic = (fetchedTopic: Partial<TopicConstructorParams>) => {
  const _topic = new _Topic(fetchedTopic); //for data conversions (_id -> id, etc.)
  const topic = JSON.parse(JSON.stringify(_topic)); // serialized-converted Topic
  return topic;
};

interface ExhibitLocation {
  latitude: number;
  logitude: number;
  radius: number;
  customeMessage: string;
}

interface TopicConstructorParams {
  id: string;
  _id: any;
  areaId: string; // back-compat
  sectionId: string;
  name: Title[];
  status: Status;
  content: any[];
  qr: string;
  qrZip: string;
  qrUpdatedAt: { date: { numberLong: string } };
  contentExpanded: Content[];
  branchUrl: string;
  branchLinkUrl: string;
  enableSharing: boolean;
  organizationId: string;
  slideshowSettings: SlideshowSettings;
  background: string;
  backgroundImageName: string;
  exhibitImage: string;
  loc: ExhibitLocation;
}

export class _Topic {
  public id: string = '';
  public sectionId: string = '';
  public name: Title[] = [newTitle({})];
  public status: Status = Status.Hidden;
  public qr: string = '';
  public qrZip: string = '';
  public qrUpdatedAt: { date: { numberLong: string } } = null;
  public content: string[] = [];
  public contentExpanded: Content[] = [];
  public branchUrl: string = '';
  public branchLinkUrl: string = '';
  public enableSharing: boolean = false;
  public organizationId: string = '';
  public slideshowSettings: SlideshowSettings = new SlideshowSettings();
  public background: string = null;
  public backgroundImageName: string = null;
  public exhibitImage: string = null;
  public loc: ExhibitLocation | null = null;

  constructor(data?: Partial<TopicConstructorParams>) {
    if (!!data) {
      this.id = data.id || this.id;
      if (data._id) {
        this.id = BSONConverter.objectId(data._id);
      }
      this.sectionId = data.areaId || this.sectionId;
      this.sectionId = data.sectionId || this.sectionId;
      // this.name = data.name || this.name;
      if (data.name && Array.isArray(data.name)) {
        this.name = [...data.name];
      }
      this.status = data.status || this.status;
      this.qr = data.qr || this.qr;
      this.qrUpdatedAt = data.qrUpdatedAt || this.qrUpdatedAt;
      this.content = data.content || this.content;
      if (Array.isArray(data.contentExpanded)) {
        this.contentExpanded = data.contentExpanded.map((c) => newContent(c));
      }
      this.branchUrl = data.branchUrl || this.branchUrl;
      this.branchLinkUrl = data.branchLinkUrl || this.branchLinkUrl;
      this.enableSharing = data.enableSharing || this.enableSharing;
      this.organizationId = data.organizationId || this.organizationId;
      if (!!data.slideshowSettings) {
        this.slideshowSettings = new SlideshowSettings(data.slideshowSettings);
      }
      if (data.background) {
        this.background = data.background;
      }
      this.backgroundImageName = data.backgroundImageName || this.backgroundImageName;
      this.exhibitImage = data.exhibitImage || this.exhibitImage;
      this.loc = data.loc || this.loc;
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
