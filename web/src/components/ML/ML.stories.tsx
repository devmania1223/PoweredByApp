import React from 'react';
import { MultilanguageDrawer, MultilanguageDrawerProps } from './MLDrawer';

export default {
  component: MultilanguageDrawer,
  title: 'Multilanguage',
  excludeStories: [],
  decorators: [],
};

const DrawerTemplate = (args: MultilanguageDrawerProps) => <MultilanguageDrawer {...args} />;
export const Drawer = DrawerTemplate.bind({});
Drawer.args = {
  open: true,
  setOpen: () => {},
  primary: 'en',
  supported: ['en', 'es', 'ja'],
  addLanguages: (languages: string) => {},
  removeLanguage: (languages: string) => {},
  changePrimary: (languages: string) => {},
  saveLanguages: () => {},
};
