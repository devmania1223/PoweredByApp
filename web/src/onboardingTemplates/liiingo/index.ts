import logo from '../templateNotFound/logo.png'; // <-- If the logo is acting weird, note that it comes from a different module... just reducing the number of png's in the repo...
import { DehydratedTemplateModule } from '../templateTypes';
import Form from './Form';
import themeOptions from './theme';

const templateModule: DehydratedTemplateModule['default'] = {
  Form,
  themeOptions,
  logo,
  contentMap: {},
  // the favicon will be pulled in from the default theme so we don't need to keep 2 copies in the repo
};

export default templateModule;
