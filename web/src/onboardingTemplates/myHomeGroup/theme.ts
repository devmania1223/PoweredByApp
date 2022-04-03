import { ThemeOptions } from '@material-ui/core/styles/createTheme';

const colors = {
  red: '#cc3333', // TODO: get the actual shade of red from myhomegroup style guide
  grayDark: '#49525D',
  pureWhite: '#ffffff',
};

const themeOptions: ThemeOptions = {
  palette: {
    contrastThreshold: 3,
    primary: {
      main: colors.red,
      contrastText: colors.pureWhite, // This color is used automatically when contrastThreshold < 2, but we're being explicit to avoid unintentional changes
    },
    secondary: {
      main: colors.grayDark,
      contrastText: colors.pureWhite, // This color is used automatically when contrastThreshold < 2, but we're being explicit to avoid unintentional changes
    },
  },
};

export default themeOptions;
export { colors };
