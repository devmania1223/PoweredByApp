import { ensureFile, writeFileSync } from 'fs-extra';
import { join } from 'path';
import { graphql } from 'graphql';
import { getIntrospectionQuery, printSchema } from 'graphql/utilities';
import Schema from '../features';
import { spawnSync } from 'child_process';

async function buildSchema() {
  await ensureFile('src/data/schema.graphql.json');
  await ensureFile('src/data/schema.graphql');

  writeFileSync(
    join(__dirname, '../data/schema.graphql.json'),
    JSON.stringify(await graphql(Schema, getIntrospectionQuery()), null, 2)
  );

  writeFileSync(join(__dirname, '../data/schema.graphql'), printSchema(Schema));
}

async function run() {
  await buildSchema();
  console.log('schema.graphql file generated!');

  const result = spawnSync('yarn', ['codegen']);
  console.log('Typescript definitions for GraphQL schema written to schema.ts');
}

run().catch((e) => {
  console.log(e);
  process.exit(0);
});
