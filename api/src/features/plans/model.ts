import * as mongoose from 'mongoose';
import { ModelWithTimestamps } from '../modeltypes';

export type RestrictionsType = {
  pageLimit?: number;
};

/**
 * This file is specific to the Mongoose schema and is intended
 * to be used internally.  The outward-facing API schema is defined
 * in the typedefs.ts file.
 */
export const PlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      description: 'A human-readable name for the plan.',
      required: true,
      unique: true,
    },
    annualStripeId: {
      type: String,
      description: 'Annual stripe id',
      required: true,
    },
    monthlyStripeId: {
      type: String,
      description: 'Monthly stripe id',
      required: true,
    },
    restrictions: {
      type: Object,
      description: 'Object containing the restrictions for this plan, i.e. pageLimit',
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'plans',
  }
);

export interface PlanModel extends mongoose.Document<string>, ModelWithTimestamps {
  name: string;
  annualStripeId: string;
  monthlyStripeId: string;
  restrictions: object;
}
export const Plan = mongoose.model<PlanModel>('Plan', PlanSchema);
