import { AnalyticsDate, AnalyticsId } from './Analytics';

export type TopContentMetadata = {
  areaId?: string;
  exhibitId?: string;
  locationId?: string;
  organizationId?: string;
  viewsBy?: string;
  platform?: string;
  browser?: string;
  appSession?: string;
  orgName?: string;
  locationName?: string;
  areaName?: { name: string; language: string }[];
  exhibitName?: { name: string; language: string }[];
};

export type TopContentResponse = {
  _id: AnalyticsId;
  type: string;
  uuid: string;
  os: string;
  metadata: TopContentMetadata;
  createdDate: AnalyticsDate;
  modifiedDate: AnalyticsDate;
  status: number;
};

export type TopContentType = {
  label: {
    name: string;
    language: string;
  };
  value: number;
  change?: number;
};
