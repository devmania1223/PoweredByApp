import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createTheme';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { UseFormMethods } from 'react-hook-form';
import { hyperlinkOrMailto } from '../util/patternValidators';

const validationMessages = {
  mustBeValidUrl:
    "This URL doesn't look quite right. It should start with 'http://' or 'https://' and should work if you try it in your web browser.",
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonFormWrapper: {
      width: 170,
      height: 40,
      backgroundColor: '#555555',
      textAlign: 'center',
    },
    buttonFormInput: {
      color: '#ffffff',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      textAlign: 'center',
    },
    buttonFormTextField: {
      backgroundColor: '#555555',
    },
  })
);
type TextButtonFieldProps = {
  register: UseFormMethods['register'];
  formState: UseFormMethods['formState'];
  name: string;
  sectionTitle: string;
  defaultValue?: {
    name?: string;
    value?: string;
  };
};
export const TextButtonField = ({
  register,
  formState,
  name,
  sectionTitle,
  defaultValue = { name: '', value: '' },
}: TextButtonFieldProps) => {
  const classes = useStyles();

  const buttonLabelFieldName = `${name}ButtonLabel`;
  const buttonUrlFieldName = `${name}`;

  return (
    <>
      <Typography variant="subtitle2">{sectionTitle}</Typography>
      <Grid container>
        <Grid item xs={5}>
          <Typography variant="body2">Button Label</Typography>
          <Paper color="primary" elevation={4} className={classes.buttonFormWrapper}>
            <TextField
              inputRef={register}
              name={buttonLabelFieldName}
              defaultValue={defaultValue?.name}
              inputProps={{ className: classes.buttonFormInput }}
              className={classes.buttonFormTextField}
            />
          </Paper>
        </Grid>

        <Grid item xs={7}>
          <Typography variant="body2">Button URL</Typography>
          <TextField
            inputRef={register({
              pattern: {
                value: hyperlinkOrMailto,
                message: validationMessages.mustBeValidUrl,
              },
            })}
            defaultValue={defaultValue?.value}
            name={buttonUrlFieldName}
            error={!!formState?.errors[buttonUrlFieldName]}
            helperText={formState?.errors[buttonUrlFieldName]?.message}
          />
        </Grid>
      </Grid>
    </>
  );
};
