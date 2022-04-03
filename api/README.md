## Get started:

If you're running this outside of Docker, you'll need to have a MongoDB running somewhere on port 27017

```
yarn
yarn start
```

## Run tests:

```
yarn start
yarn test
```

or

```
yarn start
yarn run test:watch
```

Development server needs to be running on background because as it stands, the tests are connecting to the development database.

GraphQL queries can be tested by opening `http://localhost:4000/graphql`. Example queries can be found from index.test.ts.

## Directory structure

Follows a **model-controller-service** pattern meaning the directory/file structure inside the `features` directory is:

- <feature / resource name e.g. posts>

  - **model.ts** defines all MongoDB models this feature needs along with their Typescript interfaces.
    Mongo models are similar but distinctly separate from the GraphQL typedefs that define the outward-facing api schema.

  - **typedefs.ts** defines the GraphQL types that comprise this feature.
    The typedefs are built from the Mongo models using `graphql-compose-mongoose` and are customized in this file.

  - **resolvers.ts** defines the top-level GraphQL schema by adding fields to
    the Query and Mutation Types to support this feature.
