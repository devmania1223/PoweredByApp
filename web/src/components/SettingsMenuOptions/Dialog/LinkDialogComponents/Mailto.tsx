import React, { useState } from 'react';
import { emailPattern } from '../../../../util/patternValidators';
import { LinkInput } from './LinkInput';

const prepareInitialValue = (value: string) => {
  const prepended = 'mailto:';
  return value.split(prepended).pop();
};

export type MailtoProps = {
  value?: string;
  onLinkChange: (email: string) => void;
  setButtonLinkInvalid: (invalid: boolean) => void;
};

export const Mailto = (props: MailtoProps) => {
  const { value, onLinkChange, setButtonLinkInvalid } = { ...props };
  const preparedValue = prepareInitialValue(value);
  const [text, setText] = useState(preparedValue);

  return (
    <LinkInput
      value={text}
      pattern={emailPattern}
      label="mailto:"
      title="Email"
      proc="mailto:"
      errorMsg="Please input a valid email address"
      onLinkChange={onLinkChange}
      onTextChange={setText}
      setButtonLinkInvalid={setButtonLinkInvalid}
    />
  );
};
