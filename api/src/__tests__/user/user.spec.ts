import { gql } from 'apollo-boost';

import { connectMongoose, clearDbAndRestartCounters, disconnectMongoose, client } from '../../../test/helper';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

describe('Register Mutation', () => {
  it.skip('should register a user successfully', async () => {
    const mutation = gql`
            mutation register {
                register(email: "user${Math.random()}@example.com", phone: "(555)-123-1234", password:"password123", name: "Generic Userman",
                type: "PROVIDER")
            }`;
    const response = await client.mutate({
      mutation,
    });
    expect(response).not.toBe(null);
  });
});
