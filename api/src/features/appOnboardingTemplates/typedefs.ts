import { schemaComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { AppOnboardingTemplate } from './model';

const AppOnboardingTemplateTC = composeWithMongoose(AppOnboardingTemplate);

const AppOnboardingTemplateInputArgsSchema = schemaComposer.createInputTC({
  name: 'AppOnboardingTemplateInput',
  fields: {
    name: 'String!',
    stripeProductCode: {
      type: 'String!',
      description:
        'This is actually referred to as a "Price" in the Stripe Dashboard and looks like this: price_1IrDFwC8BvMYvOOAZXyvDnaG',
    },
    codeModule: {
      type: 'String!',
      description: 'An npm-style package name that points to the javascript template, i.e. @liiingo/myTemplate',
    },
    templatedContent: {
      type: 'TemplatedContentInput',
      description:
        "Any content in this collection will automatically get added to each new app that's created from this template",
    },
  },
});

const TemplatedContentInputArgsSchema = schemaComposer.createInputTC({
  name: 'TemplatedContentInput',
  fields: {
    app: {
      type: 'TemplatedAppContentInput',
    },
    topic: {
      type: '[TemplatedExhibitContentInput]',
    },
  },
});

const TemplatedAppContentInputArgsSchema = schemaComposer.createInputTC({
  name: 'TemplatedAppContentInput',
  fields: {
    topicBackgroundImageUrl: 'String',
  },
});

const TemplatedExhibitContentInputArgsSchema = schemaComposer.createInputTC({
  name: 'TemplatedExhibitContentInput',
  fields: {
    name: {
      type: 'String!',
      description:
        "The name that you assign to this content here MUST MATCH the name of the form field that's used in the template's Form.tsx component or else the content won't be editable on the template form.",
    },
    liiingoContentType: 'EnumLocationExhibitTemplatedContentLiiingoContentType!',
    value: {
      type: 'String!',
      description:
        'For images, this field should contain the publicly-accessible URL for the image (i.e. in S3). For webview buttons, this field should contain the URL to open when the button is clicked. For text, figure it out.',
    },
  },
});

export { AppOnboardingTemplateTC, AppOnboardingTemplateInputArgsSchema, TemplatedContentInputArgsSchema };
