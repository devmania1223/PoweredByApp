import React from 'react';
import TextField from '@material-ui/core/TextField';
import { UseFormMethods, FieldError } from 'react-hook-form';

export type UrlInputFieldProps = {
  register: UseFormMethods['register'];
  name: string;
  label: string;
  id?: string;
  error?: FieldError;
  defaultValue?: any;
};
export const UrlInputField = ({ register, name, label, id, error, defaultValue = '' }: UrlInputFieldProps) => (
  <TextField
    fullWidth
    variant="outlined"
    type="url"
    placeholder="https://yoursite.com"
    id={id}
    name={name}
    label={label}
    inputRef={register({
      pattern: {
        // eslint-disable-next-line
        value: /^(https?:\/\/)([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/,
        message: 'Must be a valid URL starting with http:// or https://',
      },
    })}
    error={!!error}
    helperText={error?.message}
    defaultValue={defaultValue}
  />
);
