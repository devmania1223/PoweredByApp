// https://www.figma.com/file/jNL8pygV4Ts1mLkWLUIkEN/00.-Liiingo-Design-System?node-id=1130%3A2357
export const colors = {
  //Primary
  grayDark: '#49525D',
  grayDark20: '#dbdcdf',
  grayDark5: '#f6f6f7',
  grayLight: '#92A0AC',
  grayLight20: '#E9ECEE',
  grayLight5: '#FAFAFB',
  //Accents
  purpleAccent: '#662D8E',
  purpleAccent20: '#E0D5E8',
  navyAccent: '#142648',
  navyAccent20: '#D0D4DA',
  hotPurpleAccent: '#815CFF',
  hotPurpleAccent20: '#E6DEFF',
  tealAccent: '#59C9E6',
  tealAccent20: '#def4fa',
  blueAccent: '#295AFA',
  blueAccent20: '#D4DEFE',
  //Neutral
  neutralDark: '#181B20',
  //Success
  greenDark: '#6DB554',
  greenLight: '#E2F0DD',
  //Error
  redDark: '#DC4C4C',
  redLight: '#F8DBDB',
  //Warning
  orangeDark: '#EE9B3B',
  orangeLight: '#FCEBD8',
  //Information
  blueDark: '#4C6CDC',
  blueLight: '#DBE2F8',

  mediumGray: '#8a9cb1',
  grayMedium: '#C8CBCE',
  graySecondaryLight: '#E9ECEE',
  pureWhite: '#FFFFFF',
  pureBlack: '#000000',

  btnBack: '#DBDCDF',
};

export const palette = {
  // contrastThreshold determines how dark a background color needs to be before the 'contrastText' color is used.
  // A lower threshold (smaller number) results in contrastText being used on lighter backgrounds.
  contrastThreshold: 3,
  tonalOffset: 0.6,
  primary: {
    main: colors.purpleAccent,
    contrastText: colors.pureWhite, // This color is used automatically when contrastThreshold < 2, but we're being explicit to avoid unintentional changes
  },
  secondary: {
    main: colors.tealAccent20,
    contrastText: colors.tealAccent, // This color is used automatically when contrastThreshold < 2, but we're being explicit to avoid unintentional changes
  },
  action: {
    disabledBackground: colors.grayDark20,
    disabled: colors.grayDark5,
  },
  error: {
    main: colors.redDark,
    contrastText: colors.neutralDark,
  },
  warning: {
    main: colors.orangeDark,
    contrastText: colors.neutralDark,
  },
  info: {
    main: colors.blueDark,
    contrastText: colors.neutralDark,
  },
  success: {
    main: colors.greenDark,
    contrastText: colors.neutralDark,
  },
  background: {
    default: colors.grayLight5,
    paper: colors.pureWhite,
  },
};
