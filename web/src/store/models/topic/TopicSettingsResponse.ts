import { Status } from '../status/Status';

export interface TopicSettingsResponse {
  deleteForever: boolean;
  defaultSeconds: number;
  enableSharing: boolean;
  status: Status;
}
