import { ApolloError } from '@apollo/client/errors';
import { ThemeOptions } from '@material-ui/core/styles';
import { ReactNode } from 'react';
import { OnboardingFlowContextType } from '../context/OnboardingFlowContext';
import { useOnExhibitSubmit } from '../hooks/useOnExhibitSubmit';
import { EnumLocationExhibitTemplatedContentLiiingoContentType } from '../types/globalTypes';
import { Location_location_exhibit_templatedContent } from '../types/Location_location_exhibit';

/**
 * The Template is an API response. It does not include actual React components.
 */
//export type Template = Omit<getAppOnboardingFlowByRoute_appOnboardingFlowByRoute_template, '_id' | '__typename'>;

export type ContentMap = {
  [key: string]: {
    name: string;
    liiingoContentType: EnumLocationExhibitTemplatedContentLiiingoContentType;
  };
};

/**
 * The DehydratedTemplateModule contains the React Form and MuiTheme Options that can be rendered to the page.
 * OnboardingTemplate modules should use this type as their default export, like this:
 *
 *    export default {
 *      Form,
 *      themeOptions,
 *      logo,
 *    }
 *
 * This is considered "dehydrated" because the themeOptions still need to be turned into a Mui 'Theme' object and
 * the Form will have an Apollo Client instance injected.
 *
 * The individual pieces can be referenced after importing the module like this:
 *
 *    const myModule = import('./myModule');
 *    const { Form, logo, themeOptions } = myModule.default;
 */
export type DehydratedTemplateModule = {
  default: {
    favicon?: any;
    logoWhite?: any;
    Form: TemplateForm;
    contentMap: ContentMap;
    logo: any; // TODO: what's the right Type for an image 🤔
    themeOptions: ThemeOptions; // This is a config object that can be handed to createMuiTheme() - NOT an actual MuiTheme
  };
};

export type HydratedTemplateModule = {
  FormWithApollo: (props: HydratedTemplateFormProps) => JSX.Element; // This form has the Apollo client already injected, so it no longer accepts a 'client' prop
  contentMap: ContentMap;
  theme: ThemeOptions; // The theme is hydrated by calling createMuiTheme(themeOptions)
} & DehydratedTemplateModule['default'];

/**
 * A LoadedTemplate is a combination of the Template API response and the hydrated 'module'
 */
/*
 export type LoadedTemplate = Template & {
   module: HydratedTemplateModule;
 };
 */

export interface TemplateFormProps {
  appOnboardingFlow: Partial<OnboardingFlowContextType>;
  onError?: (error: string | ApolloError) => void;
  onSuccess?: () => void;
  onCancel?: () => void;
  submitButtonLabel?: ReactNode;
  cancelButtonLabel?: ReactNode;
  setIsLoading?: (isLoading: boolean) => void;
  liiingoContent?: Location_location_exhibit_templatedContent[];
  useOnExhibitSubmit: typeof useOnExhibitSubmit; // right?
  locationId: string;
  index?: string;
}
export type TemplateForm = (props: TemplateFormProps) => JSX.Element;

/**
 * After the useLocationMutation hook has been injected during the hydration process, the
 * 'useLocationMutation' prop is no longer necessary on the Form
 */
export type HydratedTemplateFormProps = Omit<TemplateFormProps, 'useOnExhibitSubmit'>;
