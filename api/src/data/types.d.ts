import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `ID` scalar type represents a unique MongoDB identifier in collection. MongoDB by default use 12-byte ObjectId value (https://docs.mongodb.com/manual/reference/bson-types/#objectid). But MongoDB also may accepts string or integer as correct values for _id field. */
  MongoID: any;
  /** The string representation of JavaScript regexp. You may provide it with flags "/^abc.*\/i" or without flags like "^abc.*". More info about RegExp characters and flags: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions */
  RegExpAsString: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AppOnboardingFlow = {
  __typename?: 'AppOnboardingFlow';
  /** The portion of the URL immediately following the domain name that will route to the onboarding flow for this Organization. For example: "myRoute" will make this onboarding flow accessible at "poweredby.liiingo.com/myRoute/sign-up" */
  route: Scalars['String'];
  stripeSubscriptionId?: Maybe<Scalars['String']>;
  /** S3 url */
  logo?: Maybe<Scalars['String']>;
  /** S3 URL */
  favicon?: Maybe<Scalars['String']>;
  createNewOrganization?: Maybe<Scalars['Boolean']>;
  _id: Scalars['MongoID'];
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  essentialTemplate?: Maybe<EssentialTemplate>;
  organization?: Maybe<Organization>;
};

export type BillingPortalResponse = {
  __typename?: 'BillingPortalResponse';
  url: Scalars['String'];
};

export type CardChecks = {
  __typename?: 'CardChecks';
  cvcCheck?: Maybe<Scalars['String']>;
};

export type CardResponse = {
  __typename?: 'CardResponse';
  brand?: Maybe<Scalars['String']>;
  checks?: Maybe<CardChecks>;
};

export type ContentLanguages = {
  __typename?: 'ContentLanguages';
  en?: Maybe<ContentLanguagesContent>;
  es?: Maybe<ContentLanguagesContent>;
  zh_Hans?: Maybe<ContentLanguagesContent>;
  de?: Maybe<ContentLanguagesContent>;
  pt?: Maybe<ContentLanguagesContent>;
  fr?: Maybe<ContentLanguagesContent>;
  it?: Maybe<ContentLanguagesContent>;
  ru?: Maybe<ContentLanguagesContent>;
  ja?: Maybe<ContentLanguagesContent>;
  ko?: Maybe<ContentLanguagesContent>;
  no?: Maybe<ContentLanguagesContent>;
  el?: Maybe<ContentLanguagesContent>;
  tr?: Maybe<ContentLanguagesContent>;
};

export type ContentLanguagesContent = {
  __typename?: 'ContentLanguagesContent';
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  fileUrl?: Maybe<Scalars['String']>;
};

export type ContentLanguagesContentInput = {
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  fileUrl?: Maybe<Scalars['String']>;
  binaryValue?: Maybe<Scalars['Upload']>;
};

export type ContentLanguagesInput = {
  en?: Maybe<ContentLanguagesContentInput>;
  es?: Maybe<ContentLanguagesContentInput>;
  zh_Hans?: Maybe<ContentLanguagesContentInput>;
  de?: Maybe<ContentLanguagesContentInput>;
  pt?: Maybe<ContentLanguagesContentInput>;
  fr?: Maybe<ContentLanguagesContentInput>;
  it?: Maybe<ContentLanguagesContentInput>;
  ru?: Maybe<ContentLanguagesContentInput>;
  ja?: Maybe<ContentLanguagesContentInput>;
  ko?: Maybe<ContentLanguagesContentInput>;
  no?: Maybe<ContentLanguagesContentInput>;
  el?: Maybe<ContentLanguagesContentInput>;
  tr?: Maybe<ContentLanguagesContentInput>;
};

export type CreateCheckoutSessionResponse = {
  __typename?: 'CreateCheckoutSessionResponse';
  sessionId: Scalars['String'];
};

export type CreatePlanMutationResponse = {
  __typename?: 'CreatePlanMutationResponse';
  plan?: Maybe<Plan>;
};

export type CreateTemplatedAppOnboardingFlowMutationResponse = {
  __typename?: 'CreateTemplatedAppOnboardingFlowMutationResponse';
  appOnboardingFlow?: Maybe<AppOnboardingFlow>;
};

export type CreateTemplatedOrgOnboardingFlowMutationResponse = {
  __typename?: 'CreateTemplatedOrgOnboardingFlowMutationResponse';
  orgOnboardingFlow?: Maybe<AppOnboardingFlow>;
};

export type CustomerPaymentMethodResponse = {
  __typename?: 'CustomerPaymentMethodResponse';
  id: Scalars['String'];
  object?: Maybe<Scalars['String']>;
  card?: Maybe<CardResponse>;
};


export type DeleteNotificationResponse = {
  __typename?: 'DeleteNotificationResponse';
  success: Scalars['Boolean'];
};

export enum EnumLocationExhibitTemplatedContentLiiingoContentType {
  Webview = 'webview',
  Text = 'text',
  Image = 'image',
  Video = 'video'
}

export enum EnumOrganizationType {
  Child = 'child',
  Provider = 'provider',
  Subscriber = 'subscriber',
  Partner = 'partner'
}

export type ErrorInterface = {
  /** Generic error message */
  message?: Maybe<Scalars['String']>;
};

export type EssentialTemplate = {
  __typename?: 'EssentialTemplate';
  /** A human-readable name for the template. Examples: "PAVE Plus", "Food Menu Basic" */
  name: Scalars['String'];
  /** The Stripe product code used by Stripe to bill a customer for this template */
  stripeProductCode: Scalars['String'];
  /** The locationId of the template app */
  templateId: Scalars['String'];
  _id: Scalars['MongoID'];
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type EssentialTemplateInput = {
  name: Scalars['String'];
  /** This is actually referred to as a "Price" in the Stripe Dashboard and looks like this: price_1IrDFwC8BvMYvOOAZXyvDnaG */
  stripeProductCode: Scalars['String'];
  /** The locationId of the template app */
  templateId: Scalars['String'];
};

export type FilterFindManyAppOnboardingFlowInput = {
  /** The portion of the URL immediately following the domain name that will route to the onboarding flow for this Organization. For example: "myRoute" will make this onboarding flow accessible at "poweredby.liiingo.com/myRoute/sign-up" */
  route?: Maybe<Scalars['String']>;
  organizationId?: Maybe<Scalars['MongoID']>;
  templateId?: Maybe<Scalars['MongoID']>;
  stripeSubscriptionId?: Maybe<Scalars['String']>;
  /** S3 url */
  logo?: Maybe<Scalars['String']>;
  /** S3 URL */
  favicon?: Maybe<Scalars['String']>;
  createNewOrganization?: Maybe<Scalars['Boolean']>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterFindManyAppOnboardingFlowOperatorsInput>;
  OR?: Maybe<Array<FilterFindManyAppOnboardingFlowInput>>;
  AND?: Maybe<Array<FilterFindManyAppOnboardingFlowInput>>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyAppOnboardingFlowOperatorsInput = {
  route?: Maybe<FilterFindManyAppOnboardingFlowRouteOperatorsInput>;
  _id?: Maybe<FilterFindManyAppOnboardingFlow_IdOperatorsInput>;
};

export type FilterFindManyAppOnboardingFlowRouteOperatorsInput = {
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  ne?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  regex?: Maybe<Scalars['RegExpAsString']>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterFindManyAppOnboardingFlow_IdOperatorsInput = {
  gt?: Maybe<Scalars['MongoID']>;
  gte?: Maybe<Scalars['MongoID']>;
  lt?: Maybe<Scalars['MongoID']>;
  lte?: Maybe<Scalars['MongoID']>;
  ne?: Maybe<Scalars['MongoID']>;
  in?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  nin?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterFindManyOrganizationAddressInput = {
  country?: Maybe<Scalars['String']>;
  administrativeArea?: Maybe<Scalars['String']>;
  subAdministrativeArea?: Maybe<Scalars['String']>;
  locality?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  thoroughfare?: Maybe<Scalars['String']>;
  premise?: Maybe<Scalars['String']>;
};

export type FilterFindManyOrganizationInput = {
  name?: Maybe<Scalars['String']>;
  address?: Maybe<FilterFindManyOrganizationAddressInput>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  type?: Maybe<EnumOrganizationType>;
  parentId?: Maybe<Scalars['String']>;
  parentMenuId?: Maybe<Scalars['String']>;
  userIds?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  _id?: Maybe<Scalars['MongoID']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterFindManyOrganizationOperatorsInput>;
  OR?: Maybe<Array<FilterFindManyOrganizationInput>>;
  AND?: Maybe<Array<FilterFindManyOrganizationInput>>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyOrganizationOperatorsInput = {
  _id?: Maybe<FilterFindManyOrganization_IdOperatorsInput>;
};

export type FilterFindManyOrganization_IdOperatorsInput = {
  gt?: Maybe<Scalars['MongoID']>;
  gte?: Maybe<Scalars['MongoID']>;
  lt?: Maybe<Scalars['MongoID']>;
  lte?: Maybe<Scalars['MongoID']>;
  ne?: Maybe<Scalars['MongoID']>;
  in?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  nin?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterFindManyUserCreatedAtOperatorsInput = {
  gt?: Maybe<Scalars['Date']>;
  gte?: Maybe<Scalars['Date']>;
  lt?: Maybe<Scalars['Date']>;
  lte?: Maybe<Scalars['Date']>;
  ne?: Maybe<Scalars['Date']>;
  in?: Maybe<Array<Maybe<Scalars['Date']>>>;
  nin?: Maybe<Array<Maybe<Scalars['Date']>>>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterFindManyUserInput = {
  sub?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  organizationId?: Maybe<Scalars['MongoID']>;
  locationId?: Maybe<Scalars['MongoID']>;
  planId?: Maybe<Scalars['MongoID']>;
  billing?: Maybe<Scalars['String']>;
  referrer?: Maybe<Scalars['String']>;
  inviteAccepted?: Maybe<Scalars['Boolean']>;
  active?: Maybe<Scalars['Boolean']>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterFindManyUserOperatorsInput>;
  OR?: Maybe<Array<FilterFindManyUserInput>>;
  AND?: Maybe<Array<FilterFindManyUserInput>>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyUserOperatorsInput = {
  sub?: Maybe<FilterFindManyUserSubOperatorsInput>;
  _id?: Maybe<FilterFindManyUser_IdOperatorsInput>;
  createdAt?: Maybe<FilterFindManyUserCreatedAtOperatorsInput>;
};

export type FilterFindManyUserSubOperatorsInput = {
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  ne?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  regex?: Maybe<Scalars['RegExpAsString']>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterFindManyUser_IdOperatorsInput = {
  gt?: Maybe<Scalars['MongoID']>;
  gte?: Maybe<Scalars['MongoID']>;
  lt?: Maybe<Scalars['MongoID']>;
  lte?: Maybe<Scalars['MongoID']>;
  ne?: Maybe<Scalars['MongoID']>;
  in?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  nin?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterFindOneUserCreatedAtOperatorsInput = {
  gt?: Maybe<Scalars['Date']>;
  gte?: Maybe<Scalars['Date']>;
  lt?: Maybe<Scalars['Date']>;
  lte?: Maybe<Scalars['Date']>;
  ne?: Maybe<Scalars['Date']>;
  in?: Maybe<Array<Maybe<Scalars['Date']>>>;
  nin?: Maybe<Array<Maybe<Scalars['Date']>>>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterFindOneUserInput = {
  sub?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  organizationId?: Maybe<Scalars['MongoID']>;
  locationId?: Maybe<Scalars['MongoID']>;
  planId?: Maybe<Scalars['MongoID']>;
  billing?: Maybe<Scalars['String']>;
  referrer?: Maybe<Scalars['String']>;
  inviteAccepted?: Maybe<Scalars['Boolean']>;
  active?: Maybe<Scalars['Boolean']>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterFindOneUserOperatorsInput>;
  OR?: Maybe<Array<FilterFindOneUserInput>>;
  AND?: Maybe<Array<FilterFindOneUserInput>>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindOneUserOperatorsInput = {
  sub?: Maybe<FilterFindOneUserSubOperatorsInput>;
  _id?: Maybe<FilterFindOneUser_IdOperatorsInput>;
  createdAt?: Maybe<FilterFindOneUserCreatedAtOperatorsInput>;
};

export type FilterFindOneUserSubOperatorsInput = {
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  ne?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  regex?: Maybe<Scalars['RegExpAsString']>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterFindOneUser_IdOperatorsInput = {
  gt?: Maybe<Scalars['MongoID']>;
  gte?: Maybe<Scalars['MongoID']>;
  lt?: Maybe<Scalars['MongoID']>;
  lte?: Maybe<Scalars['MongoID']>;
  ne?: Maybe<Scalars['MongoID']>;
  in?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  nin?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterUpdateOneLocationInput = {
  _id: Scalars['MongoID'];
};

export type FilterUpdateOneOrganizationAddressInput = {
  country?: Maybe<Scalars['String']>;
  administrativeArea?: Maybe<Scalars['String']>;
  subAdministrativeArea?: Maybe<Scalars['String']>;
  locality?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  thoroughfare?: Maybe<Scalars['String']>;
  premise?: Maybe<Scalars['String']>;
};

export type FilterUpdateOneOrganizationInput = {
  name?: Maybe<Scalars['String']>;
  address?: Maybe<FilterUpdateOneOrganizationAddressInput>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  type?: Maybe<EnumOrganizationType>;
  parentId?: Maybe<Scalars['String']>;
  parentMenuId?: Maybe<Scalars['String']>;
  userIds?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  _id?: Maybe<Scalars['MongoID']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterUpdateOneOrganizationOperatorsInput>;
  OR?: Maybe<Array<FilterUpdateOneOrganizationInput>>;
  AND?: Maybe<Array<FilterUpdateOneOrganizationInput>>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterUpdateOneOrganizationOperatorsInput = {
  _id?: Maybe<FilterUpdateOneOrganization_IdOperatorsInput>;
};

export type FilterUpdateOneOrganization_IdOperatorsInput = {
  gt?: Maybe<Scalars['MongoID']>;
  gte?: Maybe<Scalars['MongoID']>;
  lt?: Maybe<Scalars['MongoID']>;
  lte?: Maybe<Scalars['MongoID']>;
  ne?: Maybe<Scalars['MongoID']>;
  in?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  nin?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterUpdateOneUserInput = {
  sub?: Maybe<Scalars['String']>;
};


export type Location = {
  __typename?: 'Location';
  name?: Maybe<Scalars['String']>;
  contactName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  customQrLogoImageUrl?: Maybe<Scalars['String']>;
  customQrCodeColors?: Maybe<LocationCustomQrCodeColors>;
  headerImageUrl?: Maybe<Scalars['String']>;
  headerLogoImageUrl?: Maybe<Scalars['String']>;
  topicBackgroundImageUrl?: Maybe<Scalars['String']>;
  liiingoLocationId?: Maybe<Scalars['String']>;
  liiingoSectionId?: Maybe<Scalars['String']>;
  liiingoUrl?: Maybe<Scalars['String']>;
  exhibit?: Maybe<LocationExhibit>;
  _id: Scalars['MongoID'];
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  organization?: Maybe<Organization>;
  qrCode?: Maybe<Scalars['String']>;
  zipPath?: Maybe<Scalars['String']>;
};

export type LocationCustomQrCodeColors = {
  __typename?: 'LocationCustomQrCodeColors';
  primary?: Maybe<Scalars['String']>;
  secondary?: Maybe<Scalars['String']>;
};

export type LocationExhibit = {
  __typename?: 'LocationExhibit';
  liiingoExhibitId?: Maybe<Scalars['String']>;
  qrCodeUrl?: Maybe<Scalars['String']>;
  templateId?: Maybe<Scalars['String']>;
  templatedContent?: Maybe<Array<Maybe<LocationExhibitTemplatedContent>>>;
};

export type LocationExhibitTemplatedContent = {
  __typename?: 'LocationExhibitTemplatedContent';
  liiingoContentId?: Maybe<Scalars['String']>;
  liiingoContentType?: Maybe<EnumLocationExhibitTemplatedContentLiiingoContentType>;
  languages?: Maybe<ContentLanguages>;
  _id?: Maybe<Scalars['MongoID']>;
};

export type MongoError = ErrorInterface & {
  __typename?: 'MongoError';
  /** MongoDB error message */
  message?: Maybe<Scalars['String']>;
  /** MongoDB error code */
  code?: Maybe<Scalars['Int']>;
};


export type Mutation = {
  __typename?: 'Mutation';
  createTemplatedAppOnboardingFlow?: Maybe<CreateTemplatedAppOnboardingFlowMutationResponse>;
  createTemplatedOrgOnboardingFlow?: Maybe<CreateTemplatedOrgOnboardingFlowMutationResponse>;
  createBillingSession?: Maybe<BillingPortalResponse>;
  createCheckoutSession?: Maybe<CreateCheckoutSessionResponse>;
  verifyPayment?: Maybe<VerifyPaymentResponse>;
  /** Update one document: 1) Retrieve one document via findOne. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  locationUpdateOne?: Maybe<UpdateOneLocationPayload>;
  sendNotification?: Maybe<SendNotificationResponse>;
  deleteNotification?: Maybe<DeleteNotificationResponse>;
  /** Update one document: 1) Retrieve one document via findOne. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  organizationUpdateOne?: Maybe<UpdateOneOrganizationPayload>;
  register?: Maybe<RegisterResponse>;
  registerNewOrg?: Maybe<RegisterResponse>;
  inviteUser?: Maybe<Scalars['Boolean']>;
  closeAccount?: Maybe<UpdateOneUserPayload>;
  /** Update one document: 1) Retrieve one document via findOne. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  userUpdateOne?: Maybe<UpdateOneUserPayload>;
  createPlan?: Maybe<CreatePlanMutationResponse>;
};


export type MutationCreateTemplatedAppOnboardingFlowArgs = {
  organizationName: Scalars['String'];
  organizationEmail: Scalars['String'];
  organizationLogo?: Maybe<Scalars['String']>;
  organizationFavicon?: Maybe<Scalars['String']>;
  onboardingRoute: Scalars['String'];
  onboardingTemplate: EssentialTemplateInput;
  createNewOrganization?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateTemplatedOrgOnboardingFlowArgs = {
  onboardingRoute: Scalars['String'];
  onboardingTemplate: EssentialTemplateInput;
};


export type MutationCreateBillingSessionArgs = {
  _id: Scalars['String'];
  returnUrl?: Maybe<Scalars['String']>;
};


export type MutationCreateCheckoutSessionArgs = {
  route: Scalars['String'];
  productCode?: Maybe<Scalars['String']>;
  successUrl: Scalars['String'];
  cancelUrl: Scalars['String'];
};


export type MutationVerifyPaymentArgs = {
  checkoutSessionId: Scalars['String'];
  isUpgrade: Scalars['Boolean'];
};


export type MutationLocationUpdateOneArgs = {
  record: UpdateOneLocationInput;
  filter: FilterUpdateOneLocationInput;
  sort?: Maybe<SortUpdateOneLocationInput>;
  skip?: Maybe<Scalars['Int']>;
};


export type MutationSendNotificationArgs = {
  message: Scalars['String'];
  scheduledTime?: Maybe<Scalars['String']>;
  topicId: Scalars['String'];
};


export type MutationDeleteNotificationArgs = {
  id: Scalars['String'];
};


export type MutationOrganizationUpdateOneArgs = {
  record: UpdateOneOrganizationInput;
  filter?: Maybe<FilterUpdateOneOrganizationInput>;
  sort?: Maybe<SortUpdateOneOrganizationInput>;
  skip?: Maybe<Scalars['Int']>;
};


export type MutationRegisterArgs = {
  organizationId: Scalars['String'];
  onboardingRoute: Scalars['String'];
  termsOfService: Scalars['Boolean'];
  referrer?: Maybe<Scalars['String']>;
};


export type MutationRegisterNewOrgArgs = {
  onboardingRoute: Scalars['String'];
  termsOfService: Scalars['Boolean'];
  referrer?: Maybe<Scalars['String']>;
  planId?: Maybe<Scalars['String']>;
  billing?: Maybe<Scalars['String']>;
};


export type MutationInviteUserArgs = {
  email: Scalars['String'];
};


export type MutationCloseAccountArgs = {
  route: Scalars['String'];
};


export type MutationUserUpdateOneArgs = {
  record: UpdateOneUserInput;
  filter: FilterUpdateOneUserInput;
  sort?: Maybe<SortUpdateOneUserInput>;
  skip?: Maybe<Scalars['Int']>;
};


export type MutationCreatePlanArgs = {
  name: Scalars['String'];
  annualStripeId: Scalars['String'];
  monthlyStripeId: Scalars['String'];
  restrictions?: Maybe<RestrictionsInput>;
};

export type Organization = {
  __typename?: 'Organization';
  name?: Maybe<Scalars['String']>;
  address?: Maybe<OrganizationAddress>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  liiingoOrganizationId?: Maybe<Scalars['String']>;
  type?: Maybe<EnumOrganizationType>;
  parentId?: Maybe<Scalars['String']>;
  parentMenuId?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
  stripeCustomerId?: Maybe<Scalars['String']>;
  permissions?: Maybe<OrganizationPermissions>;
  _id: Scalars['MongoID'];
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  users: Array<User>;
};


export type OrganizationUsersArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindManyUserInput>;
};

export type OrganizationAddress = {
  __typename?: 'OrganizationAddress';
  country?: Maybe<Scalars['String']>;
  administrativeArea?: Maybe<Scalars['String']>;
  subAdministrativeArea?: Maybe<Scalars['String']>;
  locality?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  thoroughfare?: Maybe<Scalars['String']>;
  premise?: Maybe<Scalars['String']>;
};

/** A connection to a list of items. */
export type OrganizationConnection = {
  __typename?: 'OrganizationConnection';
  /** Total object count. */
  count: Scalars['Int'];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges: Array<OrganizationEdge>;
};

/** An edge in a connection. */
export type OrganizationEdge = {
  __typename?: 'OrganizationEdge';
  /** The item at the end of the edge */
  node: Organization;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type OrganizationPermissions = {
  __typename?: 'OrganizationPermissions';
  organizationProfile?: Maybe<Scalars['Boolean']>;
  brandedLiiingoApp?: Maybe<Scalars['Boolean']>;
  hasLiiingoAccess?: Maybe<Scalars['Boolean']>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
};

export type Plan = {
  __typename?: 'Plan';
  /** A human-readable name for the plan. */
  name: Scalars['String'];
  /** Annual stripe id */
  annualStripeId: Scalars['String'];
  /** Monthly stripe id */
  monthlyStripeId: Scalars['String'];
  /** Object containing the restrictions for this plan, i.e. pageLimit */
  restrictions?: Maybe<Scalars['JSON']>;
  _id: Scalars['MongoID'];
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type PushNotification = {
  __typename?: 'PushNotification';
  _id?: Maybe<Scalars['String']>;
  topicName?: Maybe<Scalars['String']>;
  topicType?: Maybe<Scalars['String']>;
  topicTypeId?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  scheduleType?: Maybe<Scalars['String']>;
  scheduleTime?: Maybe<Scalars['String']>;
  locationId?: Maybe<Scalars['String']>;
  notificationSent?: Maybe<Scalars['Boolean']>;
  createdDate?: Maybe<Scalars['String']>;
  modifiedDate?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  flows: Array<AppOnboardingFlow>;
  appOnboardingFlowByRoute?: Maybe<AppOnboardingFlow>;
  subscription?: Maybe<GetSubscriptionResponse>;
  customerPaymentMethod?: Maybe<CustomerPaymentMethodResponse>;
  organizationById?: Maybe<Organization>;
  organizations?: Maybe<OrganizationConnection>;
  getLocationById?: Maybe<Location>;
  getNotifications?: Maybe<GetNotificationResponse>;
  userById?: Maybe<User>;
  user?: Maybe<User>;
  userConnection?: Maybe<UserConnection>;
  planById?: Maybe<Plan>;
  planByName?: Maybe<Plan>;
};


export type QueryFlowsArgs = {
  filter?: Maybe<FilterFindManyAppOnboardingFlowInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindManyAppOnboardingFlowInput>;
};


export type QueryAppOnboardingFlowByRouteArgs = {
  route: Scalars['String'];
};


export type QueryOrganizationByIdArgs = {
  _id: Scalars['MongoID'];
};


export type QueryOrganizationsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  filter?: Maybe<FilterFindManyOrganizationInput>;
  sort?: Maybe<SortConnectionOrganizationEnum>;
};


export type QueryGetLocationByIdArgs = {
  _id: Scalars['MongoID'];
};


export type QueryGetNotificationsArgs = {
  topicId: Scalars['String'];
};


export type QueryUserByIdArgs = {
  _id: Scalars['MongoID'];
};


export type QueryUserArgs = {
  filter?: Maybe<FilterFindOneUserInput>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindOneUserInput>;
};


export type QueryUserConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  filter?: Maybe<FilterFindManyUserInput>;
  sort?: Maybe<SortConnectionUserEnum>;
};


export type QueryPlanByIdArgs = {
  _id: Scalars['MongoID'];
};


export type QueryPlanByNameArgs = {
  name: Scalars['String'];
};


export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  sessionId?: Maybe<Scalars['String']>;
};

export type RestrictionsInput = {
  /** Limit of pages a user can have */
  pageLimit?: Maybe<Scalars['Int']>;
};

export type RuntimeError = ErrorInterface & {
  __typename?: 'RuntimeError';
  /** Runtime error message */
  message?: Maybe<Scalars['String']>;
};

export type SendNotificationResponse = {
  __typename?: 'SendNotificationResponse';
  success: Scalars['Boolean'];
};

export enum SortConnectionOrganizationEnum {
  IdDesc = '_ID_DESC',
  IdAsc = '_ID_ASC'
}

export enum SortConnectionUserEnum {
  IdDesc = '_ID_DESC',
  IdAsc = '_ID_ASC',
  SubDesc = 'SUB_DESC',
  SubAsc = 'SUB_ASC'
}

export enum SortFindManyAppOnboardingFlowInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
  RouteAsc = 'ROUTE_ASC',
  RouteDesc = 'ROUTE_DESC'
}

export enum SortFindManyUserInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
  SubAsc = 'SUB_ASC',
  SubDesc = 'SUB_DESC',
  CreatedatAsc = 'CREATEDAT_ASC',
  CreatedatDesc = 'CREATEDAT_DESC',
  CreatedatUpdatedatAsc = 'CREATEDAT__UPDATEDAT_ASC',
  CreatedatUpdatedatDesc = 'CREATEDAT__UPDATEDAT_DESC'
}

export enum SortFindOneUserInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
  SubAsc = 'SUB_ASC',
  SubDesc = 'SUB_DESC',
  CreatedatAsc = 'CREATEDAT_ASC',
  CreatedatDesc = 'CREATEDAT_DESC',
  CreatedatUpdatedatAsc = 'CREATEDAT__UPDATEDAT_ASC',
  CreatedatUpdatedatDesc = 'CREATEDAT__UPDATEDAT_DESC'
}

export enum SortUpdateOneLocationInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
  CreatedatAsc = 'CREATEDAT_ASC',
  CreatedatDesc = 'CREATEDAT_DESC',
  CreatedatUpdatedatAsc = 'CREATEDAT__UPDATEDAT_ASC',
  CreatedatUpdatedatDesc = 'CREATEDAT__UPDATEDAT_DESC'
}

export enum SortUpdateOneOrganizationInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
  CreatedatAsc = 'CREATEDAT_ASC',
  CreatedatDesc = 'CREATEDAT_DESC',
  CreatedatUpdatedatAsc = 'CREATEDAT__UPDATEDAT_ASC',
  CreatedatUpdatedatDesc = 'CREATEDAT__UPDATEDAT_DESC'
}

export enum SortUpdateOneUserInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
  SubAsc = 'SUB_ASC',
  SubDesc = 'SUB_DESC',
  CreatedatAsc = 'CREATEDAT_ASC',
  CreatedatDesc = 'CREATEDAT_DESC',
  CreatedatUpdatedatAsc = 'CREATEDAT__UPDATEDAT_ASC',
  CreatedatUpdatedatDesc = 'CREATEDAT__UPDATEDAT_DESC'
}

export type UpdateOneLocationCustomQrCodeColorsInput = {
  primary?: Maybe<Scalars['String']>;
  secondary?: Maybe<Scalars['String']>;
};

export type UpdateOneLocationExhibitInput = {
  liiingoExhibitId?: Maybe<Scalars['String']>;
  qrCodeUrl?: Maybe<Scalars['String']>;
  templateId?: Maybe<Scalars['String']>;
  templatedContent?: Maybe<Array<Maybe<UpdateOneLocationExhibitTemplatedContentInput>>>;
};

export type UpdateOneLocationExhibitTemplatedContentInput = {
  liiingoContentId?: Maybe<Scalars['String']>;
  liiingoContentType?: Maybe<EnumLocationExhibitTemplatedContentLiiingoContentType>;
  languages?: Maybe<ContentLanguagesInput>;
  _id?: Maybe<Scalars['MongoID']>;
};

export type UpdateOneLocationInput = {
  name?: Maybe<Scalars['String']>;
  contactName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  customQrLogoImageUrl?: Maybe<Scalars['String']>;
  customQrCodeColors?: Maybe<UpdateOneLocationCustomQrCodeColorsInput>;
  headerImageUrl?: Maybe<Scalars['String']>;
  headerLogoImageUrl?: Maybe<Scalars['String']>;
  topicBackgroundImageUrl?: Maybe<Scalars['String']>;
  organizationId?: Maybe<Scalars['MongoID']>;
  liiingoLocationId?: Maybe<Scalars['String']>;
  liiingoSectionId?: Maybe<Scalars['String']>;
  liiingoUrl?: Maybe<Scalars['String']>;
  exhibit?: Maybe<UpdateOneLocationExhibitInput>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  customQrLogoImage?: Maybe<Scalars['Upload']>;
  headerImage?: Maybe<Scalars['Upload']>;
  headerLogoImage?: Maybe<Scalars['Upload']>;
  topicBackgroundImage?: Maybe<Scalars['Upload']>;
};

export type UpdateOneLocationPayload = {
  __typename?: 'UpdateOneLocationPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Updated document */
  record?: Maybe<Location>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type UpdateOneOrganizationAddressInput = {
  country?: Maybe<Scalars['String']>;
  administrativeArea?: Maybe<Scalars['String']>;
  subAdministrativeArea?: Maybe<Scalars['String']>;
  locality?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  thoroughfare?: Maybe<Scalars['String']>;
  premise?: Maybe<Scalars['String']>;
};

export type UpdateOneOrganizationInput = {
  name?: Maybe<Scalars['String']>;
  address?: Maybe<UpdateOneOrganizationAddressInput>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  type?: Maybe<EnumOrganizationType>;
  parentId?: Maybe<Scalars['String']>;
  parentMenuId?: Maybe<Scalars['String']>;
  userIds?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
};

export type UpdateOneOrganizationPayload = {
  __typename?: 'UpdateOneOrganizationPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Updated document */
  record?: Maybe<Organization>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type UpdateOneUserInput = {
  sub?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  organizationId?: Maybe<Scalars['MongoID']>;
  locationId?: Maybe<Scalars['MongoID']>;
  planId?: Maybe<Scalars['MongoID']>;
  billing?: Maybe<Scalars['String']>;
  inviteAccepted?: Maybe<Scalars['Boolean']>;
};

export type UpdateOneUserPayload = {
  __typename?: 'UpdateOneUserPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Updated document */
  record?: Maybe<User>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};


export type User = {
  __typename?: 'User';
  sub: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  planId?: Maybe<Scalars['MongoID']>;
  billing?: Maybe<Scalars['String']>;
  permissions?: Maybe<UserPermissions>;
  referrer?: Maybe<Scalars['String']>;
  inviteAccepted?: Maybe<Scalars['Boolean']>;
  active?: Maybe<Scalars['Boolean']>;
  _id: Scalars['MongoID'];
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  organization?: Maybe<Organization>;
  location?: Maybe<Location>;
};

/** A connection to a list of items. */
export type UserConnection = {
  __typename?: 'UserConnection';
  /** Total object count. */
  count: Scalars['Int'];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges: Array<UserEdge>;
};

/** An edge in a connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** The item at the end of the edge */
  node: User;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type UserPermissions = {
  __typename?: 'UserPermissions';
  manageUsers?: Maybe<Scalars['Boolean']>;
  manageBilling?: Maybe<Scalars['Boolean']>;
  manageBusinessProfile?: Maybe<Scalars['Boolean']>;
  uploadPatientDocuments?: Maybe<Scalars['Boolean']>;
};

export type ValidationError = ErrorInterface & {
  __typename?: 'ValidationError';
  /** Combined error message from all validators */
  message?: Maybe<Scalars['String']>;
  /** List of validator errors */
  errors?: Maybe<Array<ValidatorError>>;
};

export type ValidatorError = {
  __typename?: 'ValidatorError';
  /** Validation error message */
  message?: Maybe<Scalars['String']>;
  /** Source of the validation error from the model path */
  path?: Maybe<Scalars['String']>;
  /** Field value which occurs the validation error */
  value?: Maybe<Scalars['JSON']>;
  /** Input record idx in array which occurs the validation error. This `idx` is useful for createMany operation. For singular operations it always be 0. For *Many operations `idx` represents record index in array received from user. */
  idx: Scalars['Int'];
};

export type VerifyPaymentResponse = {
  __typename?: 'VerifyPaymentResponse';
  verified: Scalars['Boolean'];
  _id: Scalars['String'];
};

export type GetNotificationResponse = {
  __typename?: 'getNotificationResponse';
  notifications?: Maybe<Array<Maybe<PushNotification>>>;
};

export type GetSubscriptionResponse = {
  __typename?: 'getSubscriptionResponse';
  id: Scalars['String'];
  trialEnd?: Maybe<Scalars['String']>;
  trialStart?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['Int']>;
  daysUntilDue?: Maybe<Scalars['Int']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AppOnboardingFlow: ResolverTypeWrapper<AppOnboardingFlow>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BillingPortalResponse: ResolverTypeWrapper<BillingPortalResponse>;
  CardChecks: ResolverTypeWrapper<CardChecks>;
  CardResponse: ResolverTypeWrapper<CardResponse>;
  ContentLanguages: ResolverTypeWrapper<ContentLanguages>;
  ContentLanguagesContent: ResolverTypeWrapper<ContentLanguagesContent>;
  ContentLanguagesContentInput: ContentLanguagesContentInput;
  ContentLanguagesInput: ContentLanguagesInput;
  CreateCheckoutSessionResponse: ResolverTypeWrapper<CreateCheckoutSessionResponse>;
  CreatePlanMutationResponse: ResolverTypeWrapper<CreatePlanMutationResponse>;
  CreateTemplatedAppOnboardingFlowMutationResponse: ResolverTypeWrapper<CreateTemplatedAppOnboardingFlowMutationResponse>;
  CreateTemplatedOrgOnboardingFlowMutationResponse: ResolverTypeWrapper<CreateTemplatedOrgOnboardingFlowMutationResponse>;
  CustomerPaymentMethodResponse: ResolverTypeWrapper<CustomerPaymentMethodResponse>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DeleteNotificationResponse: ResolverTypeWrapper<DeleteNotificationResponse>;
  EnumLocationExhibitTemplatedContentLiiingoContentType: EnumLocationExhibitTemplatedContentLiiingoContentType;
  EnumOrganizationType: EnumOrganizationType;
  ErrorInterface: ResolversTypes['MongoError'] | ResolversTypes['RuntimeError'] | ResolversTypes['ValidationError'];
  EssentialTemplate: ResolverTypeWrapper<EssentialTemplate>;
  EssentialTemplateInput: EssentialTemplateInput;
  FilterFindManyAppOnboardingFlowInput: FilterFindManyAppOnboardingFlowInput;
  FilterFindManyAppOnboardingFlowOperatorsInput: FilterFindManyAppOnboardingFlowOperatorsInput;
  FilterFindManyAppOnboardingFlowRouteOperatorsInput: FilterFindManyAppOnboardingFlowRouteOperatorsInput;
  FilterFindManyAppOnboardingFlow_idOperatorsInput: FilterFindManyAppOnboardingFlow_IdOperatorsInput;
  FilterFindManyOrganizationAddressInput: FilterFindManyOrganizationAddressInput;
  FilterFindManyOrganizationInput: FilterFindManyOrganizationInput;
  FilterFindManyOrganizationOperatorsInput: FilterFindManyOrganizationOperatorsInput;
  FilterFindManyOrganization_idOperatorsInput: FilterFindManyOrganization_IdOperatorsInput;
  FilterFindManyUserCreatedAtOperatorsInput: FilterFindManyUserCreatedAtOperatorsInput;
  FilterFindManyUserInput: FilterFindManyUserInput;
  FilterFindManyUserOperatorsInput: FilterFindManyUserOperatorsInput;
  FilterFindManyUserSubOperatorsInput: FilterFindManyUserSubOperatorsInput;
  FilterFindManyUser_idOperatorsInput: FilterFindManyUser_IdOperatorsInput;
  FilterFindOneUserCreatedAtOperatorsInput: FilterFindOneUserCreatedAtOperatorsInput;
  FilterFindOneUserInput: FilterFindOneUserInput;
  FilterFindOneUserOperatorsInput: FilterFindOneUserOperatorsInput;
  FilterFindOneUserSubOperatorsInput: FilterFindOneUserSubOperatorsInput;
  FilterFindOneUser_idOperatorsInput: FilterFindOneUser_IdOperatorsInput;
  FilterUpdateOneLocationInput: FilterUpdateOneLocationInput;
  FilterUpdateOneOrganizationAddressInput: FilterUpdateOneOrganizationAddressInput;
  FilterUpdateOneOrganizationInput: FilterUpdateOneOrganizationInput;
  FilterUpdateOneOrganizationOperatorsInput: FilterUpdateOneOrganizationOperatorsInput;
  FilterUpdateOneOrganization_idOperatorsInput: FilterUpdateOneOrganization_IdOperatorsInput;
  FilterUpdateOneUserInput: FilterUpdateOneUserInput;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Location: ResolverTypeWrapper<Location>;
  LocationCustomQrCodeColors: ResolverTypeWrapper<LocationCustomQrCodeColors>;
  LocationExhibit: ResolverTypeWrapper<LocationExhibit>;
  LocationExhibitTemplatedContent: ResolverTypeWrapper<LocationExhibitTemplatedContent>;
  MongoError: ResolverTypeWrapper<MongoError>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  MongoID: ResolverTypeWrapper<Scalars['MongoID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Organization: ResolverTypeWrapper<Organization>;
  OrganizationAddress: ResolverTypeWrapper<OrganizationAddress>;
  OrganizationConnection: ResolverTypeWrapper<OrganizationConnection>;
  OrganizationEdge: ResolverTypeWrapper<OrganizationEdge>;
  OrganizationPermissions: ResolverTypeWrapper<OrganizationPermissions>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Plan: ResolverTypeWrapper<Plan>;
  PushNotification: ResolverTypeWrapper<PushNotification>;
  Query: ResolverTypeWrapper<{}>;
  RegExpAsString: ResolverTypeWrapper<Scalars['RegExpAsString']>;
  RegisterResponse: ResolverTypeWrapper<RegisterResponse>;
  RestrictionsInput: RestrictionsInput;
  RuntimeError: ResolverTypeWrapper<RuntimeError>;
  SendNotificationResponse: ResolverTypeWrapper<SendNotificationResponse>;
  SortConnectionOrganizationEnum: SortConnectionOrganizationEnum;
  SortConnectionUserEnum: SortConnectionUserEnum;
  SortFindManyAppOnboardingFlowInput: SortFindManyAppOnboardingFlowInput;
  SortFindManyUserInput: SortFindManyUserInput;
  SortFindOneUserInput: SortFindOneUserInput;
  SortUpdateOneLocationInput: SortUpdateOneLocationInput;
  SortUpdateOneOrganizationInput: SortUpdateOneOrganizationInput;
  SortUpdateOneUserInput: SortUpdateOneUserInput;
  UpdateOneLocationCustomQrCodeColorsInput: UpdateOneLocationCustomQrCodeColorsInput;
  UpdateOneLocationExhibitInput: UpdateOneLocationExhibitInput;
  UpdateOneLocationExhibitTemplatedContentInput: UpdateOneLocationExhibitTemplatedContentInput;
  UpdateOneLocationInput: UpdateOneLocationInput;
  UpdateOneLocationPayload: ResolverTypeWrapper<UpdateOneLocationPayload>;
  UpdateOneOrganizationAddressInput: UpdateOneOrganizationAddressInput;
  UpdateOneOrganizationInput: UpdateOneOrganizationInput;
  UpdateOneOrganizationPayload: ResolverTypeWrapper<UpdateOneOrganizationPayload>;
  UpdateOneUserInput: UpdateOneUserInput;
  UpdateOneUserPayload: ResolverTypeWrapper<UpdateOneUserPayload>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  UserConnection: ResolverTypeWrapper<UserConnection>;
  UserEdge: ResolverTypeWrapper<UserEdge>;
  UserPermissions: ResolverTypeWrapper<UserPermissions>;
  ValidationError: ResolverTypeWrapper<ValidationError>;
  ValidatorError: ResolverTypeWrapper<ValidatorError>;
  VerifyPaymentResponse: ResolverTypeWrapper<VerifyPaymentResponse>;
  getNotificationResponse: ResolverTypeWrapper<GetNotificationResponse>;
  getSubscriptionResponse: ResolverTypeWrapper<GetSubscriptionResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AppOnboardingFlow: AppOnboardingFlow;
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  BillingPortalResponse: BillingPortalResponse;
  CardChecks: CardChecks;
  CardResponse: CardResponse;
  ContentLanguages: ContentLanguages;
  ContentLanguagesContent: ContentLanguagesContent;
  ContentLanguagesContentInput: ContentLanguagesContentInput;
  ContentLanguagesInput: ContentLanguagesInput;
  CreateCheckoutSessionResponse: CreateCheckoutSessionResponse;
  CreatePlanMutationResponse: CreatePlanMutationResponse;
  CreateTemplatedAppOnboardingFlowMutationResponse: CreateTemplatedAppOnboardingFlowMutationResponse;
  CreateTemplatedOrgOnboardingFlowMutationResponse: CreateTemplatedOrgOnboardingFlowMutationResponse;
  CustomerPaymentMethodResponse: CustomerPaymentMethodResponse;
  Date: Scalars['Date'];
  DeleteNotificationResponse: DeleteNotificationResponse;
  ErrorInterface: ResolversParentTypes['MongoError'] | ResolversParentTypes['RuntimeError'] | ResolversParentTypes['ValidationError'];
  EssentialTemplate: EssentialTemplate;
  EssentialTemplateInput: EssentialTemplateInput;
  FilterFindManyAppOnboardingFlowInput: FilterFindManyAppOnboardingFlowInput;
  FilterFindManyAppOnboardingFlowOperatorsInput: FilterFindManyAppOnboardingFlowOperatorsInput;
  FilterFindManyAppOnboardingFlowRouteOperatorsInput: FilterFindManyAppOnboardingFlowRouteOperatorsInput;
  FilterFindManyAppOnboardingFlow_idOperatorsInput: FilterFindManyAppOnboardingFlow_IdOperatorsInput;
  FilterFindManyOrganizationAddressInput: FilterFindManyOrganizationAddressInput;
  FilterFindManyOrganizationInput: FilterFindManyOrganizationInput;
  FilterFindManyOrganizationOperatorsInput: FilterFindManyOrganizationOperatorsInput;
  FilterFindManyOrganization_idOperatorsInput: FilterFindManyOrganization_IdOperatorsInput;
  FilterFindManyUserCreatedAtOperatorsInput: FilterFindManyUserCreatedAtOperatorsInput;
  FilterFindManyUserInput: FilterFindManyUserInput;
  FilterFindManyUserOperatorsInput: FilterFindManyUserOperatorsInput;
  FilterFindManyUserSubOperatorsInput: FilterFindManyUserSubOperatorsInput;
  FilterFindManyUser_idOperatorsInput: FilterFindManyUser_IdOperatorsInput;
  FilterFindOneUserCreatedAtOperatorsInput: FilterFindOneUserCreatedAtOperatorsInput;
  FilterFindOneUserInput: FilterFindOneUserInput;
  FilterFindOneUserOperatorsInput: FilterFindOneUserOperatorsInput;
  FilterFindOneUserSubOperatorsInput: FilterFindOneUserSubOperatorsInput;
  FilterFindOneUser_idOperatorsInput: FilterFindOneUser_IdOperatorsInput;
  FilterUpdateOneLocationInput: FilterUpdateOneLocationInput;
  FilterUpdateOneOrganizationAddressInput: FilterUpdateOneOrganizationAddressInput;
  FilterUpdateOneOrganizationInput: FilterUpdateOneOrganizationInput;
  FilterUpdateOneOrganizationOperatorsInput: FilterUpdateOneOrganizationOperatorsInput;
  FilterUpdateOneOrganization_idOperatorsInput: FilterUpdateOneOrganization_IdOperatorsInput;
  FilterUpdateOneUserInput: FilterUpdateOneUserInput;
  JSON: Scalars['JSON'];
  Location: Location;
  LocationCustomQrCodeColors: LocationCustomQrCodeColors;
  LocationExhibit: LocationExhibit;
  LocationExhibitTemplatedContent: LocationExhibitTemplatedContent;
  MongoError: MongoError;
  Int: Scalars['Int'];
  MongoID: Scalars['MongoID'];
  Mutation: {};
  Organization: Organization;
  OrganizationAddress: OrganizationAddress;
  OrganizationConnection: OrganizationConnection;
  OrganizationEdge: OrganizationEdge;
  OrganizationPermissions: OrganizationPermissions;
  PageInfo: PageInfo;
  Plan: Plan;
  PushNotification: PushNotification;
  Query: {};
  RegExpAsString: Scalars['RegExpAsString'];
  RegisterResponse: RegisterResponse;
  RestrictionsInput: RestrictionsInput;
  RuntimeError: RuntimeError;
  SendNotificationResponse: SendNotificationResponse;
  UpdateOneLocationCustomQrCodeColorsInput: UpdateOneLocationCustomQrCodeColorsInput;
  UpdateOneLocationExhibitInput: UpdateOneLocationExhibitInput;
  UpdateOneLocationExhibitTemplatedContentInput: UpdateOneLocationExhibitTemplatedContentInput;
  UpdateOneLocationInput: UpdateOneLocationInput;
  UpdateOneLocationPayload: UpdateOneLocationPayload;
  UpdateOneOrganizationAddressInput: UpdateOneOrganizationAddressInput;
  UpdateOneOrganizationInput: UpdateOneOrganizationInput;
  UpdateOneOrganizationPayload: UpdateOneOrganizationPayload;
  UpdateOneUserInput: UpdateOneUserInput;
  UpdateOneUserPayload: UpdateOneUserPayload;
  Upload: Scalars['Upload'];
  User: User;
  UserConnection: UserConnection;
  UserEdge: UserEdge;
  UserPermissions: UserPermissions;
  ValidationError: ValidationError;
  ValidatorError: ValidatorError;
  VerifyPaymentResponse: VerifyPaymentResponse;
  getNotificationResponse: GetNotificationResponse;
  getSubscriptionResponse: GetSubscriptionResponse;
};

export type AppOnboardingFlowResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppOnboardingFlow'] = ResolversParentTypes['AppOnboardingFlow']> = {
  route?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stripeSubscriptionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  favicon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createNewOrganization?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['MongoID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  essentialTemplate?: Resolver<Maybe<ResolversTypes['EssentialTemplate']>, ParentType, ContextType>;
  organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BillingPortalResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['BillingPortalResponse'] = ResolversParentTypes['BillingPortalResponse']> = {
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CardChecksResolvers<ContextType = any, ParentType extends ResolversParentTypes['CardChecks'] = ResolversParentTypes['CardChecks']> = {
  cvcCheck?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CardResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CardResponse'] = ResolversParentTypes['CardResponse']> = {
  brand?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  checks?: Resolver<Maybe<ResolversTypes['CardChecks']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContentLanguagesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContentLanguages'] = ResolversParentTypes['ContentLanguages']> = {
  en?: Resolver<Maybe<ResolversTypes['ContentLanguagesContent']>, ParentType, ContextType>;
  es?: Resolver<Maybe<ResolversTypes['ContentLanguagesContent']>, ParentType, ContextType>;
  zh_Hans?: Resolver<Maybe<ResolversTypes['ContentLanguagesContent']>, ParentType, ContextType>;
  de?: Resolver<Maybe<ResolversTypes['ContentLanguagesContent']>, ParentType, ContextType>;
  pt?: Resolver<Maybe<ResolversTypes['ContentLanguagesContent']>, ParentType, ContextType>;
  fr?: Resolver<Maybe<ResolversTypes['ContentLanguagesContent']>, ParentType, ContextType>;
  it?: Resolver<Maybe<ResolversTypes['ContentLanguagesContent']>, ParentType, ContextType>;
  ru?: Resolver<Maybe<ResolversTypes['ContentLanguagesContent']>, ParentType, ContextType>;
  ja?: Resolver<Maybe<ResolversTypes['ContentLanguagesContent']>, ParentType, ContextType>;
  ko?: Resolver<Maybe<ResolversTypes['ContentLanguagesContent']>, ParentType, ContextType>;
  no?: Resolver<Maybe<ResolversTypes['ContentLanguagesContent']>, ParentType, ContextType>;
  el?: Resolver<Maybe<ResolversTypes['ContentLanguagesContent']>, ParentType, ContextType>;
  tr?: Resolver<Maybe<ResolversTypes['ContentLanguagesContent']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContentLanguagesContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContentLanguagesContent'] = ResolversParentTypes['ContentLanguagesContent']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fileUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCheckoutSessionResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateCheckoutSessionResponse'] = ResolversParentTypes['CreateCheckoutSessionResponse']> = {
  sessionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatePlanMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatePlanMutationResponse'] = ResolversParentTypes['CreatePlanMutationResponse']> = {
  plan?: Resolver<Maybe<ResolversTypes['Plan']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateTemplatedAppOnboardingFlowMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateTemplatedAppOnboardingFlowMutationResponse'] = ResolversParentTypes['CreateTemplatedAppOnboardingFlowMutationResponse']> = {
  appOnboardingFlow?: Resolver<Maybe<ResolversTypes['AppOnboardingFlow']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateTemplatedOrgOnboardingFlowMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateTemplatedOrgOnboardingFlowMutationResponse'] = ResolversParentTypes['CreateTemplatedOrgOnboardingFlowMutationResponse']> = {
  orgOnboardingFlow?: Resolver<Maybe<ResolversTypes['AppOnboardingFlow']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerPaymentMethodResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerPaymentMethodResponse'] = ResolversParentTypes['CustomerPaymentMethodResponse']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  object?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  card?: Resolver<Maybe<ResolversTypes['CardResponse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DeleteNotificationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteNotificationResponse'] = ResolversParentTypes['DeleteNotificationResponse']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ErrorInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['ErrorInterface'] = ResolversParentTypes['ErrorInterface']> = {
  __resolveType: TypeResolveFn<'MongoError' | 'RuntimeError' | 'ValidationError', ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type EssentialTemplateResolvers<ContextType = any, ParentType extends ResolversParentTypes['EssentialTemplate'] = ResolversParentTypes['EssentialTemplate']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stripeProductCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  templateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['MongoID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contactName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  companyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customQrLogoImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customQrCodeColors?: Resolver<Maybe<ResolversTypes['LocationCustomQrCodeColors']>, ParentType, ContextType>;
  headerImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  headerLogoImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topicBackgroundImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  liiingoLocationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  liiingoSectionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  liiingoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  exhibit?: Resolver<Maybe<ResolversTypes['LocationExhibit']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['MongoID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
  qrCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zipPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationCustomQrCodeColorsResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocationCustomQrCodeColors'] = ResolversParentTypes['LocationCustomQrCodeColors']> = {
  primary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  secondary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationExhibitResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocationExhibit'] = ResolversParentTypes['LocationExhibit']> = {
  liiingoExhibitId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  qrCodeUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  templateId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  templatedContent?: Resolver<Maybe<Array<Maybe<ResolversTypes['LocationExhibitTemplatedContent']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationExhibitTemplatedContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocationExhibitTemplatedContent'] = ResolversParentTypes['LocationExhibitTemplatedContent']> = {
  liiingoContentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  liiingoContentType?: Resolver<Maybe<ResolversTypes['EnumLocationExhibitTemplatedContentLiiingoContentType']>, ParentType, ContextType>;
  languages?: Resolver<Maybe<ResolversTypes['ContentLanguages']>, ParentType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['MongoID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MongoErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['MongoError'] = ResolversParentTypes['MongoError']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface MongoIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MongoID'], any> {
  name: 'MongoID';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createTemplatedAppOnboardingFlow?: Resolver<Maybe<ResolversTypes['CreateTemplatedAppOnboardingFlowMutationResponse']>, ParentType, ContextType, RequireFields<MutationCreateTemplatedAppOnboardingFlowArgs, 'organizationName' | 'organizationEmail' | 'onboardingRoute' | 'onboardingTemplate'>>;
  createTemplatedOrgOnboardingFlow?: Resolver<Maybe<ResolversTypes['CreateTemplatedOrgOnboardingFlowMutationResponse']>, ParentType, ContextType, RequireFields<MutationCreateTemplatedOrgOnboardingFlowArgs, 'onboardingRoute' | 'onboardingTemplate'>>;
  createBillingSession?: Resolver<Maybe<ResolversTypes['BillingPortalResponse']>, ParentType, ContextType, RequireFields<MutationCreateBillingSessionArgs, '_id'>>;
  createCheckoutSession?: Resolver<Maybe<ResolversTypes['CreateCheckoutSessionResponse']>, ParentType, ContextType, RequireFields<MutationCreateCheckoutSessionArgs, 'route' | 'successUrl' | 'cancelUrl'>>;
  verifyPayment?: Resolver<Maybe<ResolversTypes['VerifyPaymentResponse']>, ParentType, ContextType, RequireFields<MutationVerifyPaymentArgs, 'checkoutSessionId' | 'isUpgrade'>>;
  locationUpdateOne?: Resolver<Maybe<ResolversTypes['UpdateOneLocationPayload']>, ParentType, ContextType, RequireFields<MutationLocationUpdateOneArgs, 'record' | 'filter'>>;
  sendNotification?: Resolver<Maybe<ResolversTypes['SendNotificationResponse']>, ParentType, ContextType, RequireFields<MutationSendNotificationArgs, 'message' | 'topicId'>>;
  deleteNotification?: Resolver<Maybe<ResolversTypes['DeleteNotificationResponse']>, ParentType, ContextType, RequireFields<MutationDeleteNotificationArgs, 'id'>>;
  organizationUpdateOne?: Resolver<Maybe<ResolversTypes['UpdateOneOrganizationPayload']>, ParentType, ContextType, RequireFields<MutationOrganizationUpdateOneArgs, 'record'>>;
  register?: Resolver<Maybe<ResolversTypes['RegisterResponse']>, ParentType, ContextType, RequireFields<MutationRegisterArgs, 'organizationId' | 'onboardingRoute' | 'termsOfService'>>;
  registerNewOrg?: Resolver<Maybe<ResolversTypes['RegisterResponse']>, ParentType, ContextType, RequireFields<MutationRegisterNewOrgArgs, 'onboardingRoute' | 'termsOfService'>>;
  inviteUser?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationInviteUserArgs, 'email'>>;
  closeAccount?: Resolver<Maybe<ResolversTypes['UpdateOneUserPayload']>, ParentType, ContextType, RequireFields<MutationCloseAccountArgs, 'route'>>;
  userUpdateOne?: Resolver<Maybe<ResolversTypes['UpdateOneUserPayload']>, ParentType, ContextType, RequireFields<MutationUserUpdateOneArgs, 'record' | 'filter'>>;
  createPlan?: Resolver<Maybe<ResolversTypes['CreatePlanMutationResponse']>, ParentType, ContextType, RequireFields<MutationCreatePlanArgs, 'name' | 'annualStripeId' | 'monthlyStripeId'>>;
};

export type OrganizationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['OrganizationAddress']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  liiingoOrganizationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['EnumOrganizationType']>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parentMenuId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  stripeCustomerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  permissions?: Resolver<Maybe<ResolversTypes['OrganizationPermissions']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['MongoID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<OrganizationUsersArgs, 'limit'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationAddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganizationAddress'] = ResolversParentTypes['OrganizationAddress']> = {
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  administrativeArea?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subAdministrativeArea?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  locality?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thoroughfare?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  premise?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganizationConnection'] = ResolversParentTypes['OrganizationConnection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['OrganizationEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganizationEdge'] = ResolversParentTypes['OrganizationEdge']> = {
  node?: Resolver<ResolversTypes['Organization'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationPermissionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganizationPermissions'] = ResolversParentTypes['OrganizationPermissions']> = {
  organizationProfile?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  brandedLiiingoApp?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hasLiiingoAccess?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlanResolvers<ContextType = any, ParentType extends ResolversParentTypes['Plan'] = ResolversParentTypes['Plan']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  annualStripeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  monthlyStripeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  restrictions?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['MongoID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PushNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['PushNotification'] = ResolversParentTypes['PushNotification']> = {
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topicName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topicType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topicTypeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scheduleType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scheduleTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  locationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notificationSent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  modifiedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  flows?: Resolver<Array<ResolversTypes['AppOnboardingFlow']>, ParentType, ContextType, RequireFields<QueryFlowsArgs, 'limit'>>;
  appOnboardingFlowByRoute?: Resolver<Maybe<ResolversTypes['AppOnboardingFlow']>, ParentType, ContextType, RequireFields<QueryAppOnboardingFlowByRouteArgs, 'route'>>;
  subscription?: Resolver<Maybe<ResolversTypes['getSubscriptionResponse']>, ParentType, ContextType>;
  customerPaymentMethod?: Resolver<Maybe<ResolversTypes['CustomerPaymentMethodResponse']>, ParentType, ContextType>;
  organizationById?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType, RequireFields<QueryOrganizationByIdArgs, '_id'>>;
  organizations?: Resolver<Maybe<ResolversTypes['OrganizationConnection']>, ParentType, ContextType, RequireFields<QueryOrganizationsArgs, 'sort'>>;
  getLocationById?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType, RequireFields<QueryGetLocationByIdArgs, '_id'>>;
  getNotifications?: Resolver<Maybe<ResolversTypes['getNotificationResponse']>, ParentType, ContextType, RequireFields<QueryGetNotificationsArgs, 'topicId'>>;
  userById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByIdArgs, '_id'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, never>>;
  userConnection?: Resolver<Maybe<ResolversTypes['UserConnection']>, ParentType, ContextType, RequireFields<QueryUserConnectionArgs, 'sort'>>;
  planById?: Resolver<Maybe<ResolversTypes['Plan']>, ParentType, ContextType, RequireFields<QueryPlanByIdArgs, '_id'>>;
  planByName?: Resolver<Maybe<ResolversTypes['Plan']>, ParentType, ContextType, RequireFields<QueryPlanByNameArgs, 'name'>>;
};

export interface RegExpAsStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RegExpAsString'], any> {
  name: 'RegExpAsString';
}

export type RegisterResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterResponse'] = ResolversParentTypes['RegisterResponse']> = {
  sessionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RuntimeErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['RuntimeError'] = ResolversParentTypes['RuntimeError']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SendNotificationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendNotificationResponse'] = ResolversParentTypes['SendNotificationResponse']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateOneLocationPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateOneLocationPayload'] = ResolversParentTypes['UpdateOneLocationPayload']> = {
  recordId?: Resolver<Maybe<ResolversTypes['MongoID']>, ParentType, ContextType>;
  record?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorInterface']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateOneOrganizationPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateOneOrganizationPayload'] = ResolversParentTypes['UpdateOneOrganizationPayload']> = {
  recordId?: Resolver<Maybe<ResolversTypes['MongoID']>, ParentType, ContextType>;
  record?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorInterface']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateOneUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateOneUserPayload'] = ResolversParentTypes['UpdateOneUserPayload']> = {
  recordId?: Resolver<Maybe<ResolversTypes['MongoID']>, ParentType, ContextType>;
  record?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorInterface']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  sub?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  planId?: Resolver<Maybe<ResolversTypes['MongoID']>, ParentType, ContextType>;
  billing?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  permissions?: Resolver<Maybe<ResolversTypes['UserPermissions']>, ParentType, ContextType>;
  referrer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  inviteAccepted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['MongoID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserConnection'] = ResolversParentTypes['UserConnection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['UserEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge']> = {
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPermissionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPermissions'] = ResolversParentTypes['UserPermissions']> = {
  manageUsers?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  manageBilling?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  manageBusinessProfile?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  uploadPatientDocuments?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidationErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValidationError'] = ResolversParentTypes['ValidationError']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['ValidatorError']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidatorErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValidatorError'] = ResolversParentTypes['ValidatorError']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  idx?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerifyPaymentResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerifyPaymentResponse'] = ResolversParentTypes['VerifyPaymentResponse']> = {
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetNotificationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['getNotificationResponse'] = ResolversParentTypes['getNotificationResponse']> = {
  notifications?: Resolver<Maybe<Array<Maybe<ResolversTypes['PushNotification']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetSubscriptionResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['getSubscriptionResponse'] = ResolversParentTypes['getSubscriptionResponse']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  trialEnd?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  trialStart?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  daysUntilDue?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AppOnboardingFlow?: AppOnboardingFlowResolvers<ContextType>;
  BillingPortalResponse?: BillingPortalResponseResolvers<ContextType>;
  CardChecks?: CardChecksResolvers<ContextType>;
  CardResponse?: CardResponseResolvers<ContextType>;
  ContentLanguages?: ContentLanguagesResolvers<ContextType>;
  ContentLanguagesContent?: ContentLanguagesContentResolvers<ContextType>;
  CreateCheckoutSessionResponse?: CreateCheckoutSessionResponseResolvers<ContextType>;
  CreatePlanMutationResponse?: CreatePlanMutationResponseResolvers<ContextType>;
  CreateTemplatedAppOnboardingFlowMutationResponse?: CreateTemplatedAppOnboardingFlowMutationResponseResolvers<ContextType>;
  CreateTemplatedOrgOnboardingFlowMutationResponse?: CreateTemplatedOrgOnboardingFlowMutationResponseResolvers<ContextType>;
  CustomerPaymentMethodResponse?: CustomerPaymentMethodResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DeleteNotificationResponse?: DeleteNotificationResponseResolvers<ContextType>;
  ErrorInterface?: ErrorInterfaceResolvers<ContextType>;
  EssentialTemplate?: EssentialTemplateResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Location?: LocationResolvers<ContextType>;
  LocationCustomQrCodeColors?: LocationCustomQrCodeColorsResolvers<ContextType>;
  LocationExhibit?: LocationExhibitResolvers<ContextType>;
  LocationExhibitTemplatedContent?: LocationExhibitTemplatedContentResolvers<ContextType>;
  MongoError?: MongoErrorResolvers<ContextType>;
  MongoID?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Organization?: OrganizationResolvers<ContextType>;
  OrganizationAddress?: OrganizationAddressResolvers<ContextType>;
  OrganizationConnection?: OrganizationConnectionResolvers<ContextType>;
  OrganizationEdge?: OrganizationEdgeResolvers<ContextType>;
  OrganizationPermissions?: OrganizationPermissionsResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Plan?: PlanResolvers<ContextType>;
  PushNotification?: PushNotificationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegExpAsString?: GraphQLScalarType;
  RegisterResponse?: RegisterResponseResolvers<ContextType>;
  RuntimeError?: RuntimeErrorResolvers<ContextType>;
  SendNotificationResponse?: SendNotificationResponseResolvers<ContextType>;
  UpdateOneLocationPayload?: UpdateOneLocationPayloadResolvers<ContextType>;
  UpdateOneOrganizationPayload?: UpdateOneOrganizationPayloadResolvers<ContextType>;
  UpdateOneUserPayload?: UpdateOneUserPayloadResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserConnection?: UserConnectionResolvers<ContextType>;
  UserEdge?: UserEdgeResolvers<ContextType>;
  UserPermissions?: UserPermissionsResolvers<ContextType>;
  ValidationError?: ValidationErrorResolvers<ContextType>;
  ValidatorError?: ValidatorErrorResolvers<ContextType>;
  VerifyPaymentResponse?: VerifyPaymentResponseResolvers<ContextType>;
  getNotificationResponse?: GetNotificationResponseResolvers<ContextType>;
  getSubscriptionResponse?: GetSubscriptionResponseResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
