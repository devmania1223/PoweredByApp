import React from 'react';
import { FormProvider } from 'react-hook-form';
import { LanguageDropdown, LanguageDropdownProps } from './LanguageDropdown';

const mockFormContext = {
  criteriaMode: 'all',
  mode: 'onBlur',
  register: () => {
    return (ref: any) => {};
  },
  unregister: undefined,
  watch: undefined,
  setError: undefined,
  clearErrors: undefined,
  setValue: () => {},
  trigger: undefined,
  errors: undefined,
  formState: undefined,
  reset: undefined,
  getValues: undefined,
  handleSubmit: undefined,
  control: undefined,
};

export default {
  component: LanguageDropdown,
  title: 'Language Dropdown',
  excludeStories: [],
  decorators: [
    (Story: React.FunctionComponent) => (
      <div>
        <FormProvider {...mockFormContext}>
          <Story />
        </FormProvider>
      </div>
    ),
  ],
};

const EmptyTemplate = (args: LanguageDropdownProps) => <LanguageDropdown {...args} />;
export const Empty = EmptyTemplate.bind({});
Empty.args = {
  localLanguages: [],
  index: 0,
  updateList: (options: object) => {},
  updateLocalLanguages: (options: object) => {},
  unavailable: {},
};

const SelectedTemplate = (args: LanguageDropdownProps) => <LanguageDropdown {...args} />;
export const Selected = SelectedTemplate.bind({});
Selected.args = {
  language: 'ja',
  localLanguages: [],
  index: 0,
  updateList: (options: object) => {},
  updateLocalLanguages: (options: object) => {},
  unavailable: {},
};
