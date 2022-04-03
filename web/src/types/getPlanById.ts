/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPlanById
// ====================================================

export interface getPlanById_planById {
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
  updatedAt: any | null;
  createdAt: any | null;
}

export interface getPlanById {
  planById: getPlanById_planById | null;
}

export interface getPlanByIdVariables {
  id: any;
}
