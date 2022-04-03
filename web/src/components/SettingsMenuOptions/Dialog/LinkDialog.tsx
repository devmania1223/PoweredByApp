import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  buttonLinkChange,
  buttonLinkInvalid,
  linkDialogMenuChange,
  _buttonLink,
  _buttonLinkInvalid,
  _linkDialogMenu,
} from '../../../store/slices/editorSlice';
import { colors } from '../../../theme/palette';
import { FlatButton } from '../../Buttons/FlatButton';
import { LiiingoDialog } from '../../LiiingoDialog';
import { Mailto } from './LinkDialogComponents/Mailto';
import { Phone, PhoneOption, PhoneScheme } from './LinkDialogComponents/Phone';
import { WebAddress } from './LinkDialogComponents/WebAddress';

export type LinkDialogMenuOption = 'page' | 'web' | 'file' | 'email' | 'phone' | 'none';
export type ButtonLink = {
  invalid: boolean;
  web: string;
  email: string;
  phone: PhoneOption;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialog: {
      width: 500,
      maxHeight: 400,
    },
    closeIcon: {
      color: colors.pureWhite,
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexGrow: 1,
      color: colors.pureWhite,
    },
    titleContainer: {
      backgroundColor: colors.grayDark,
      paddingTop: 0,
      paddingBottom: 0,
      marginBottom: 0,
    },
    dialogActions: {
      maxWidth: 500,
      maxHeight: 52,
      backgroundColor: colors.grayLight5,
    },
    options: {
      width: 148,
      height: 300,
      borderRightStyle: 'solid',
      borderRightColor: colors.grayLight20,
      borderRightWidth: 2,
    },
    content: {
      width: 351,
      height: 300,
      marginTop: 15,
      marginLeft: 5,
      marginRight: 5,
    },
    box: {
      height: 300,
      display: 'flex',
      flexDirection: 'row',
    },
    dialogContent: {
      padding: 0,
    },
    radioGroup: {
      marginLeft: theme.spacing(1),
    },
    textField: {
      marginTop: 5,
      width: 311,
    },
  })
);

export type LinkOption = {
  value: LinkDialogMenuOption;
  label: string;
};

export type LinkDialogProps = {
  open: boolean;
  options: LinkOption[];
  component: React.ReactNode;
  value: string;
  handleClose: () => void;
  onChange: (newValue: string) => void;
  onLinkDialogMenuChange: (selected: string) => void;
  setButtonLinkInvalid: (boolean) => void;
  selected: LinkDialogMenuOption;
  invalid: boolean;
  buttonLink: ButtonLink;
  setTemp: (temp: string) => void;
};

export const LinkDialog = (props: LinkDialogProps) => {
  const {
    open,
    handleClose,
    options,
    onLinkDialogMenuChange,
    component,
    selected,
    invalid,
    buttonLink,
    onChange,
    setButtonLinkInvalid,
    setTemp,
  } = {
    ...props,
  };
  const classes = useStyles();

  const handleChange = (e) => {
    setTemp('');
    setButtonLinkInvalid(true);
    onLinkDialogMenuChange(e.target.value);
  };

  return (
    <LiiingoDialog
      title="Add a Link"
      handleClose={handleClose}
      open={open}
      actions={
        <>
          <FlatButton onClick={handleClose}>Cancel</FlatButton>
          <FlatButton
            disabled={invalid}
            variant="contained"
            color="primary"
            type="submit"
            onClick={(e) => {
              const link =
                selected === 'phone'
                  ? buttonLink[selected].number
                  : selected === 'web'
                  ? buttonLink[selected].split('#', 2).join('#') //removing extra #
                  : buttonLink[selected];
              setTemp(link);
              onChange(link);
              handleClose();
              setButtonLinkInvalid(true);
            }}
          >
            Save
          </FlatButton>
        </>
      }
    >
      <Box className={classes.box} overflow="hidden">
        <Box className={classes.options}>
          <RadioGroup className={classes.radioGroup}>
            {options.map((option) => {
              return (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Radio
                      color="primary"
                      checked={selected === option.value}
                      onChange={handleChange}
                      value={option.value}
                    />
                  }
                  label={<Typography variant="body2">{option.label}</Typography>}
                  labelPlacement="end"
                />
              );
            })}
          </RadioGroup>
        </Box>
        <Box className={classes.content}>{component}</Box>
      </Box>
    </LiiingoDialog>
  );
};

const LinkDialogContainer = (
  props: Omit<
    LinkDialogProps,
    'selected' | 'component' | 'onLinkDialogMenuChange' | 'invalid' | 'buttonLink' | 'setButtonLinkInvalid' | 'setTemp'
  >
) => {
  const { value } = { ...props };
  const [temp, setTemp] = useState(value);
  useEffect(() => setTemp(value), [value]);

  const selected = useSelector(_linkDialogMenu);
  const buttonLink = useSelector(_buttonLink);
  const invalid = useSelector(_buttonLinkInvalid);
  let component: React.ReactNode;

  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      onLinkDialogMenuChange: linkDialogMenuChange,
      onButtonLinkChange: buttonLinkChange,
      setButtonLinkInvalid: buttonLinkInvalid,
    },
    dispatch
  );

  switch (selected) {
    case 'web':
      component = (
        <WebAddress
          value={temp}
          setButtonLinkInvalid={actions.setButtonLinkInvalid}
          onLinkChange={(web: string) => {
            actions.onButtonLinkChange({ link: web, linkOption: 'web' });
          }}
        />
      );
      break;
    case 'email':
      component = (
        <Mailto
          value={temp}
          setButtonLinkInvalid={actions.setButtonLinkInvalid}
          onLinkChange={(mailto: string) => {
            actions.onButtonLinkChange({ link: mailto, linkOption: 'email' });
          }}
        />
      );
      break;
    case 'phone':
      component = (
        <Phone
          scheme={temp.includes('tel') ? 'tel' : 'sms'}
          value={temp}
          setButtonLinkInvalid={actions.setButtonLinkInvalid}
          onLinkChange={(number: string, scheme: PhoneScheme) => {
            actions.onButtonLinkChange({ link: number, linkOption: 'phone', phoneScheme: scheme });
          }}
        />
      );
      break;
  }

  const state = { component, selected, invalid, buttonLink };

  return <LinkDialog setTemp={setTemp} {...props} {...state} {...actions} />;
};

export default LinkDialogContainer;
