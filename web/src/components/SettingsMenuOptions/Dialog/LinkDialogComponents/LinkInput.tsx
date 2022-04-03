import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { PhoneScheme } from './Phone';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginTop: 5,
      width: 311,
    },
  })
);

const prepareInitialValue = (proc: string, value: string) => {
  return value.split(`${proc}`).pop();
};

const isInvalid = (value: string, pattern: RegExp) => {
  const rule = new RegExp(pattern);
  return !rule.test(value);
};

export type LinkInputProps = {
  value?: string;
  phoneScheme?: PhoneScheme;
  pattern: RegExp;
  title: string;
  label?: string;
  proc?: string;
  secondaryProc?: string;
  errorMsg: string;
  onTextChange: (text: string) => void;
  onLinkChange: (number: string, scheme: PhoneScheme) => void;
  setButtonLinkInvalid: (invalid: boolean) => void;
};

export const LinkInput = (props: LinkInputProps) => {
  const {
    value,
    phoneScheme,
    pattern,
    title,
    label,
    errorMsg,
    proc,
    secondaryProc,
    onTextChange,
    onLinkChange,
    setButtonLinkInvalid,
  } = {
    ...props,
  };
  const preparedValue = prepareInitialValue(proc, value);
  const classes = useStyles();
  const [text, setText] = useState(preparedValue);
  const [invalid, setInvalid] = useState(false);

  const [show, setShow] = useState(true);
  const handleLabel = () => setShow(!show);

  return (
    <>
      <Typography variant="subtitle2">{title}</Typography>
      <TextField
        value={text}
        className={classes.textField}
        label={show && !text ? label : null}
        variant="outlined"
        name="outlinedEmpty"
        error={invalid}
        helperText={invalid && errorMsg}
        onChange={(newValue) => {
          const tempInvalid = isInvalid(newValue.target.value, pattern);
          setInvalid(tempInvalid);
          setButtonLinkInvalid(tempInvalid);
          setText(newValue.target.value);
          onTextChange(newValue.target.value);
        }}
        onFocus={handleLabel}
        onBlur={() => {
          handleLabel();
          if (isInvalid(text, pattern)) {
            return;
          } else {
            const trimmed = text.split(' ').join('');
            const prepared =
              proc && !trimmed.startsWith(proc) && !trimmed.startsWith(secondaryProc) ? `${proc}${trimmed}` : trimmed;
            onLinkChange(prepared, phoneScheme);
          }
        }}
      />
    </>
  );
};
