/**
 * This file defines the GraphQL schema for the "User" GraphQL Type, including type definitions and field resolver logic.
 */
import { ImpersonatedOrg } from '@liiingo/core-api-client-typescript';
import { UserInputError } from 'apollo-server-koa';
import CognitoIdentityServiceProvider from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { ResolverResolveParams, schemaComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { liiingo } from '../../';
import { config } from '../../config';
import { AppContext } from '../../server';
import { sendUserInviteEmail, sendWelcomeEmail } from '../../services/mail';
import { changeSubscriptionQuantity, createStripeSubscription, endStripeSubscription } from '../../services/stripe';
import { logger } from '../../util/logger';
import { AppOnboardingFlow } from '../appOnboardingFlows/model';
import { EssentialTemplate } from '../essentialTemplates/model';
import { Location, LocationModel } from '../location/model';
import { LocationTC } from '../location/typedefs';
import { createOrganization, Organization, OrganizationModel, OrganizationTC } from '../organizations/model';
import { User } from './model';

const cognito = new CognitoIdentityServiceProvider({
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_KEY,
  },
  region: config.COGNITO_REGION,
});
const UserTC = composeWithMongoose(User, {
  inputType: {
    // We don't need to query for users with specific permissions, and we also don't mutate permissions directly.
    removeFields: ['permissions'],
  },
  resolvers: {
    updateOne: {
      filter: {
        isRequired: true,
        requiredFields: ['_id'],
        // It would be nice to be able to do something like `onlyFields: ['_id']` here, but it doesn't seem to be possible...
        // removing fields from the filter input is done in users/resolvers.ts
      },
      record: {
        // The following fields cannot be mutated via GraphQL on the User object
        removeFields: ['_id', 'type', 'typeId', 'permissions', 'active', 'referrer', 'updatedAt', 'createdAt'],
      },
    },
  },
});
// Now remove the password field from the OUTPUT type so that it won't appear in any api responses.
UserTC.removeField('organizationId'); // Hide the User.organizationId field because we're replacing it with the User.organization OBJECT

UserTC.addRelation<OrganizationModel>('organization', {
  resolver: () => OrganizationTC.getResolver('findById'),
  prepareArgs: {
    _id: (source) => source.organizationId,
  },
  projection: {
    organizationId: true,
  },
});

UserTC.removeField('locationId'); // Hide the User.locationId field because we're replacing it with the User.location OBJECT

UserTC.addRelation<LocationModel>('location', {
  resolver: () => LocationTC.getResolver('findById'),
  prepareArgs: {
    _id: (source) => source.locationId,
  },
  projection: {
    locationId: true,
  },
});

const RegisterResponse = schemaComposer.createObjectTC({
  name: 'RegisterResponse',
  fields: {
    sessionId: 'String',
  },
});

const registerMutationArgs = {
  organizationId: 'String!',
  onboardingRoute: 'String!',
  termsOfService: 'Boolean!',
  referrer: 'String',
};
type RegisterMutationArgs = {
  organizationId: string;
  onboardingRoute: string;
  termsOfService: boolean;
  referrer?: string;
};
UserTC.addResolver({
  kind: 'mutation',
  name: 'register',
  args: registerMutationArgs,
  type: RegisterResponse,
  // @ts-ignore anonymous function, graphql-compose didn't seem to export types nicely
  resolve: async ({ args, context }: ResolverResolveParams<void, AppContext, RegisterMutationArgs>) => {
    if (!args.termsOfService) {
      throw new UserInputError('You must agree to the Terms of Service');
    }
    let organization = await Organization.findById(args.organizationId);
    if (!organization) {
      throw new UserInputError(
        `Couldn't register a new user for Organization ${args.organizationId} because that Organization wasn't found`
      );
    }
    const onboardingTemplateId = (await AppOnboardingFlow.findOne({ route: args.onboardingRoute }))?.templateId;
    const onboardingTemplate = await EssentialTemplate.findById(onboardingTemplateId);
    if (!onboardingTemplate) {
      throw new UserInputError(
        `Couldn't complete user registration because the onboarding route (${args.onboardingRoute}) isn't active.`
      );
    }

    const templateId = onboardingTemplate?.templateId;

    // TODO: Put some sort of authorization gate here? How will we prevent just anyone from signing up under this Org and increasing their billing?

    logger.info(`Starting new user registration under organization: ${organization.name} (${organization.email})`);
    const impersonatedOrg = await new ImpersonatedOrg({
      liiingoClient: liiingo,
    })
      .withOrgId(organization.liiingoOrganizationId)
      .impersonate();

    // TODO: Use the impersonatedOrg here and remove the internal impersonation call from the liiingo.createApp() method
    const liiingoLocationName = `${context?.user?.firstName} ${context?.user?.lastName}'s App`;

    const template = await impersonatedOrg.callWithToken(liiingo.getTemplate, templateId);

    let liiingoLocation = await liiingo.createApp({
      organizationId: organization.liiingoOrganizationId,
      name: template.location.name,
      companyName: `${context?.user?.firstName} ${context?.user?.lastName}`,
      supportedLanguages: template.location.supportedLanguages, // TODO: This should be selectable during registration
      defaultLanguage: template.location.defaultLanguage, // TODO: This should be selectable during registration
      phoneNumber: '',
      contactName: `${context?.user?.firstName} ${context?.user?.lastName}`,
      email: context?.user?.email || '',
      status: template.location.status,
    });

    // Updating logo
    if (!!template.location.headerLogo) {
      let updateHeaderLogoResult = await impersonatedOrg.callWithToken(liiingo.updateApp, {
        id: liiingoLocation?.menuId,
        headerLogo: template.location.headerLogo,
        headerLogoImageName: 'headerLogo.png',
        organizationId: organization.liiingoOrganizationId,
        name: template.location.name,
        companyName: `${context?.user?.firstName} ${context?.user?.lastName}`,
        supportedLanguages: template.location.supportedLanguages, // TODO: This should be selectable during registration
        defaultLanguage: template.location.defaultLanguage, // TODO: This should be selectable during registration
        phoneNumber: '',
        contactName: `${context?.user?.firstName} ${context?.user?.lastName}`,
        email: context?.user?.email || '',
        status: template.location.status,
      });
    }

    // Updating QR Code
    if (!!template.location.customQrLogo) {
      let updateQrResult = await impersonatedOrg.callWithToken(liiingo.updateApp, {
        id: liiingoLocation?.menuId,
        customQrLogo: template.location.customQrLogo,
        customQrLogoImageName: 'qrLogo.png',
        customQrColorPrimary: template.location.customQrColorPrimary,
        customQrColorSecondary: template.location.customQrColorSecondary,
        organizationId: organization.liiingoOrganizationId,
        name: template.location.name,
        companyName: `${context?.user?.firstName} ${context?.user?.lastName}`,
        supportedLanguages: template.location.supportedLanguages, // TODO: This should be selectable during registration
        defaultLanguage: template.location.defaultLanguage, // TODO: This should be selectable during registration
        phoneNumber: '',
        contactName: `${context?.user?.firstName} ${context?.user?.lastName}`,
        email: context?.user?.email || '',
        status: template.location.status,
      });
    } else if (!!template.location.customQRColorPrimary || !!template.location.customQRColorSecondary) {
      let updateQrColorResult = await impersonatedOrg.callWithToken(liiingo.updateApp, {
        id: liiingoLocation?.menuId,
        customQrColorPrimary: template.location.customQrColorPrimary,
        customQrColorSecondary: template.location.customQrColorSecondary,
        organizationId: organization.liiingoOrganizationId,
        name: template.location.name,
        companyName: `${context?.user?.firstName} ${context?.user?.lastName}`,
        supportedLanguages: template.location.supportedLanguages, // TODO: This should be selectable during registration
        defaultLanguage: template.location.defaultLanguage, // TODO: This should be selectable during registration
        phoneNumber: '',
        contactName: `${context?.user?.firstName} ${context?.user?.lastName}`,
        email: context?.user?.email || '',
        status: template.location.status,
      });
    }

    // Contents
    let contentIdMap = {};
    let contentLanguageMap = {};
    for (const content of /* contents in topic */ template.contents) {
      let videoLanguages;
      if (content.type === 'video') {
        videoLanguages = content.languages.map((language: any) => {
          delete language.fileUrl;
          return language;
        });
      }
      let liiingoContent = await impersonatedOrg.callWithToken(liiingo.updateContent, {
        isShared: content.isShared,
        readOnly: content.readOnly,
        status: content.status,
        type: content.type,
        languages: videoLanguages ?? content.languages,
        assignedTopics: content.assignedTopics,
      });
      contentIdMap[content._id] = liiingoContent.data;
      contentLanguageMap[liiingoContent.data] = content.languages;
    }

    // Sections
    let sectionOrder: string[] = [];
    let topicIdMap = {};
    let i = 0;
    for (const section of template.sections) {
      let liiingoSection = await impersonatedOrg.callWithToken(liiingo.updateSection, {
        menuId: liiingoLocation?.menuId,
        name: section.name,
        organizationId: organization.liiingoOrganizationId,
        status: section.status,
        topicOrder: section.topicOrder,
      });

      // Topics
      for (const topic of /* topics in section */ template.topics.filter((temp: any) => temp.sectionId == section.id)) {
        let newContentIds = topic.content.map((oldId: string) => contentIdMap[oldId]);

        const topicRequest = {
          name: topic.name,
          content: newContentIds,
          enableSharing: topic.enableSharing,
          organizationId: organization.liiingoOrganizationId,
          sectionId: liiingoSection,
          status: topic.status,
        };
        const liiingoTopic = await impersonatedOrg.callWithToken(liiingo.updateTopic, topicRequest);
        topicIdMap[topic.id] = liiingoTopic._id;

        const updateTopicBackgroundResult = !!topic.exhibitImage
          ? await impersonatedOrg.callWithToken(liiingo.updateTopicBackground, {
              id: liiingoTopic._id,
              backgroundImageUrl: topic.exhibitImage,
              backgroundImageName: topic.backgroundImageName,
            })
          : await Promise.resolve();
      }

      // update topic order for this section
      const newTopicOrder = section.topicOrder.map((oldId: string) => topicIdMap[oldId]);
      await impersonatedOrg.callWithToken(liiingo.updateTopicOrder, {
        id: liiingoSection,
        exhibitOrder: newTopicOrder,
      });

      // Update section order
      sectionOrder[i] = liiingoSection;
      i++;
    }

    // Now store all the Liiingo App/Section/Topic ids locally (in poweredby)
    const location = new Location({
      name: liiingoLocationName, //template.location.name,
      liiingoUrl: liiingoLocation?.qrPreviewPath,
      companyName: `${context?.user?.firstName} ${context?.user?.lastName}`,
      supportedLanguages: ['en'], // TODO: This should be selectable during registration
      defaultLanguage: 'en', // TODO: This should be selectable during registration
      phoneNumber: '',
      contactName: `${context?.user?.firstName} ${context?.user?.lastName}`,
      email: context?.user?.email,
      liiingoLocationId: liiingoLocation?.menuId,
      liiingoSectionId: sectionOrder[0],
      organizationId: organization._id,
      exhibit: {
        liiingoExhibitId: 'tempId',
        templateId: onboardingTemplateId,
      },
    });

    if (!location) {
      throw new Error(
        `A new Location could not be created in the poweredBy db during user registration under organization: poweredBy ID:${organization._id}, liiingo ID: ${organization.liiingoOrganizationId}`
      );
    }

    const user = new User({
      sub: context?.user?.sub,
      email: context?.user?.email,
      username: context?.user?.username,
      organizationId: args.organizationId, // TODO: eventually this property should go away and we should just respect the permissions.organizations collection
      locationId: template.location.id, //location._id,
      // TODO: create an interface/type for User.permissions
      permissions: {
        organizations: {
          [args.organizationId]: {
            // This is the PoweredBy organization ID, NOT the Liiingo Org ID... is that what we want?
            access: true,
            billing: false,
            edit: false,
            invite: true,
          },
        },
        locations: {
          [template.location.id]: {
            // TODO: this location._id refers to the id used in the PoweredBy database, NOT the Liiingo database... is that what we want?
            access: true,
            edit: true,
          },
        },
      },
    });

    try {
      await user.save();
    } catch (error) {
      logger.error(
        `Failed to create a new user with email ${context?.user?.email} while registering for a new App within the existing Organization: (poweredBy ID:${organization._id}, liiingo ID: ${organization.liiingoOrganizationId}). Does this User already have a Liiingo account under the same email? Error: ${error}`
      );
      throw error;
    }
    logger.info(`Created new user (${user.email}) for organization (${organization._id})`);

    const flow = await AppOnboardingFlow.findOne({ route: args.onboardingRoute });
    if (!flow) {
      throw new Error(`Couldn't find flow at the specified route: ${args.onboardingRoute}. This should never happen`);
    }
    organization.userIds.push(user._id);
    await organization.save();

    changeSubscriptionQuantity(flow.stripeSubscriptionId as string, 1, user.email);

    const qrCodeUrl = template.location.qrPreviewPath; //location?.exhibit?.qrCodeUrl;
    const route = `${flow?.route}/sign-in`;
    sendWelcomeEmail(user, qrCodeUrl, route);

    return {
      sessionId: 'no-session-id', // TODO: what response do we want here?
    };
  },
});

const registerNewOrgMutationArgs = {
  onboardingRoute: 'String!',
  termsOfService: 'Boolean!',
  referrer: 'String',
  planId: 'String',
  billing: 'String',
};
type RegisterNewOrgMutationArgs = {
  onboardingRoute: string;
  termsOfService: boolean;
  referrer?: string;
  planId?: string;
  billing?: string;
};
UserTC.addResolver({
  kind: 'mutation',
  name: 'registerNewOrg',
  args: registerNewOrgMutationArgs,
  type: RegisterResponse,
  // @ts-ignore anonymous function, graphql-compose didn't seem to export types nicely
  resolve: async ({ args, context }: ResolverResolveParams<void, AppContext, RegisterNewOrgMutationArgs>) => {
    if (!args.termsOfService) {
      throw new UserInputError('You must agree to the Terms of Service');
    }
    let organization: OrganizationModel;
    try {
      // A Stripe CustomerID is generated while creating the organization.
      organization = await createOrganization({
        name: `${context!.user!.email} (${context!.user!.firstName})`, // Use the email as the organization name to ensure that it's unique
        email: context!.user!.email,
        type: 'subscriber', // This is a little weird, but the Organization being created will be a 'child' of itself (the 'parentMenuId' will be set to its own organization ID...)
      });
      await organization.save();
      logger.info(`Created Organization: ${JSON.stringify(organization)}`);
    } catch (error) {
      logger.error(
        `Failed to create a new Organization with email ${context?.user?.email} while registering for a new App with a new Org (registerNewOrg mutation). Does this User already have a Liiingo account under the same email? Error: ${error}`
      );
      throw new Error(
        `Error creating a new Liiingo organization during user registration (maybe the Organization name or email isn't unique?)`
      );
    }

    /* NEW START */
    const onboardingTemplateId = (await AppOnboardingFlow.findOne({ route: args.onboardingRoute }))?.templateId;
    const onboardingTemplate = await EssentialTemplate.findById(onboardingTemplateId);
    if (!onboardingTemplate) {
      throw new UserInputError(
        `Couldn't complete user registration because the onboarding route (${args.onboardingRoute}) isn't active.`
      );
    }

    const templateId = onboardingTemplate?.templateId;

    // TODO: Put some sort of authorization gate here? How will we prevent just anyone from signing up under this Org and increasing their billing?

    logger.info(`Starting new user registration under organization: ${organization.name} (${organization.email})`);
    const impersonatedOrg = await new ImpersonatedOrg({
      liiingoClient: liiingo,
    })
      .withOrgId(organization.liiingoOrganizationId)
      .impersonate();

    // TODO: Use the impersonatedOrg here and remove the internal impersonation call from the liiingo.createApp() method
    const liiingoLocationName = `${context?.user?.firstName} ${context?.user?.lastName}'s App`;
    const template = await impersonatedOrg.callWithToken(liiingo.getTemplate, templateId);

    // Loction
    let liiingoLocation = await liiingo.createApp({
      organizationId: organization.liiingoOrganizationId,
      name: template.location.name,
      companyName: `${context?.user?.firstName} ${context?.user?.lastName}`,
      supportedLanguages: template.location.supportedLanguages,
      defaultLanguage: template.location.defaultLanguage,
      phoneNumber: '',
      contactName: `${context?.user?.firstName} ${context?.user?.lastName}`,
      email: context?.user?.email || '',
      status: template.location.status,
    });

    // Updating logo
    if (!!template.location.headerLogo) {
      let updateHeaderLogoResult = await impersonatedOrg.callWithToken(liiingo.updateApp, {
        id: liiingoLocation?.menuId,
        headerLogo: template.location.headerLogo,
        headerLogoImageName: 'headerLogo.png',
        organizationId: organization.liiingoOrganizationId,
        name: template.location.name,
        companyName: `${context?.user?.firstName} ${context?.user?.lastName}`,
        supportedLanguages: template.location.supportedLanguages,
        defaultLanguage: template.location.defaultLanguage,
        phoneNumber: '',
        contactName: `${context?.user?.firstName} ${context?.user?.lastName}`,
        email: context?.user?.email || '',
        status: template.location.status,
      });
    }

    // Updating QR Code
    if (!!template.location.customQrLogo) {
      let updateQrResult = await impersonatedOrg.callWithToken(liiingo.updateApp, {
        id: liiingoLocation?.menuId,
        customQrLogo: template.location.customQrLogo,
        customQrLogoImageName: 'qrLogo.png',
        customQrColorPrimary: template.location.customQrColorPrimary,
        customQrColorSecondary: template.location.customQrColorSecondary,
        organizationId: organization.liiingoOrganizationId,
        name: template.location.name,
        companyName: `${context?.user?.firstName} ${context?.user?.lastName}`,
        supportedLanguages: template.location.supportedLanguages, // TODO: This should be selectable during registration
        defaultLanguage: template.location.defaultLanguage, // TODO: This should be selectable during registration
        phoneNumber: '',
        contactName: `${context?.user?.firstName} ${context?.user?.lastName}`,
        email: context?.user?.email || '',
        status: template.location.status,
      });
    } else if (!!template.location.customQRColorPrimary || !!template.location.customQRColorSecondary) {
      let updateQrColorResult = await impersonatedOrg.callWithToken(liiingo.updateApp, {
        id: liiingoLocation?.menuId,
        customQrColorPrimary: template.location.customQrColorPrimary,
        customQrColorSecondary: template.location.customQrColorSecondary,
        organizationId: organization.liiingoOrganizationId,
        name: template.location.name,
        companyName: `${context?.user?.firstName} ${context?.user?.lastName}`,
        supportedLanguages: template.location.supportedLanguages, // TODO: This should be selectable during registration
        defaultLanguage: template.location.defaultLanguage, // TODO: This should be selectable during registration
        phoneNumber: '',
        contactName: `${context?.user?.firstName} ${context?.user?.lastName}`,
        email: context?.user?.email || '',
        status: template.location.status,
      });
    }

    // Contents
    let contentIdMap = {};
    let contentLanguageMap = {};
    for (const content of /* contents in topic */ template.contents) {
      // need to copy all the contents
      let videoLanguages;
      if (content.type === 'video') {
        videoLanguages = content.languages.map((language: any) => {
          delete language.fileUrl;
          return language;
        });
      }
      let liiingoContent = await impersonatedOrg.callWithToken(liiingo.updateContent, {
        isShared: content.isShared,
        readOnly: content.readOnly,
        status: content.status,
        type: content.type,
        languages: videoLanguages ?? content.languages,
        assignedTopics: content.assignedTopics,
      });
      contentIdMap[content._id] = liiingoContent.data;
      contentLanguageMap[liiingoContent.data] = content.languages;
    }

    // Sections
    let sectionOrder: string[] = [];
    let topicIdMap = {};
    let i = 0;
    for (const section of template.sections) {
      let liiingoSection = await impersonatedOrg.callWithToken(liiingo.updateSection, {
        menuId: liiingoLocation?.menuId,
        name: section.name,
        organizationId: organization.liiingoOrganizationId,
        status: section.status,
        topicOrder: section.topicOrder,
      });

      // Topics
      for (const topic of /* topics in section */ template.topics.filter((temp: any) => temp.sectionId == section.id)) {
        let newContentIds = topic.content.map((oldId: string) => contentIdMap[oldId]);

        const topicRequest = {
          name: topic.name,
          content: newContentIds,
          enableSharing: topic.enableSharing,
          organizationId: organization.liiingoOrganizationId,
          sectionId: liiingoSection,
          status: topic.status,
        };
        const liiingoTopic = await impersonatedOrg.callWithToken(liiingo.updateTopic, topicRequest);
        topicIdMap[topic.id] = liiingoTopic._id;

        const updateTopicBackgroundResult = !!topic.exhibitImage
          ? await impersonatedOrg.callWithToken(liiingo.updateTopicBackground, {
              id: liiingoTopic._id,
              backgroundImageUrl: topic.exhibitImage,
              backgroundImageName: topic.backgroundImageName,
            })
          : await Promise.resolve();
      }

      // update topic order for this section
      const newTopicOrder = section.topicOrder.map((oldId: string) => topicIdMap[oldId]);
      await impersonatedOrg.callWithToken(liiingo.updateTopicOrder, {
        id: liiingoSection,
        exhibitOrder: newTopicOrder,
      });

      // Update section order
      sectionOrder[i] = liiingoSection;
      i++;
    }

    const location = new Location({
      name: liiingoLocationName,
      liiingoUrl: liiingoLocation?.qrPreviewPath,
      companyName: `${context?.user?.firstName} ${context?.user?.lastName}`,
      supportedLanguages: ['en'], // TODO: This should be selectable during registration
      defaultLanguage: 'en', // TODO: This should be selectable during registration
      phoneNumber: '',
      contactName: `${context?.user?.firstName} ${context?.user?.lastName}`,
      email: context?.user?.email,
      liiingoLocationId: liiingoLocation?.menuId,
      liiingoSectionId: sectionOrder[0],
      organizationId: organization._id,
      exhibit: {
        liiingoExhibitId: 'tempId',
        //qrCodeUrl: liiingoTopic?.qr,
        templateId: onboardingTemplateId,
      },
    });

    if (!location) {
      throw new Error(
        `A new Location could not be created in the poweredBy db during user registration under organization: poweredBy ID:${organization._id}, liiingo ID: ${organization.liiingoOrganizationId}`
      );
    }

    const user = new User({
      sub: context?.user?.sub,
      email: context?.user?.email,
      organizationId: organization._id, // TODO: eventually this property should go away and we should just respect the permissions.organizations collection
      locationId: location._id,
      username: context?.user?.username,
      planId: args.planId,
      billing: args.billing,
      // TODO: create an interface/type for User.permissions
      permissions: {
        organizations: {
          [organization._id as string]: {
            // This is the PoweredBy organization ID, NOT the Liiingo Org ID... is that what we want?
            access: true,
            billing: false,
            edit: false,
            invite: true,
          },
        },
        locations: {
          [location._id]: {
            // TODO: this location._id refers to the id used in the PoweredBy database, NOT the Liiingo database... is that what we want?
            access: true,
            edit: true,
          },
        },
      },
    });

    await user.save();
    logger.info(`Created new user (${user.email}) for organization (${organization._id})`);

    const flow = await AppOnboardingFlow.findOne({ route: args.onboardingRoute });
    if (!flow) {
      throw new Error(`Couldn't find flow at the specified route: ${args.onboardingRoute}. This should never happen`);
    }
    organization.userIds.push(user._id);
    await organization.save();

    //removing trial period
    await createStripeSubscription(organization.stripeCustomerId, onboardingTemplate.stripeProductCode, 1, 1);

    const qrCodeUrl = location?.exhibit?.qrCodeUrl;
    const route = `${flow?.route}/sign-in`;
    sendWelcomeEmail(user, qrCodeUrl, route);

    return {
      sessionId: 'no-session-id', // TODO: what response do we want here?
    };
  },
});

const inviteUserMutationArgs = {
  email: 'String!',
};
type InviteUserMutationArgs = {
  email: string;
};
UserTC.addResolver({
  kind: 'mutation',
  name: 'inviteUser',
  args: inviteUserMutationArgs,
  type: 'Boolean',
  resolve: async ({ args, context }: ResolverResolveParams<void, AppContext, InviteUserMutationArgs>) => {
    const callingUser = context.user!; // The user MUST be populated by the auth middleware
    const invitedOrganization: OrganizationModel | null = await Organization.findById(callingUser.organizationId);
    if (!invitedOrganization) {
      throw new Error(`Couldn't find organization for user: ${callingUser.email}`);
    }
    let user = await User.findOne({ email: args.email });
    if (user) {
      throw new Error('User already has a PAVE account');
    }

    user = new User({
      email: args.email,
      permissions: {
        uploadPatientDocuments: true,
      },
      organizationId: callingUser.organizationId,
      inviteAccepted: false,
    });

    // const token = generateToken(user, {
    //   expiresIn: JWT_USER_INVITE_EXPIRE_SECONDS,
    // });
    user.save();
    await sendUserInviteEmail(args.email, '', callingUser, invitedOrganization);

    return true;
  },
});

const closeAccountMutationArgs = {
  route: 'String!',
};
type CloseAccountMutationArgs = {
  route: string;
};
UserTC.addResolver({
  kind: 'mutation',
  name: 'closeAccount',
  args: closeAccountMutationArgs,
  type: UserTC.getResolver('updateOne').getType(),
  // @ts-ignore
  resolve: async ({ args, context }: ResolverResolveParams<void, AppContext, CloseAccountMutationArgs>) => {
    const user = await User.findOne({ sub: context?.user?.sub });
    if (!user) {
      throw new Error(`Couldn't close account for user ${context?.user?.sub} because that user wasn't found`);
    }

    const flow = await AppOnboardingFlow.findOne({ route: args.route });
    if (!flow) {
      throw new Error(`Couldn't close ${user.sub} because flow: ${args.route} was not found. This should never happen`);
    }
    if (flow.createNewOrganization) {
      const organization = await Organization.findById(user.organizationId);
      endStripeSubscription(organization?.stripeCustomerId as string);
    } else {
      changeSubscriptionQuantity(flow.stripeSubscriptionId as string, -1, user.email);
    }
    user.active = false;
    await cognito.adminDisableUser({ Username: user.sub, UserPoolId: config.COGNITO_USER_POOL_ID }).promise();

    await user.save();

    return {
      recordId: user._id,
    };
  },
});

export { UserTC };
