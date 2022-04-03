import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { ColorChangeHandler } from 'react-color';
import ChromePicker from 'react-color/lib/components/chrome/Chrome';
import { Control, Controller, FieldError, RegisterOptions } from 'react-hook-form';

export type ColorPickerPopoverFieldProps = {
  control: Control;
  watch: Function;
  name: string;
  label: string;
  id?: string;
  error?: FieldError;
  defaultValue?: string; // A HEX color value, i.e. #FF0000
  rules?: RegisterOptions;
};
export const ColorPickerPopoverField = ({
  control,
  name,
  label,
  id,
  error,
  defaultValue = '',
  rules,
  watch,
}: ColorPickerPopoverFieldProps) => {
  const [popoverIsVisible, setPopoverIsVisible] = useState<boolean>(false);
  const [popoverAnchorElement, setPopoverAnchorElement] = useState<HTMLInputElement | null>(null);

  const openPopover = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPopoverAnchorElement(e.currentTarget);
    setPopoverIsVisible(true);
  };

  const handleClosePopover = () => {
    setPopoverIsVisible(false);
    setPopoverAnchorElement(null);
  };

  const handlePickColor: ColorChangeHandler = (selectedColor, event) => {
    control.setValue(name, selectedColor.hex);
  };

  const watchColor = watch(name) as string;

  return (
    <>
      <Controller
        render={({ onChange, onBlur, value, name, ref }) => (
          <TextField
            fullWidth
            variant="outlined"
            id={id}
            name={name}
            label={label}
            inputRef={ref}
            value={value ?? ''}
            onChange={onChange}
            error={!!error}
            helperText={error?.message}
            onClick={openPopover}
            onBlur={onBlur}
            inputProps={{
              autoComplete: 'off',
            }}
          />
        )}
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={rules}
      />
      <Popover
        id={`${id}-color-picker`}
        open={popoverIsVisible}
        anchorEl={popoverAnchorElement}
        onClose={handleClosePopover}
      >
        <ChromePicker color={watchColor ?? ''} onChange={handlePickColor} disableAlpha={true} />
      </Popover>
    </>
  );
};
