import { colors } from './palette';
export const componentOverrides = {
  MuiTextField: {
    root: {
      // backgroundColor: colors.pureWhite,
    },
  },
  MuiOutlinedInput: {
    root: {
      backgroundColor: colors.pureWhite,
      borderColor: colors.grayLight20,
      borderRadius: '10px',
      '&.Mui-focused $notchedOutline': {
        borderColor: colors.tealAccent,
      },
      '&.Mui-error $notchedOutline': {
        borderColor: colors.redDark,
      },
    },
    notchedOutline: {
      // backgroundColor: colors.grayLight5,
    },
  },
  MuiContainer: {
    root: {
      minHeight: '20rem',
    },
  },
  MuiSwitch: {
    switchBase: {
      '&$checked': {
        // color: colors.lime,
      },
    },
    track: {
      '$checked:not($colorPrimary):not($colorSecondary) + &': {
        // backgroundColor: colors.lime,
      },
    },
  },
  MuiPopover: {
    paper: {
      backgroundColor: colors.grayDark,
      color: colors.pureWhite,
      padding: '8px 12px 8px 12px',
      borderRadius: 4,
      maxWidth: 350,
    },
  },
  MuiLinearProgress: {
    root: {
      borderRadius: '100px',
      height: 5,
    },
    colorPrimary: {
      backgroundColor: colors.grayLight20,
    },
    barColorPrimary: {
      backgroundColor: colors.blueAccent,
    },
  },
  MuiCheckbox: {
    root: {
      width: 0,
      height: 0,
      margin: 12,
      color: colors.grayMedium,
      '&$indeterminate': {
        color: colors.tealAccent,
      },
      '&$disabled': {
        color: colors.graySecondaryLight,
      },
    },
    colorPrimary: {
      '&$checked': {
        color: colors.tealAccent,
      },
      '&$disabled': {
        color: colors.graySecondaryLight,
      },
    },
    colorSecondary: {
      '&$checked': {
        color: colors.redDark,
      },
      '&:not($checked)': {
        color: colors.redDark,
        backgroundColor: colors.redLight,
        borderRadius: 2,
      },
      '&$disabled': {
        color: colors.graySecondaryLight,
      },
    },
  },

  MuiBadge: {
    badge: {
      color: colors.blueAccent,
      backgroundColor: colors.blueAccent20,
      borderRadius: 0,
    },
    colorPrimary: {
      color: colors.pureWhite,
      backgroundColor: colors.blueDark,
    },
  },

  MuiButton: {
    root: {
      textTransform: null,
      borderRadius: '10px',
      '&.Mui-disabled': {
        color: colors.grayDark20,
      },
    },
    //
    containedPrimary: {
      backgroundColor: colors.purpleAccent,
      color: colors.pureWhite,
      '&:hover': {
        backgroundColor: colors.purpleAccent20,
        color: colors.purpleAccent,
      },
    },
    //
    containedSecondary: {
      backgroundColor: colors.tealAccent20,
      color: colors.tealAccent,
      '&:hover': {
        backgroundColor: colors.tealAccent,
        color: colors.pureWhite,
      },
    },
    //
    outlinedPrimary: {
      borderColor: colors.purpleAccent,
      '&:hover': {
        backgroundColor: colors.purpleAccent20,
      },
    },
    //
    outlinedSecondary: {
      color: colors.tealAccent,
      borderColor: colors.tealAccent,
      '&:hover': {
        backgroundColor: colors.tealAccent20,
        borderColor: colors.tealAccent,
      },
    },
    textPrimary: {
      backgroundColor: '#00000000',
      '&:hover': {
        backgroundColor: '#00000000',
      },
    },
    textSecondary: {
      color: colors.tealAccent,
      backgroundColor: '#00000000',
      '&:hover': {
        backgroundColor: '#00000000',
      },
    },
  },
  MuiInputLabel: {
    outlined: {
      color: colors.grayLight,
      '&.Mui-focused': {
        color: colors.grayDark,
      },
    },
  },
  MuiAlert: {
    action: {
      alignItems: 'flex-start',
    },
  },
};
