import { DocBase } from '../collection/DocBase';

export interface User extends ReturnType<typeof newUser> {}

export const newUser = (fetchedUser: any) => {
  const _user = new _User(fetchedUser);
  const user = JSON.parse(JSON.stringify(_user)); // serialized-converted User
  return user;
};
export class _User extends DocBase {
  // eslint-disable-next-line
  constructor(data?: any) {
    super(data);
  }
}
