/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAppOnboardingFlowByRoute
// ====================================================

export interface getAppOnboardingFlowByRoute_appOnboardingFlowByRoute_organization {
  __typename: "Organization";
  _id: any;
  name: string | null;
  stripeCustomerId: string | null;
}

export interface getAppOnboardingFlowByRoute_appOnboardingFlowByRoute_essentialTemplate {
  __typename: "EssentialTemplate";
  /**
   * A human-readable name for the template. Examples: "PAVE Plus", "Food Menu Basic"
   */
  name: string;
  /**
   * The Stripe product code used by Stripe to bill a customer for this template
   */
  stripeProductCode: string;
  /**
   * The locationId of the template app
   */
  templateId: string;
}

export interface getAppOnboardingFlowByRoute_appOnboardingFlowByRoute {
  __typename: "AppOnboardingFlow";
  _id: any;
  organization: getAppOnboardingFlowByRoute_appOnboardingFlowByRoute_organization | null;
  essentialTemplate: getAppOnboardingFlowByRoute_appOnboardingFlowByRoute_essentialTemplate | null;
  createNewOrganization: boolean | null;
  /**
   * The portion of the URL immediately following the domain name that will route to the onboarding flow for this Organization. For example: "myRoute" will make this onboarding flow accessible at "poweredby.liiingo.com/myRoute/sign-up"
   */
  route: string;
  /**
   * S3 url
   */
  logo: string | null;
  /**
   * S3 URL
   */
  favicon: string | null;
}

export interface getAppOnboardingFlowByRoute {
  appOnboardingFlowByRoute: getAppOnboardingFlowByRoute_appOnboardingFlowByRoute | null;
}

export interface getAppOnboardingFlowByRouteVariables {
  route: string;
}
