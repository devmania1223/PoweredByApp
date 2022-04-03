import { AnalyticsDate, AnalyticsId } from './Analytics';

export type ViewedContent = {
  areaId: string;
  exhibitId: string;
  locationId: string;
  openTime: string;
  organizationId: string;
};

export type TrafficMetadata = {
  browser?: string;
  closeTime?: AnalyticsDate;
  eventsCount?: number;
  platform?: string;
  startTime?: AnalyticsDate;
  viewedContent?: ViewedContent[];
};

export type TrafficResponse = {
  _id: AnalyticsId;
  udid: string;
  type: string;
  os: string;
  createdDate: AnalyticsDate;
  modifiedDate: AnalyticsDate;
  metadata: TrafficMetadata;
};

export type UserTraffic = {
  key: string;
  value: number;
  display: string;
  timestamp: number;
};
