import { BSONConverter } from 'mongodb-bson-types';
import { Status } from '../status/Status';
import { Language } from './Language';

// // @ts-expect-error

// export interface newLocation extends InstanceType<typeof _Location> {}

export interface Location extends ReturnType<typeof newLocation> {}

export const newLocation = (fetchedLocation: Partial<LocationConstructorParams>) => {
  const _location = new _Location(fetchedLocation); //for data conversions (_id -> id, etc.)
  const location = JSON.parse(JSON.stringify(_location)); // serialized-converted location
  return location;
};

export interface LocationConstructorParams {
  id: string;
  _id: any;
  headerLogo: string;
  headerLogoImageName: string;
  splashScreenLogo: string;
  splashScreenLogoImageName: string;
  background: string;
  backgroundImage: string;
  backgroundImageName: string;
  name: string;
  defaultLanguage: Language;
  supportedLanguages: Language[];
  live: boolean;
  status: Status;
  contactName: string;
  phoneNumber: string;
  email: string;
  companyName: string;
  areaOrder: string[]; // back-compat
  sectionOrder: string[];
  customQrColorPrimary: string;
  customQrColorSecondary: string;
  customQrLogo: string;
  customQrLogoImageName: string;
  mobileBackground: string;
  mobileBackgroundName: string;
  mobileLogo: string;
  mobileLogoName: string;
  mobileTextColor: string;
  modifiedDate: { date: { numberLong: string } };
  enableBeacons: boolean;
  qrPreviewPath: string;
  qrUpdatedAt: { date: { numberLong: string } };
  removeQrLogoBackground: string;
  organizationId: string;
}

export class LocationDate {
  date: {
    numberLong: string;
  };
}

export class _Location {
  public id: string = '';
  public headerLogo: string | {} = '';
  public headerLogoImageName: string = '';
  public splashScreenLogo: string | {} = '';
  public splashScreenLogoImageName: string = '';
  public background: string | {} = '';
  public backgroundImageName: string = '';
  public name: string = '';
  public defaultLanguage: Language = Language.English;
  public supportedLanguages: Language[] = [Language.English];
  public live: boolean = false;
  public status: Status = Status.Hidden;
  public contactName: string = '';
  public phoneNumber: string = '';
  public email: string = '';
  public companyName: string = '';
  public sectionOrder: string[] = [];
  public customQrColorPrimary: string = '';
  public customQrColorSecondary: string = '';
  public customQrLogo: string | {} = '';
  public customQrLogoImageName: string = '';
  public mobileBackground: string | {} = '';
  public mobileBackgroundName: string = '';
  public mobileLogo: string | {} = '';
  public mobileLogoName: string = '';
  public mobileTextColor: string = '';
  public modifiedDate: { date: { numberLong: string } };
  public enableBeacons: boolean = true;
  public qrPreviewPath: string = '';
  public qrUpdatedAt: { date: { numberLong: string } } = null;
  public removeQrLogoBackground: string = '1'; // defaulting to remove background behind QR logo
  public organizationId: string = '';

  constructor(data?: Partial<LocationConstructorParams>) {
    if (!!data) {
      if (data._id) {
        this.id = BSONConverter.objectId(data._id);
      }
      this.id = data.id || this.id;
      this.headerLogo = data.headerLogo || this.headerLogo;
      this.headerLogoImageName = data.headerLogoImageName || this.headerLogoImageName;
      this.splashScreenLogo = data.splashScreenLogo || this.splashScreenLogo;
      this.splashScreenLogoImageName = data.splashScreenLogoImageName || this.splashScreenLogoImageName;
      this.background = data.background || this.background;
      if (data.backgroundImage) {
        this.background = data.backgroundImage;
      }
      this.backgroundImageName = data.backgroundImageName || this.backgroundImageName;
      this.name = data.name || this.name;
      this.defaultLanguage = data.defaultLanguage || this.defaultLanguage;
      this.supportedLanguages = data.supportedLanguages || this.supportedLanguages;
      this.live = data.live || this.live;
      this.status = data.status || this.status;
      if (data.status && data.status === Status.Live) {
        this.live = true;
      }
      this.contactName = data.contactName || this.contactName;
      this.phoneNumber = data.phoneNumber || this.phoneNumber;
      this.email = data.email || this.email;
      this.companyName = data.companyName || this.companyName;
      if (!!data.areaOrder) {
        this.sectionOrder = data.areaOrder;
      }
      if (!!data.sectionOrder) {
        this.sectionOrder = data.sectionOrder;
      }
      this.customQrColorPrimary = data.customQrColorPrimary || this.customQrColorPrimary;
      if (!this.customQrColorPrimary) {
        this.customQrColorPrimary = data['customQr'] ? data['customQr'].color : this.customQrColorPrimary;
      }
      this.customQrColorSecondary = data.customQrColorSecondary || this.customQrColorSecondary;
      if (!this.customQrColorSecondary) {
        this.customQrColorSecondary = data['customQr'] ? data['customQr'].color : this.customQrColorSecondary;
      }
      this.customQrLogo = data.customQrLogo || this.customQrLogo;
      if (!this.customQrLogo) {
        this.customQrLogo = data['customQr'] ? data['customQr'].logo : this.customQrLogo;
      }
      this.qrPreviewPath = data.qrPreviewPath || this.qrPreviewPath;
      this.qrUpdatedAt = data.qrUpdatedAt || this.qrUpdatedAt;
      this.customQrLogoImageName = data.customQrLogoImageName || this.customQrLogoImageName;
      this.removeQrLogoBackground = data.removeQrLogoBackground || this.removeQrLogoBackground;
      this.mobileBackground = data.mobileBackground || this.mobileBackground;
      if (data.mobileBackground) {
        this.mobileBackground = data.mobileBackground;
      }
      this.mobileBackgroundName = data.mobileBackgroundName || this.mobileBackgroundName;
      this.mobileLogo = data.mobileLogo || this.mobileLogo;
      if (data.mobileLogo) {
        this.mobileLogo = data.mobileLogo;
      }
      this.mobileLogoName = data.mobileLogoName || this.mobileLogoName;
      this.mobileTextColor = data.mobileTextColor || this.mobileTextColor;
      this.modifiedDate = data.modifiedDate || this.modifiedDate;
      this.enableBeacons = data.enableBeacons || this.enableBeacons;
      this.organizationId = data.organizationId || this.organizationId;
    }
  }
}
