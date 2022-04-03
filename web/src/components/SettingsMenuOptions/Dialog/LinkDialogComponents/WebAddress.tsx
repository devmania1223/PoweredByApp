import React, { useState } from 'react';
import { partialUrlPattern } from '../../../../util/patternValidators';
import { LinkInput } from './LinkInput';

export type WebAddressProps = {
  value?: string;
  onLinkChange: (email: string) => void;
  setButtonLinkInvalid: (invalid: boolean) => void;
};

export const WebAddress = (props: WebAddressProps) => {
  const { value, onLinkChange, setButtonLinkInvalid } = { ...props };
  const [text, setText] = useState(value);

  return (
    <LinkInput
      value={text}
      pattern={partialUrlPattern}
      proc="https://"
      secondaryProc="http://"
      label="www.example.com"
      title="Web Address"
      errorMsg="Please input a valid web address"
      onLinkChange={onLinkChange}
      onTextChange={setText}
      setButtonLinkInvalid={setButtonLinkInvalid}
    />
  );
};
