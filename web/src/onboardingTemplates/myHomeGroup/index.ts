import { DehydratedTemplateModule } from '../templateTypes';
import favicon from './favicon.png';
import Form, { contentMap } from './Form';
import logo from './logo.png';
import themeOptions from './theme';

const templateModule: DehydratedTemplateModule['default'] = {
  Form,
  themeOptions,
  logo,
  favicon,
  contentMap,
};

export default templateModule;
