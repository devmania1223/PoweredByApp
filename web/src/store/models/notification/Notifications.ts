import { DocBase } from '../collection/DocBase';

export enum TopicType {
  Exhibit = 'exhibit',
  Area = 'area',
  Location = 'location',
}

export enum ScheduleType {
  Schedule = 'schedule',
  Immediate = 'immediate',
}

/*
interface NotificationParams {
  topicName: string;
  topicType: TopicType;
  topicTypeId: string;
  message: string;
  scheduleType: ScheduleType;
  scheduleTime: string;
}
*/

export class Notifications extends DocBase {}
