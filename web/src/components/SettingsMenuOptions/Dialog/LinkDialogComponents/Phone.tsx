import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { phoneNumberPattern } from '../../../../util/patternValidators';
import { LinkInput } from './LinkInput';

const prepareInitialValue = (prepended: string, value: string) => {
  return value.split(`${prepended}:`).pop();
};

const isInvalid = (value: string) => {
  const rule = new RegExp(phoneNumberPattern);
  return !rule.test(value);
};

export type PhoneScheme = 'tel' | 'sms';

export type PhoneOption = {
  scheme: PhoneScheme;
  number: string;
};

export type PhoneProps = {
  value?: string;
  scheme: PhoneScheme;
  onLinkChange: (number: string, scheme: PhoneScheme) => void;
  setButtonLinkInvalid: (invalid: boolean) => void;
};

export const Phone = (props: PhoneProps) => {
  const { value, scheme, onLinkChange, setButtonLinkInvalid } = { ...props };
  const preparedValue = prepareInitialValue(scheme, value);
  const [text, setText] = useState(preparedValue);
  const [selectedScheme, setSelectedScheme] = useState(scheme);

  const handleChange = (e) => {
    const tempScheme = e.target.value;
    const tempInvalid = isInvalid(text);
    setSelectedScheme(tempScheme);
    setButtonLinkInvalid(tempInvalid);
    if (!tempInvalid) {
      const trimmed = text.split(' ').join('');
      onLinkChange(`${tempScheme}:${trimmed}`, tempScheme);
    }
  };

  return (
    <>
      <RadioGroup row>
        <FormControlLabel
          key={'tel'}
          control={<Radio color="primary" checked={selectedScheme === 'tel'} onChange={handleChange} value="tel" />}
          label={<Typography variant="body2">Call</Typography>}
          labelPlacement="end"
        />
        <FormControlLabel
          key={'sms'}
          control={<Radio color="primary" checked={selectedScheme === 'sms'} onChange={handleChange} value="sms" />}
          label={<Typography variant="body2">Text</Typography>}
          labelPlacement="end"
        />
      </RadioGroup>
      <LinkInput
        value={text}
        phoneScheme={selectedScheme}
        pattern={phoneNumberPattern}
        label="(123) 456-7890"
        title="Phone Number"
        proc={`${selectedScheme}:`}
        errorMsg="Please input a valid phone number"
        onLinkChange={onLinkChange}
        onTextChange={setText}
        setButtonLinkInvalid={setButtonLinkInvalid}
      />
    </>
  );
};
