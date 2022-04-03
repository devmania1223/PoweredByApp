import CognitoIdentityServiceProvider from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { MongoClient, ObjectId } from 'mongodb';
import { config } from '../config';

/**
 * This script will completely delete a user and their associated Organization,
 * Location, Exhibit, etc from the PoweredBy db, the liiingo db, and the Cognito user pool.
 *
 * You'll need to whitelist your IP in Mongo Atlas to allow the direct db connection to the Liiingo db:
 * https://docs.atlas.mongodb.com/security/ip-access-list/#add-ip-access-list-entries
 *
 * The intended use for this is to remove a user that has been created with
 * SSO (i.e. Google, Facebook, etc) so that you can test the signup flow again with the
 * same SSO credentials without having to create another Google account.
 *
 * If you're not using an SSO user, you can just create a new test account instead of
 * deleting and re-using the same email.
 *
 * This should really only be used in the dev environment...
 *
 * THINGS THAT COULD GO WRONG
 *   - This script _may_ leave some orphaned records behind.
 *   - This script assumes that the Organization being deleted only has one App/Location and that all the Content used in that App is NOT used in any other apps.
 *     If you run this script on an Organization that has several Apps that share content from the content library, one of the apps will be deleted and all the
 *     shared content will be deleted. Probly not what you wanted.
 *
 *
 * USAGE:
 *
 *    ts-node deleteUser.ts some_email@google.com
 *
 *    Note: this script depends on some environment variables for the db connection strings.
 *          You can either set them in your system environment before running the script,
 *          or put them in your .env file and run this script with Docker to set up the environment from your .env file.
 */

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  socketTimeoutMS: 0,
  keepAlive: true,
};

// Not using config.ts because it enforces that every env var for the whole app is present, which makes it harder to run this script as a standalone CLI script.
// Also, the config doesn't include the LIIINGO_DB_CONNECTION_URL because there's no legitimate reason for Liiingo Start/Poweredby to connect directly to the
// Liiingo database. It would be sketchy to add that connection string to the app config.
const MONGO_CONNECTION_URL = process.env.MONGO_CONNECTION_URL; // This is the connection string for the Poweredby database
const LIIINGO_DB_CONNECTION_URL = process.env.LIIINGO_DB_CONNECTION_URL; // This is the connection string for the Liiingo database

if (!LIIINGO_DB_CONNECTION_URL || !MONGO_CONNECTION_URL) {
  console.error(
    "You need to add the LIIINGO_DB_CONNECTION_URL and MONGO_CONNECTION_URL values to your .env file and make sure you're running this script via docker to set up the environment.\n"
  );
  process.exit(1);
}

const args = process.argv.slice(2);
const email = args[0]; // Note: there's no validation on this, so be careful and don't code-inject your own db...
if (!email) {
  console.log('You must provide the email address of the user to delete.\n');
  process.exit(1);
}

const run = async () => {
  let poweredbyDbConnection;
  let liiingoDbConnection;

  try {
    poweredbyDbConnection = await new MongoClient(MONGO_CONNECTION_URL, options).connect();
    liiingoDbConnection = await new MongoClient(LIIINGO_DB_CONNECTION_URL, options).connect();
  } catch (error) {
    console.error(
      `\nCouldn't connect to the db: ${error}.\n\n Did you whitelist your IP in Mongo Atlas?\n See https://docs.atlas.mongodb.com/security/ip-access-list/#add-ip-access-list-entries`
    );
    process.exit(1);
  }

  let liiingoIdsToDelete = null;

  try {
    liiingoIdsToDelete = await cleanDataFromPoweredbyDb(poweredbyDbConnection.db('liiingo'));
    console.log('Completed cleaning the poweredby db');
  } catch (error) {
    console.log(`Error cleaning the poweredby db: ${error}`);
  }

  try {
    if (liiingoIdsToDelete === null) {
      await cleanDataFromLiiingoDbByEmail(liiingoDbConnection.db('ventive-liiingo-dev'), email);
    } else {
      await cleanDataFromLiiingoDb(liiingoDbConnection.db('ventive-liiingo-dev'), liiingoIdsToDelete);
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }

  poweredbyDbConnection.close();
  liiingoDbConnection.close();
};

run();

const removeUserFromCognito = async (username: string) => {
  const cognito = new CognitoIdentityServiceProvider({
    credentials: {
      accessKeyId: config.AWS_ACCESS_KEY,
      secretAccessKey: config.AWS_SECRET_KEY,
    },
    region: config.COGNITO_REGION,
  });
  return await cognito.adminDeleteUser({ Username: username, UserPoolId: config.COGNITO_USER_POOL_ID }).promise();
};

const cleanDataFromPoweredbyDb = async (db: any) => {
  const userToDelete = await db.collection('users').findOne({ email: email });
  if (!userToDelete) {
    throw new Error('no user found in poweredby db');
  }

  try {
    await removeUserFromCognito(userToDelete.username);
    console.log('User removed from Cognito\n\n');
  } catch (error) {
    console.log(`Error deleting user by username (${userToDelete.username}) in Cognito: ${error}`);
  }

  const organizationToDelete = await db.collection('organizations').findOne({ _id: userToDelete.organizationId });
  if (!organizationToDelete) {
    throw new Error('no organization found');
  }

  const locationToDelete = await db.collection('locations').findOne({ organizationId: organizationToDelete._id });
  if (!locationToDelete) {
    throw new Error('no locations found');
  }

  console.log(
    `Deleting these records from the poweredby db: ${JSON.stringify({
      user: userToDelete,
      organization: organizationToDelete,
      location: locationToDelete,
    })}\n\n`
  );

  db.collection('users').deleteOne({ _id: userToDelete._id });
  db.collection('organizations').deleteOne({ _id: organizationToDelete._id });
  db.collection('locations').deleteOne({ _id: locationToDelete._id });

  // These records need to be deleted from the Liiingo db now...
  const liiingoIdsToDelete = {
    organizationId: organizationToDelete.liiingoOrganizationId,
    locationId: locationToDelete.liiingoLocationId,
    sectionId: locationToDelete.liiingoSectionId,
    exhibitId: locationToDelete.exhibit.liiingoExhibitId,
  };

  return liiingoIdsToDelete;
};

/**
 * This function takes in a collection of Ids and attempts to delete only the matching records
 */
const cleanDataFromLiiingoDb = async (db: any, liiingoIdsToDelete: any) => {
  console.log('Cleaning liiingo db with ids from the poweredby db');

  const organizationToDelete = await db
    .collection('organization')
    .findOne({ _id: new ObjectId(liiingoIdsToDelete.organizationId) });
  if (organizationToDelete) {
    console.log(`Found organization to delete`);
  }

  const locationToDelete = await db
    .collection('location')
    .findOne({ _id: new ObjectId(liiingoIdsToDelete.locationId) });
  if (locationToDelete) {
    console.log(`Found location to delete`);
  }

  const sectionToDelete = await db.collection('area').findOne({ _id: new ObjectId(liiingoIdsToDelete.sectionId) });
  if (sectionToDelete) {
    console.log(`Found section to delete`);
  }

  const exhibitToDelete = await db.collection('exhibit').findOne({ _id: new ObjectId(liiingoIdsToDelete.exhibitId) });
  if (exhibitToDelete) {
    console.log(`Found exhibit to delete`);
  }

  let contentToDelete: any[] = [];
  if (exhibitToDelete.content?.length > 0) {
    contentToDelete = db
      .collection('content')
      .find({
        _id: {
          $in: exhibitToDelete?.content || [],
        },
      })
      .toArray();
  }

  const recordsToDelete = {
    organization: organizationToDelete,
    location: locationToDelete,
    section: sectionToDelete,
    exhibit: exhibitToDelete,
    content: contentToDelete,
  };

  console.log(`Deleting these records from the liiingo db: ${JSON.stringify(recordsToDelete)}`);

  if (contentToDelete.length > 0) {
    db.collection('content').deleteMany({
      _id: {
        $in: exhibitToDelete.content.map((id: any) => new ObjectId(id)),
      },
    });
  }

  const exhibitPromise = db.collection('exhibit').deleteOne({ _id: new ObjectId(liiingoIdsToDelete.exhibitId) });
  const areaPromise = db.collection('area').deleteOne({ _id: new ObjectId(liiingoIdsToDelete.sectionId) });
  const locationPromise = db.collection('location').deleteOne({ _id: new ObjectId(liiingoIdsToDelete.locationId) });
  const organizationPromise = db
    .collection('organization')
    .deleteOne({ _id: new ObjectId(liiingoIdsToDelete.organizationId) });

  return await Promise.all([exhibitPromise, areaPromise, locationPromise, organizationPromise]);
};

/**
 * This function finds the Liiingo Organization with the provided email address and does a cascading
 * delete through all the related data linked to that Organization
 */
const cleanDataFromLiiingoDbByEmail = async (db: any, email: string) => {
  console.log(`Cleaning data from Liiingo db by email: ${email}\n`);

  let organizationToDelete = null;
  let locationToDelete = null;
  let sectionToDelete = null;
  let exhibitToDelete = null;
  let contentToDelete = [];

  organizationToDelete = await db.collection('organization').findOne({ email: email });
  if (!organizationToDelete) {
    // If the organization wasn't found, we can't continue because we don't have a db record to start from
    throw new Error('no organization found with that email in the Liiingo db');
  }
  console.log('Found and Organization with matching email');

  locationToDelete = await db.collection('location').findOne({ organizationId: organizationToDelete._id.toString() });
  if (locationToDelete) {
    console.log('Found a liiingo location');
    sectionToDelete = await db.collection('area').findOne({ locationId: locationToDelete._id.toString() });
  }

  if (sectionToDelete) {
    console.log('Found a liiingo section');
    exhibitToDelete = await db.collection('exhibit').findOne({ areaId: sectionToDelete._id.toString() });
  }

  if (exhibitToDelete) {
    console.log('Found a liiingo exhibit');
    try {
      contentToDelete = await db
        .collection('content')
        .find({
          _id: {
            $in: (await exhibitToDelete).content.map((id: any) => new ObjectId(id)),
          },
        })
        .toArray();
    } catch (error) {
      console.log(`No content found, skipping`);
    }
  }

  const recordsToDelete = {
    organization: organizationToDelete,
    location: locationToDelete,
    section: sectionToDelete,
    exhibit: exhibitToDelete,
    content: contentToDelete,
  };

  console.log(`Deleting these records from the liiingo db: ${JSON.stringify(recordsToDelete)}`);

  if (contentToDelete.length > 0) {
    db.collection('content').deleteMany({
      _id: {
        $in: (await exhibitToDelete).content.map((id: any) => new ObjectId(id)),
      },
    });
  }

  const exhibitPromise = recordsToDelete.exhibit
    ? db.collection('exhibit').deleteOne({ _id: new ObjectId(recordsToDelete.exhibit._id) })
    : Promise.resolve();
  const areaPromise = recordsToDelete.section
    ? db.collection('area').deleteOne({ _id: new ObjectId(recordsToDelete.section._id) })
    : Promise.resolve();
  const locationPromise = recordsToDelete.location
    ? db.collection('location').deleteOne({ _id: new ObjectId(recordsToDelete.location._id) })
    : Promise.resolve();
  const organizationPromise = recordsToDelete.organization
    ? db.collection('organization').deleteOne({ _id: new ObjectId(recordsToDelete.organization._id) })
    : Promise.resolve();

  return await Promise.all([exhibitPromise, areaPromise, locationPromise, organizationPromise]);
};
