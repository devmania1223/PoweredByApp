import * as mongoose from 'mongoose';
import { ModelWithTimestamps } from '../modeltypes';

/**
 * This file is specific to the Mongoose schema and is intended
 * to be used internally.  The outward-facing API schema is defined
 * in the typedefs.ts file.
 */
export const EssentialTemplateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      description: 'A human-readable name for the template. Examples: "PAVE Plus", "Food Menu Basic"',
      required: true,
      unique: true,
    },
    stripeProductCode: {
      type: String,
      description: 'The Stripe product code used by Stripe to bill a customer for this template',
      required: true,
    },
    templateId: {
      type: String,
      description: 'The locationId of the template app',
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'essentialTemplates',
  }
);

export interface EssentialTemplateModel extends mongoose.Document<string>, ModelWithTimestamps {
  name: string;
  stripeProductCode: string;
  templateId: string;
}
export const EssentialTemplate = mongoose.model<EssentialTemplateModel>('EssentialTemplate', EssentialTemplateSchema);
