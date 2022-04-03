# PoweredBy

"Powered By Liiingo" creates a white-label onboarding experience for franchise businesses that want to allow
their franchisees to create their own Liiingo apps from a branded template. In addition to custom branding,
custom forms can be added to the onboarding workflow to populate the franchise's specific app template.

## Getting Started

This is a monorepo for the PoweredBy site, which contains both backend and frontend application code along with
dockerfiles and a docker-compose configuration for local development.

The root of this project has a `package.json` file that defines a few scripts to help get the local
dev environment set up.

**NOTE / PREREQUISITES**:

Although this project is Dockerized, the local-dev experience requires that you have NodeJS and Yarn installed
on your host machine. This allows you to modify your node_modules without having to rebuild the docker containers
during development, but also means that you need to be a little bit careful about using the correct version of
node on your host machine. The nodejs version is documented in the `api/.nvmrc` and `web/.nvmrc` files.

**WINDOWS USERS**
Python is required to load environment variables. Once python is installed, you'll need to install `load_dotenv`:

```
pip install python-dotenv
```

> _NOTE_: There's no npm dependencies in the top-level project's `package.json` file.
> Running `yarn install` will just clutter up your project with an empty `node_modules` folder.

1.  Clone this repo and enter the project root folder

        git clone <this repo url>
        cd <new folder>

2.  Before you can start up the full application stack, you'll
    need a local `.env` file in the project root.
    This file defines a few values that the app needs in order to run (like the mongodb username/password).

    The `.env.example` file provides working values for the local
    dev environment and can just be copied into a `.env` file to
    prepare the local dev environment. A script is provided that does this automatically:

        ./initenv

    This script will also run `yarn` in each of the project folders to install `node_modules` for each project.

3.  Run the full stack locally using the npm scripts in the root folder:

    The app will be viewable at http://localhost:1234

        yarn start

    **OR**

    Run just the frontend Storybook to see React component documentation and examples:

    The Storybook will be viewable at http://localhost:6006

        yarn storybook

4.  If your database is fresh, you'll need to seed it with some template data. Each template in the `web/src/onboardingTemplates` folder needs a corresponding db entry in order for the URL routing and dynamic template-loading to work. You can create the correct db entries by running the GraphQL mutation in the [Setting Up A New Onboarding Flow](#setting-up-a-new-flow) section below.

5.  You can stop the docker containers in the terminal with `ctrl + C`. This will free up your local ports and a bunch of RAM if you need to run a different project.

6.  If you want to destroy the docker containers, run this in the main project folder:

        yarn down

    This will tear down the application containers, but will leave the Docker `networks` and `volumes` in place. This means that next time you `yarn start`, your database will still
    have all of your data in it (which is _usually_ what you want...).

7.  And if you need a big hammer, you can completely destroy all traces of the Dockerized project environment (including the database volume)

        yarn down
        docker volume rm poweredby_data-volume
        docker network rm poweredby_default

## Modules

### API

This is a Koa-based GraphQL implementation. It will assume there is a MongoDB datastore available.

### Web

This is a ReactJS app built by Parcel

## Environment Variables

When the Docker containers for each module are built, they expect a `.env` file to be present in the project root folder.
A `.env.example` file is provided with this repo, but doesn't include all the values necessary to get up and running - you'll need to populate
all the missing values to get full functionality from the frontend and backend.

Here's some incomplete documentation on the env variables:

### GOOGLE_TAG_MANAGER_ID

This corresponds with a GTM "Container". When you're logged into Google Tag Manager, the Container ID is visible on the "All Accounts" page.

### GOOGLE_TAG_MANAGER_ENVIRONMENT_AUTH

The LiiingoStart "Container" in GTM only has a single environment defined ("Live" - there is no Pre-prod" for this project).

### GOOGLE_TAG_MANAGER_ENVIRONMENT_PREVIEW

This value also identifies a specific environment for a GTM Container. Find the GTM
"snippet" using the instructions for the `GOOGLE_TAG_MANAGER_ENVIRONMENT_AUTH` value
but look for this value:

```
&gtm_preview=env-3
```

The portion _after_ the `=` is the value that should be set in the `.env` file.

## K8s management

If you need to change secrets in k8s, here's some recipes:

(These snippets use the `poweredby-dev` namespace, but you can change that to `poweredby-prod` if needed)

**View the env on a specific pod:**

```
# view pods (in the dev namespace)
kubectl get pods poweredby-api -n poweredby-dev

# get current env (you'll need to update the pod name)
kubectl exec --stdin --tty -n pave-dev pave-api-754c5b44df-8jb4w  -- printenv
```

**Update secrets:**

```
# Pull a copy of the secrets file to your local machine:
kubectl get secret poweredby-envsecrets -o yaml > poweredby-envsecrets.yaml -n poweredby-dev

# Edit the secrets...
vim poweredby-envsecrets.yaml (... vim not required, I guess)

# Apply the changes to the cluster (make sure they're all base64 encoded!)
kubectl apply -f poweredby-envsecrets.yaml -n poweredby-dev

# restart pods after secrets have been edited
kubectl rollout restart -n poweredby-dev deployment/poweredby-web
kubectl rollout restart -n poweredby-dev deployment/poweredby-api
```

**If you must yolo, you can edit secrets directly in the cluster**

_(but base64 encode/decode is slightly more cumbersome)_

```
kubectl edit secret poweredby-envsecrets -n poweredby-dev
```

## <a name="setting-up-a-new-flow"></a> Setting Up A New "Onboarding Flow"

You can describe an "Onboarding Flow" like this:

> _When a user registers for an app by visiting **this route**, create their new app using **this template** and send the bill to **this Organization** by updating **this Stripe subscription**_

An "Onboarding Flow" is a combination of 3 things:

1. An **Organization** (which is also a Stripe Customer)
2. A Stripe Subscription ID.
   - This subscription is updated whenever a new user signs up for or cancels their app using this Onboarding Flow. For example, an organization might have 3 apps that use were created using the same onboarding flow. When a 4th person signs up using this same onboarding flow, the Stripe subscription (recurring billing) is updated to bill for 4 apps instead of 3.
3. A **Template** (currently, we only support "AppOnboardingTemplate"s, which create a whole new App/Location, not just a Section or Topic)
   - The Template is recorded in the database with a **Name**, path to the **Code Module**, and **Stripe Product Code** (think of this as a product that clients can purchase).
   - The **Code Module** for each Template is a javascript module that lives in the `web/src/onboardingTemplates` folder and exports a **Form**, **Theme**, and **Logo** image.

Each Onboarding Flow has a database entry in the `onboardingFlows` mongodb collection.

- This db entry associates a URL route, an Organization, a Template, and a Stripe subscription ID.

### To create a new Onboarding Flow

1. **Create a Stripe Product** to represent one of the apps that will be created by this onboarding flow. For example, if this onboarding flow creates apps for a multi-level marketing conglomerate named "Pickle Products Unlimited", then you might create a new Stripe Product named "Pickle Products App" that has a price of $50/month. Write down the Price ID - you'll need it in a minute.
   If this is for the 'dev' environment, make sure you're creating the Stripe product in Stripe's "Test Data" section.

2. Create a new Liiingo Organization via the Admin Panel that will contain the shared "template" content that will show up as additional Sections in every app. This will be the "parent" Organization. Each app that gets created with this Onboarding Flow will belong to a different Organization (the "child" org) that we're going to create in the next step. The Client will get billed for the number of apps that exist in the child org, which does _not_ include the template content itself.

3. Create the "child" org to house all of the apps that get created by this Onboarding Flow. You can send this GraphQL mutation to the Liiingo Start ("poweredby") API to create a new Onboarding Flow:
   - For local dev, send this request to `http://localhost:4000/graphql`
   - For production, send to `https://start.liiingo.com/graphql`

.

    mutation createFlow(
        $orgName: String!
        $orgEmail: String!
        $route: String!
        $template: AppOnboardingTemplateInput!
    ) {
        createTemplatedAppOnboardingFlow(
            organizationName: $orgName
            organizationEmail: $orgEmail
            onboardingRoute: $route
            onboardingTemplate: $template
        ) {
            appOnboardingFlow {
                _id
                route
                organization {
                    _id
                    stripeCustomerId
                }
                template {
                    name
                    stripeProductCode
                    codeModule
                }
            }
        }
    }

with these variables:

    {
        "orgName": "ZU-(Demo) My Home Group - <YOUR_NAME>",
        "orgEmail": "<YOUR_EMAIL>+myhomegroup-dev@liiingo.com",
        "route": "myhomegroup",
        "template": {
            "codeModule": "myHomeGroup",
            "name": "My Home Group (dev)",
            "stripeProductCode": "price_1ISnlhC8BvMYvOOAe3CawQ9y"
        }
    }

**_NOTE_**

**Super Important**

**Don't skip this part!**

For now, this mutation will create a new Liiingo Organization that extends _itself_!
The code needs to be updated so that the mutation accepts the Organization ID of the "parent" org that you created in the Admin panel and sets up the child org to extend _*that*_ org instead.

In the the meantime, you'll need to get into the Liiingo Admin panel after running this
mutation and edit the child Organization. On the Organization settings page, change the
"Extended Organization Name" and "Extended Organization App Name" to reference the correct 'parent' Org.

## Create a new _Org_ OnboardingFlow

An "OrgOnboardingFlow" creates a route that will result in a new Organization being created for
each user who signs up at that route. This means that the user will be paying their own bill,
which is different than the "App" OnboardingFlow above where each SignUp results in a new "App" being
created within an existing Organization.

**Use this mutation to create an OrgOnboardingRoute**

```
mutation createOrgFlow(
  $route: String!
  $template: AppOnboardingTemplateInput!
) {
  createTemplatedOrgOnboardingFlow(
    onboardingRoute: $route
    onboardingTemplate: $template
  ) {
    orgOnboardingFlow {
      _id
      route
      organization {
        _id
        stripeCustomerId
      }
      template {
        name
        stripeProductCode
        codeModule
        templatedContent {
          app {
            topicBackgroundImageUrl
          }
          topic {
            liiingoContentType
            languages {
              en {
                name
                value
              }
          }
        }
      }
    }
  }
}

```

**Variables**

```
{
  "route": "forequestrians",
  "template": {
    "codeModule": "liiingo",
    "name": "Liiingo for Equestrians",
    "stripeProductCode": "price_1JSOofC8BvMYvOOA3J5MH3BJ",
    "templatedContent": {
      "app": {
        "topicBackgroundImageUrl": "https://poweredby-dev-templates.s3-us-west-2.amazonaws.com/one/cleandesk.jpg"
      },
      "topic": [
              {
        "liiingoContentType": "image",
        "languages": {
          "en": {
            "name": "Spotlight Image",
            "value": "https://poweredby-dev-templates.s3-us-west-2.amazonaws.com/one/supdawg.jpg"
          }
        }
      },
      {
        "liiingoContentType": "text",
        "languages": {
          "en": {
            "name": "Text Blurb",
            "value": "🎉 Congratulations!🎉 Your app is live!. Start customizing in the App Editor to make this puppy shine 🐶🌟 "
          }
        }
      },
      {
        "name": "Customize it!",
        "liiingoContentType": "webview",
        "value": "https://dev-start.liiingo.com/essentials"
      }
      ]
    }
  }
}
```

#^ Need to go over these instructions again. May need updated/expanded

---

## Troubleshooting

Did you skip the last step above? The one that says "Don't skip this part!" ?

--

**I can't pull images from Docker hub**

Try updating the DNS server address that your host machine is using to `1.1.1.1` (CloudFlare) or `8.8.8.8` (Google)

--

**When I run `yarn start`, the `web` Docker container fails to start with an error
message that says `parcel not found`**

This will happen if you haven't run `yarn` in the `web` project folder before
attempting to run the project. Do this:

    cd web
    yarn

But **DON'T** run `yarn start` from inside the `web folder` - that will actually
build and run the frontend project on your host machine instead of inside the
Docker build container and it will conflict with the Dockerized build when you
attempt to run `yarn start` from the main project folder later on.

## TypeScript issues

TypeScript is wonderful and all, but sometimes it'll have you spinning your wheels trying to figure why it won't compile.

I found this answer during one such quest.
(sic)

    If the code works in JS but fails only because of typing in TypeScript, I'd suggest you to use "any" to ignore it:

    Now you're going to ask me: but why??? What is all the point of TypeScript if you just bypass problems whenever you like.

    The reason for that is that if you are doing this for work, you need to consider the value of fighting with the type system all the time:

    Either it helps you avoiding mistaking, making development easier, that's the real motivation for strict typing
    Either it plays against you, preventing you doing something legal in JS, it won't make your code more robust because the code in question is something you never really touch (in other words: if using the right typing doesn't change anything in the outcome)

    TypeScript has been invented with flexibility in mind and that makes its true power when interoperating with JS libraries. Using perfect and strict typing everywhere makes sense only with languages that have been designed that way from the beginning and this is not the case for JS.

    Now don't get me wrong. I'm pretty sure there is a solution to your problem. My reasoning is more about: do you actually need to solve it? Will it brings something useful to your application? Sometimes it doesn't worth it.

🙇 🙇 🙇

https://stackoverflow.com/a/52686505/15566601
