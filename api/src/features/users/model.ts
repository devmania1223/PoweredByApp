/**
 * This file defines the MongoDB/Mongoose schema.
 * This should be considered to be the "internal" data model for this feature.
 * It should not include GraphQL schema definitions.
 */
import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';
import { ModelWithTimestamps } from '../modeltypes';

export const UserSchema = new Schema<UserModel>(
  {
    sub: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'organizations',
      required: true,
    },
    locationId: {
      type: Schema.Types.ObjectId,
      ref: 'locations',
      required: true,
    },
    planId: {
      type: Schema.Types.ObjectId,
      ref: 'plans',
      required: false,
    },
    billing: {
      type: String,
    },
    permissions: {
      manageUsers: Boolean,
      manageBilling: Boolean,
      manageBusinessProfile: Boolean,
      uploadPatientDocuments: Boolean,
    },
    referrer: {
      type: String,
    },
    /**
     * Proposal, for discussion someday:
     * invitation: {
     *    sentAt: Date | null,
     *    acceptedAt: Date | null,
     *    expiresAt: Date | null,
     * },
     */
    inviteAccepted: {
      type: Boolean,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'users',
  }
);

UserSchema.index({ createdAt: 1, updatedAt: 1 });
export interface UserModel extends Document, ModelWithTimestamps {
  firstName: string;
  lastName: string;
  sub: string;
  username: string;
  email: string;
  organizationId: mongoose.Types.ObjectId;
  locationId: mongoose.Types.ObjectId;
  permissions: {
    manageUsers: boolean;
    manageBilling: boolean;
    manageBusinessProfile: boolean;
  };
  referrer?: string;
  active: boolean;
  planId?: mongoose.Types.ObjectId;
  billing?: string;
}

// this will make find, findOne typesafe
export const User = mongoose.model<UserModel>('User', UserSchema);
