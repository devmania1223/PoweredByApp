import Form from './Form';
import themeOptions from './theme';
import logo from './logo.png';
import { DehydratedTemplateModule } from '../templateTypes';

const templateModule: DehydratedTemplateModule['default'] = {
  Form,
  themeOptions,
  logo,
  contentMap: {},
};

export default templateModule;
