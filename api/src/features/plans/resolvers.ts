import { PlanTC } from './typedefs';

export const PlanMutations = {
  createPlan: PlanTC.getResolver('createPlan'),
};

export const PlanQueries = {
  planById: PlanTC.getResolver('findById'),
  planByName: PlanTC.getResolver('findOne').wrap((newResolver) => {
    newResolver.setArgs({
      name: 'String!',
    });

    return newResolver.wrapResolve((next) => (resolveParams) => {
      const newResolveParams = {
        ...resolveParams,
        args: {
          filter: { name: resolveParams.args.name },
        },
      };
      return next(newResolveParams);
    });
  }),
};
