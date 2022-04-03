import { liiingoLanguages } from '@liiingo/core-api-client-typescript';
import { schemaComposer } from 'graphql-compose';
import { GraphQLUpload } from 'graphql-upload';
// import { AppOnboardingTemplateTC } from './onboardingFlows/AppOnboardingTemplateModel';
// schemaComposer.add(AppOnboardingTemplateTC);
// import { AppOnboardingFlowTC } from './onboardingFlows/AppOnboardingFlowModel';
// schemaComposer.add(AppOnboardingFlowTC.getType());
import { AppOnboardingFlowMutations, AppOnboardingFlowQueries } from './appOnboardingFlows/resolvers';
import { BillingQueries, BillingMutations } from './billing/resolvers';
import { LocationQueries, LocationMutations } from './location/resolvers';
import { NotificationQueries, NotificationMutations } from './notifications/resolvers';
import { OrganizationMutation, OrganizationQuery } from './organizations/resolvers';
import { PlanMutations, PlanQueries } from './plans/resolvers';
import { UserMutation, UserQuery } from './users/resolvers';

schemaComposer.add(GraphQLUpload);

schemaComposer.Query.addFields({
  ...AppOnboardingFlowQueries,
  ...BillingQueries,
  ...OrganizationQuery,
  ...LocationQueries,
  ...NotificationQueries,
  ...UserQuery,
  ...PlanQueries,
});

schemaComposer.Mutation.addFields({
  ...AppOnboardingFlowMutations,
  ...BillingMutations,
  ...LocationMutations,
  ...NotificationMutations,
  ...OrganizationMutation,
  ...UserMutation,
  ...PlanMutations,
});

schemaComposer.createInputTC({
  name: 'ContentLanguagesContentInput',
  fields: {
    name: 'String',
    value: 'String',
    fileUrl: 'String',
  },
});

schemaComposer.createInputTC({
  name: 'ContentLanguagesInput',
  fields: liiingoLanguages.reduce((accumulator, language: string) => {
    accumulator[language.replace('-', '_')] = 'ContentLanguagesContentInput';
    return accumulator;
  }, {}),
});

schemaComposer.getITC('UpdateOneLocationExhibitTemplatedContentInput').setField('languages', {
  name: 'languages',
  type: 'ContentLanguagesInput',
});

schemaComposer.getITC('ContentLanguagesContentInput').setField('binaryValue', {
  name: 'binaryValue',
  type: 'Upload',
});

export default schemaComposer.buildSchema();
