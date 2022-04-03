import * as mongoose from 'mongoose';
import { ContentModel, ContentSchema } from '../content/model';
import { ModelWithTimestamps } from '../modeltypes';

/**
 * This file is specific to the Mongoose schema and is intended
 * to be used internally.  The outward-facing API schema is defined
 * in the typedefs.ts file.
 */
export const AppOnboardingTemplateSchema = new mongoose.Schema(
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
    codeModule: {
      type: String,
      description: 'An npm-style package name that points to the javascript template, i.e. @liiingo/myTemplate',
      required: true,
    },
    templatedContent: {
      app: {
        topicBackgroundImageUrl: {
          type: String,
        },
      },
      topic: [ContentSchema],
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'templates',
  }
);

// this will make find, findOne typesafe
export interface AppOnboardingTemplateModel extends mongoose.Document<string>, ModelWithTimestamps {
  name: string;
  stripeProductCode: string;
  codeModule: string;
  templatedContent?: {
    app?: {
      topicBackgroundImageUrl?: string;
    };
    topic?: ContentModel[];
  };
}
export const AppOnboardingTemplate = mongoose.model<AppOnboardingTemplateModel>(
  'AppOnboardingTemplate',
  AppOnboardingTemplateSchema
);
