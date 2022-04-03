import { CircularProgress } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CheckIcon from '@material-ui/icons/Check';
import React, { useEffect } from 'react';
import { colors } from '../../theme/palette';
import { FlatButton } from '../Buttons';
import { LiiingoTooltip } from '../LiiingoTooltip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonBox: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingRight: 20,
    },
    button: {
      minWidth: 144,
    },
    publishing: {
      '&.Mui-disabled': {
        color: colors.tealAccent,
        backgroundColor: colors.tealAccent20,
      },
    },
    success: {
      '&.Mui-disabled': {
        color: colors.greenDark,
        backgroundColor: colors.greenLight,
      },
    },
    spinner: {
      color: colors.tealAccent,
      marginRight: 5,
    },
  })
);

type SaveButtonProps = {
  disabled: boolean;
  saving: boolean;
  success: boolean;
  setSuccess: (success: boolean) => void;
  handleSave: () => void;
};

export const SaveButton = (props: SaveButtonProps) => {
  const { disabled, saving, success, setSuccess, handleSave } = { ...props };
  const classes = useStyles({ saving });

  useEffect(() => {
    if (success) {
      setTimeout(() => setSuccess(false), 3000);
    }
  }, [success, setSuccess]);

  return (
    <Box className={classes.buttonBox}>
      <LiiingoTooltip
        placement="bottom"
        message={`All changes have been saved & published to the mobile app.`}
        show={disabled && !saving}
      >
        <FlatButton
          className={saving ? classes.publishing : success ? classes.success : classes.button}
          startIcon={success ? <CheckIcon /> : null}
          disabled={disabled}
          variant="contained"
          color="secondary"
          onClick={handleSave}
        >
          {saving ? (
            <>
              <CircularProgress className={classes.spinner} size={15} /> Publishing
            </>
          ) : success ? (
            `Published`
          ) : (
            `Save & Publish`
          )}
        </FlatButton>
      </LiiingoTooltip>
    </Box>
  );
};
