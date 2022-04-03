import { schemaComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { EssentialTemplate } from './model';

const EssentialTemplateTC = composeWithMongoose(EssentialTemplate);

const EssentialTemplateInputArgsSchema = schemaComposer.createInputTC({
  name: 'EssentialTemplateInput',
  fields: {
    name: 'String!',
    stripeProductCode: {
      type: 'String!',
      description:
        'This is actually referred to as a "Price" in the Stripe Dashboard and looks like this: price_1IrDFwC8BvMYvOOAZXyvDnaG',
    },
    templateId: {
      type: 'String!',
      description: 'The locationId of the template app',
    },
  },
});

export { EssentialTemplateTC, EssentialTemplateInputArgsSchema };
