import * as mongoose from 'mongoose';
import { clearDbAndRestartCounters, connectMongoose, createRows, disconnectMongoose } from '../../../test/helper';
import { User } from '../../features/users/model';
import { generateToken, getUser } from '../../middleware/auth';

const { ObjectId } = mongoose.Types;

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

describe('getUser', () => {
  it('should return an user null when token is null', async () => {
    const token = null;
    const user = await getUser(token);

    expect(user).toBe(null);
  });

  it('should return null when token is invalid', async () => {
    const token = 'invalid token';
    const user = await getUser(token);

    expect(user).toBe(null);
  });

  // it('should return null when token do not represent a valid user', async () => {
  //   const token = await generateToken({ _id: new ObjectId(), type: 'PROVIDER', typeId: new ObjectId() }, {});
  //   const user = await getUser(token);

  //   expect(user).toBe(null);
  // });

  it('should return user from a valid token', async () => {
    const me = await createRows.createUser();
    const token = await generateToken(me, {});
    const user = (await getUser(token)) || new User();

    expect(user.firstName).toBe(me.firstName);
    expect(user.email).toBe(me.email);
  });
});
