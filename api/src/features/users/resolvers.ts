/**
 * This file defines fieldDefinitions that can be invoked from Parent types, i.e. 'entrypoints' to the User Type.
 * Resolvers for fields of the User type should not be defined here - those should live in the 'typedefs' file instead.
 */
import { UserTC } from './typedefs';
import { authMiddleware, canAccessUsersByOrganization, userMustBeSelf } from '../../middleware/auth';

const UserQuery = {
  userById: UserTC.getResolver('findById', [userMustBeSelf]),
  user: UserTC.getResolver('findOne'),
  userConnection: UserTC.getResolver('connection', [canAccessUsersByOrganization]),
};

const UserMutation = {
  register: UserTC.getResolver('register', [authMiddleware]),
  registerNewOrg: UserTC.getResolver('registerNewOrg', [authMiddleware]),
  inviteUser: UserTC.getResolver('inviteUser', [authMiddleware]),
  closeAccount: UserTC.getResolver('closeAccount', [authMiddleware]),
  userUpdateOne: () => {
    const resolver = UserTC.getResolver('updateOne', [userMustBeSelf]);
    resolver.getArgITC('filter').removeOtherFields('sub');
    return resolver;
  },
};

export { UserQuery, UserMutation };
