import { spawnSync } from 'child_process';
import watch from 'node-watch';

const logYellow = (message: string) => {
  console.log('\x1b[33m%s\x1b[0m', message);
};
const logRedError = (message: string) => {
  console.error('\x1b[31m%s\x1b[0m', message);
};

// Run `yarn types:build` in the "Web" project.
// This uses Apollo codegen to generate Typescript types for each GraphQL operation defined
// in the frontend project and validates those types against the static schema file in the
// API project.
const buildAndValidateTypes = () => {
  logYellow('Rebuilding frontend GraphQL Typescript types.');
  const result = spawnSync('yarn', ['types:build'], { cwd: '../web' });
  result.stdout.length > 0 && console.log(result.stdout.toString());
  result.stderr.length > 0 && logRedError(result.stderr.toString());
};

// Run `yarn build:schema` in the API project.
// This will generate a new static `schema.graphql` file based on the Mongoose models.
const buildGraphQLSchema = () => {
  logYellow('Updating API schema.graphql file.');
  const result = spawnSync('yarn', ['build:schema']);
  result.stdout.length > 0 && console.log(result.stdout.toString());
  result.stderr.length > 0 && logRedError(result.stderr.toString());
};

// Start watching for Mongoose model changes in the API project.
// When a change is detected, rebuild the GraphQL schema and THEN rebuild
// and validate the frontend against the new schema file.
const apiWatcher = watch('src/features/', { recursive: true, delay: 1000 });
apiWatcher.on('change', (evt, name) => {
  logYellow(`${name} changed`);
  buildGraphQLSchema();
  buildAndValidateTypes();
});

// Start watching for changes
const webWatcher = watch('../web/src/', {
  filter: (file, skip) => {
    // If the watcher detects a modified file in the /types folder (or child folder, recursively), don't trigger an update.
    // This is necessary because the 'buildAndValidateTypes' function writes files to the /types folder and would result
    // in an endless loop.
    if (/\/types/.test(file)) {
      return skip;
    }
    // Only watch the services/schema.ts file - all GraphQL queries should be consolidated there (for now)
    // If the updated file matches this pattern, the watcher will invoke the callback (defined below with the `.on()` method).
    return /services\/schema\.ts$/.test(file);
  },
  recursive: true,
  delay: 1000,
});
webWatcher.on('change', (evt, name) => {
  logYellow(`${name} changed`);
  buildAndValidateTypes();
});

const stopAll = () => {
  apiWatcher.close();
  webWatcher.close();
};

// Kick off an initial build when this script first starts
buildGraphQLSchema();
buildAndValidateTypes();

process.on('SIGINT', stopAll);
