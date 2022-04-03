import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Control, Controller, FieldError, RegisterOptions } from 'react-hook-form';
import InputMask from 'react-input-mask';

export type PhoneNumberInputFieldProps = {
  control: Control;
  name: string;
  label: string;
  id?: string;
  error?: FieldError;
  defaultValue?: any;
  rules?: RegisterOptions;
};
export const PhoneNumberInputField = ({
  control,
  name,
  label,
  id,
  error,
  defaultValue = '',
  rules,
}: PhoneNumberInputFieldProps) => (
  <Controller
    render={({ onChange, onBlur, value, name, ref }) => (
      <InputMask mask="(999) 999-9999" onChange={onChange} onBlur={onBlur} value={value}>
        {() => (
          <TextField
            fullWidth
            variant="outlined"
            type="tel"
            id={id}
            name={name}
            label={label}
            inputRef={ref}
            error={!!error}
            helperText={error?.message}
          />
        )}
      </InputMask>
    )}
    control={control}
    mask="(999) 999-9999"
    name={name}
    defaultValue={defaultValue}
    rules={rules}
  />
);
