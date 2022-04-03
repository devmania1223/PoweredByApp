/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPlanByName
// ====================================================

export interface getPlanByName_planByName {
  __typename: "Plan";
  _id: any;
  /**
   * A human-readable name for the plan.
   */
  name: string;
  /**
   * Annual stripe id
   */
  annualStripeId: string;
  /**
   * Monthly stripe id
   */
  monthlyStripeId: string;
  /**
   * Object containing the restrictions for this plan, i.e. pageLimit
   */
  restrictions: any | null;
  createdAt: any | null;
  updatedAt: any | null;
}

export interface getPlanByName {
  planByName: getPlanByName_planByName | null;
}

export interface getPlanByNameVariables {
  name: string;
}
