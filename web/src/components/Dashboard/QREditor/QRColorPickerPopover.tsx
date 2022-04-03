import { Theme } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import ChromePicker from 'react-color/lib/components/chrome/Chrome';
import { colorHasValidLightness } from '../../../util/colorBrightnessValidator';
import { LiiingoWarning } from '../../LiiingoWarning';

const useStyles = makeStyles<Theme, QRColorPickerPopoverProps>({
  text: {
    width: 254,
    marginBottom: 20,
  },
  swatch: (props) => ({
    borderRadius: '50%',
    backgroundColor: `${props.color}`,
    width: 17,
    height: 17,
  }),
});

const validationMessages = {
  lightness: 'Colors that are too light are not easily scannable on a white background.',
  colorRequired: "If you don't want to customize this color, please just choose black from the color-picker.",
};

export type QRColorPickerPopoverProps = {
  setColor: (color: string) => void;
  setError: (err: boolean) => void;
  name: string;
  label: string;
  id?: string;
  color?: string; // A HEX color value, i.e. #FF0000
};

const defaultProps = {
  color: '#000000',
};

export const QRColorPickerPopover = (props: QRColorPickerPopoverProps) => {
  const { setColor, setError: submitError, name, label, id, color } = { ...defaultProps, ...props };

  const [popoverIsVisible, setPopoverIsVisible] = useState<boolean>(false);
  const [popoverAnchorElement, setPopoverAnchorElement] = useState<HTMLInputElement | null>(null);
  const [selectedColor, setSelectedColor] = useState(color);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const classes = useStyles({ name, label, color: selectedColor ?? color, setColor, setError });

  const openPopover = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPopoverAnchorElement(e.currentTarget);
    setPopoverIsVisible(true);
  };

  const handleError = (err: boolean, msg: string) => {
    submitError(err);
    setError(err);
    setErrorMsg(msg);
  };

  const validate = (color) => {
    if (!color) {
      handleError(true, validationMessages.colorRequired);
    } else if (!colorHasValidLightness(color.hex)) {
      handleError(true, validationMessages.lightness);
    } else {
      handleError(false, '');
    }
  };

  const handleClosePopover = () => {
    setPopoverIsVisible(false);
    setPopoverAnchorElement(null);
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
    setSelectedColor(color.hex);
    validate(color);
  };

  const handleColorChangeText = (color) => {
    setColor(color);
    setSelectedColor(color);
    validate(color);
  };

  return (
    <>
      <TextField
        error={error}
        className={classes.text}
        value={selectedColor ?? ''}
        variant="outlined"
        id={id}
        name={name}
        label={label}
        onChange={(e) => handleColorChangeText(e.target.value)}
        onClick={openPopover}
        InputProps={{
          startAdornment: error && <LiiingoWarning message={errorMsg} />,
          endAdornment: <div className={classes.swatch} />,
        }}
      />
      <Popover
        id={`${id}-color-picker`}
        open={popoverIsVisible}
        anchorEl={popoverAnchorElement}
        onClose={handleClosePopover}
      >
        <ChromePicker color={selectedColor} onChange={handleColorChange} />
      </Popover>
    </>
  );
};
