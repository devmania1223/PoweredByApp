import { BSONConverter } from 'mongodb-bson-types';

export class BoxUpdate {
  public hasUpdates: boolean = false;
  public lastCheckIn: Date = null;
  public scheduledUpdate: Date = null;

  constructor(params?: Partial<BoxUpdate>) {
    if (!!params) {
      this.hasUpdates = params.hasUpdates || this.hasUpdates;
      if (!!params.lastCheckIn) {
        this.lastCheckIn = new Date(BSONConverter.UTCDateTime(params.lastCheckIn));
      }
      if (!!params.scheduledUpdate) {
        this.scheduledUpdate = new Date(BSONConverter.UTCDateTime(params.scheduledUpdate));
      }
    }
  }
}
