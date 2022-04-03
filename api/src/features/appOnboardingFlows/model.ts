import * as mongoose from 'mongoose';
import { ModelWithTimestamps } from '../modeltypes';

/**
 * This file is specific to the Mongoose schema and is intended
 * to be used internally.  The outward-facing API schema is defined
 * in the typedefs.ts file.
 */
export const AppOnboardingFlowSchema = new mongoose.Schema(
  {
    route: {
      type: String,
      description:
        'The portion of the URL immediately following the domain name that will route to the onboarding flow for this Organization. For example: "myRoute" will make this onboarding flow accessible at "poweredby.liiingo.com/myRoute/sign-up"',
      required: true,
      unique: true, // Onboarding flows will primarily be looked up by their 'route', so this index is critical
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'organizations',
      description: '',
      required: false,
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'essentialTemplates',
      description: '',
      required: true,
    },
    stripeSubscriptionId: {
      type: String,
      required: false,
    },
    logo: {
      type: String,
      description: 'S3 url',
      required: false,
    },
    favicon: {
      type: String,
      description: 'S3 URL',
      required: false,
    },
    /**
     * If true, we'll create a new Organization when a user registers. In this case, the 'organizationId' on this entity should be undefined.
     * If falsey, we assume that a parent Organization already exists and we'll create a new child App within that Org.
     */
    createNewOrganization: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'onboardingFlows',
  }
);

export interface AppOnboardingFlowModel extends mongoose.Document<string>, ModelWithTimestamps {
  route: string;
  organizationId?: string;
  templateId: string;
  stripeSubscriptionId?: string;
  createNewOrganization?: boolean;
  logo?: string;
  favicon?: string;
}
export const AppOnboardingFlow = mongoose.model<AppOnboardingFlowModel>('AppOnboardingFlow', AppOnboardingFlowSchema);
