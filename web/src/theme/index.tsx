//import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { createTheme as createMuiTheme } from '@material-ui/core/styles';
import { componentOverrides } from './components';
import { palette } from './palette';
import { typography } from './typography';

const theme = createMuiTheme({
  palette: palette,
  typography: typography,
  shape: {
    borderRadius: 8,
  },
  // while the MUI library supports 25 levels of shadow, our design system only uses 5 (0-4)
  // @ts-ignore
  shadows: [
    'none',
    '0px 1px 4px 0px rgba(24, 27, 32, 0.2)',
    '0px 2px 8px 0px rgba(24, 27, 32, 0.2)',
    '0px 4px 16px 0px rgba(24, 27, 32, 0.2)',
    '0px 6px 24px 0px rgba(24, 27, 32, 0.2)',
  ],
  overrides: componentOverrides,
});

export { theme };
