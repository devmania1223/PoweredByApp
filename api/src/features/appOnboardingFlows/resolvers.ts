import { AppOnboardingFlowTC } from './typedefs';

export const AppOnboardingFlowMutations = {
  // FIXME: Don't ship this to prod
  createTemplatedAppOnboardingFlow: AppOnboardingFlowTC.getResolver('createTemplatedAppOnboardingFlow'),
  createTemplatedOrgOnboardingFlow: AppOnboardingFlowTC.getResolver('createTemplatedOrgOnboardingFlow'),
};

export const AppOnboardingFlowQueries = {
  flows: AppOnboardingFlowTC.getResolver('findMany'),
  appOnboardingFlowByRoute: AppOnboardingFlowTC.getResolver('findOne').wrap((newResolver) => {
    // Remove all the default args from the InputType and replace with a single 'route' arg
    newResolver.setArgs({
      route: 'String!',
    });

    return newResolver.wrapResolve((next) => (resolveParams) => {
      const newResolveParams = {
        ...resolveParams,
        args: {
          filter: { route: resolveParams.args.route },
        },
      };
      return next(newResolveParams);
    });
  }),
};
