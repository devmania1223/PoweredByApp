/* eslint-disable no-multi-assign,prefer-const */
import { UserModel, User } from '../src/features/users/model';
import { Organization } from '../src/features/organizations/model';
import { WHITE_LABEL_TEMPLATE_NAME } from '../src/util/constants';

export const restartCounters = () => {
  // @ts-ignore
  global.__COUNTERS__ = Object.keys(global.__COUNTERS__).reduce((prev, curr) => ({ ...prev, [curr]: 0 }), {});
};

export const createUser = async (payload = {}): Promise<UserModel> => {
  // @ts-ignore
  const n = (global.__COUNTERS__.user += 1);
  const provider = await new Organization().save();
  const user = new User({
    name: `Normal user ${n}`,
    email: `user-${n}@example.com`,
    password: '123456',
    phone: '555-123-1234',
    active: true,
    organizationId: provider._id,
    templateId: WHITE_LABEL_TEMPLATE_NAME,
    ...payload,
  }).save();

  return user;
};
