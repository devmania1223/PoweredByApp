import { schemaComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { Plan } from './model';

const PlanTC = composeWithMongoose(Plan);

const RestrictionsInputArgsSchema = schemaComposer.createInputTC({
  name: 'RestrictionsInput',
  fields: {
    pageLimit: {
      type: 'Int',
      description: 'Limit of pages a user can have',
    },
  },
});

const PlanInputArgsSchema = schemaComposer.createInputTC({
  name: 'PlanInput',
  fields: {
    name: 'String!',
    annualStripeId: {
      type: 'String!',
      description: 'Annual stripe id',
    },
    monthlyStripeId: {
      type: 'String!',
      description: 'Monthly stripe id',
    },
    restrictions: {
      type: 'RestrictionsInput',
      description: 'Object containing the restrictions for this plan, i.e. pageLimit',
    },
  },
});

const createPlanMutationArgsSchema = {
  name: 'String!',
  annualStripeId: 'String!',
  monthlyStripeId: 'String!',
  restrictions: 'RestrictionsInput',
};

const CreatePlanMutationResponse = schemaComposer.createObjectTC({
  name: 'CreatePlanMutationResponse',
  fields: {
    plan: 'Plan',
  },
});

PlanTC.addResolver({
  kind: 'mutation',
  name: 'createPlan',
  args: createPlanMutationArgsSchema,
  type: CreatePlanMutationResponse,
  // @ts-ignore anonymous function, graphql-compose didn't seem to export types nicely
  resolve: async ({ args, context }: { args: MutationCreatePlanArgs }) => {
    const plan = new Plan({
      name: args.name,
      annualStripeId: args.annualStripeId,
      monthlyStripeId: args.monthlyStripeId,
      restrictions: args.restrictions,
    });
    await plan.save();
    return {
      plan,
    };
  },
});

export { PlanTC, PlanInputArgsSchema, RestrictionsInputArgsSchema };
