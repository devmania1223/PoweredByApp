import React from 'react';
import { useOnExhibitSubmit } from '../hooks/useOnExhibitSubmit';
import { DehydratedTemplateModule, HydratedTemplateModule } from './templateTypes';

/**
 * Modules loaded by this function are expected to have a very specific shape (TemplateModule type).
 * An object that matches the TemplateModule type must be exported as the default export.
 *
 * @param templateName The path to an importable local module.
 */
export const importTemplateModule: (templateName?: string) => Promise<DehydratedTemplateModule['default']> = async (
  templateName
) => {
  let templateModule: DehydratedTemplateModule;
  try {
    switch (templateName.toLowerCase()) {
      case 'idahofallsfarmers':
        templateModule = await import('./idahofallsfarmers');
        break;
      case 'myhomegroup':
        templateModule = await import('./myHomeGroup');
        break;
      case 'liiingo':
        templateModule = await import('./liiingo');
        break;
      // case 'liiingoone':
      //   templateModule = await import('./liiingoOne');
      //   break;
      case 'liiingoessentials':
        templateModule = await import('./liiingoEssentials');
        break;
      default:
        templateModule = await import('./templateNotFound');
        break;
    }
  } catch (e) {
    templateModule = await import('./templateNotFound');
  }

  return templateModule.default;
};

/**
 * "Hydrating" a TemplateModule means that we will:
 *   - Create a MUI Theme instance from the themeOptions (by calling createMuiTheme(themeOptions) )
 *   - Inject a pre-made mutation function into the Template Form so that the form can make authenticated calls to the correct 'Topic/Exhibit' graphql mutation
 */
export const hydrateTemplateModule = (dehydratedTemplateModule: DehydratedTemplateModule['default']) => {
  console.log(`Hydrating module`, dehydratedTemplateModule);
  const hydratedTemplateModule: HydratedTemplateModule = {
    ...dehydratedTemplateModule,
    theme: dehydratedTemplateModule.themeOptions,
    FormWithApollo: (props) => <dehydratedTemplateModule.Form useOnExhibitSubmit={useOnExhibitSubmit} {...props} />,
  };

  return hydratedTemplateModule;
};
