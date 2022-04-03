import { LocationTC } from './typedefs';

const LocationQueries = {
  getLocationById: LocationTC.getResolver('findById'),
};

const LocationMutations = {
  locationUpdateOne: LocationTC.getResolver('locationUpdateOne' /*, [canAccessLocation]*/), // TODO: add some authZ to protect this mutation
};

export { LocationQueries, LocationMutations };
