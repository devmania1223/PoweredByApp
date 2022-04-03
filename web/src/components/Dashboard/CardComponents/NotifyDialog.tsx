import 'date-fns';
import { useMutation } from '@apollo/client';
import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles/createTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { FlatButton } from '../../Buttons/FlatButton';
import { LiiingoDialog } from '../../LiiingoDialog';
import Grid from '@material-ui/core/Grid';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import React, { useContext, useState } from 'react';
import { FieldError, useForm, Controller } from 'react-hook-form';
import { ErrorContext } from '../../../context/ErrorContext';
import { DateTimePicker, LocalizationProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import Send from '@material-ui/icons/Send';
import { SEND_NOTIFICATION_MUTATION } from '../../../services/schema';
import { inviteUser } from '../../../types/inviteUser';
import { withoutDefault } from '../../../util/withoutDefault';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Throbber } from '../../../components/Throbber';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      marginBottom: 20,
    },
    box: {
      display: 'flex',
      flexDirection: 'column',
      padding: 20,
    },
    actionBox: {
      marginTop: 20,
    },

    formActionButton: {
      width: 64,
      marginLeft: 8,
      height: 48,
    },
    actionsContainer: {
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'flex-start',
    },
    savingSpinner: {
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 20,
    },
  })
);

const Field = (props: TextFieldProps) => {
  return <TextField fullWidth variant="outlined" {...props} />;
};

export type Fields = {
  message: string;
  scheduledTime: Date;
};

const validationMessages = {
  fieldRequired: 'This field is required',
  maxLength: 'Notifications are limited to 140 characters',
};

export type NotifyDialogProps = {
  liiingoExhibitId: string;
  afterComplete: Function;
  open: boolean;
  onClose: () => void;
};

export const NotifyDialog = (props: NotifyDialogProps) => {
  const { liiingoExhibitId, afterComplete, open, onClose } = {
    ...props,
  };
  const classes = useStyles();
  const handleClose = () => {
    /**
     * implement with redux
     * need to add conditional checking state for if
     * QR has been edited
     */

    onClose();
  };

  const { handleError } = useContext(ErrorContext);
  const [snackBarSuccessMessage, setSnackBarSuccessMessage] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setValue('scheduledTime', date);
  };
  const onCompleted = (data) => {
    setSnackBarSuccessMessage('Push notification saved!');
  };

  const { control, register, errors, formState, getValues, setValue, watch, handleSubmit } = useForm<Fields>({
    criteriaMode: 'all',
    mode: 'onChange',
  });
  watch('message');
  const { message } = getValues();
  const [sendNotification, { loading: saving }] = useMutation<inviteUser>(SEND_NOTIFICATION_MUTATION, {
    onCompleted,
    onError: handleError,
  });

  const formattedTimestamp = (date: Date | undefined) => {
    if (!date) {
      return undefined;
    }
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const formattedDate = date.toISOString().split('T')[0];
    const formattedTime = date.toTimeString().split(' ')[0];
    return `${formattedDate} ${formattedTime}`;
  };

  const onSubmit = async (fields: Fields) => {
    await sendNotification({
      variables: {
        message: fields.message,
        scheduledTime: formattedTimestamp(fields?.scheduledTime),
        topicId: liiingoExhibitId,
      },
    });
    afterComplete();
  };

  return (
    <LiiingoDialog
      title="Notify Your Audience"
      titleVariant="light"
      handleClose={handleClose}
      open={open}
      actions={<></>}
    >
      <Snackbar open={!!snackBarSuccessMessage} autoHideDuration={6000} onClose={() => setSnackBarSuccessMessage('')}>
        <Alert severity="success" onClose={() => setSnackBarSuccessMessage('')} elevation={3}>
          {snackBarSuccessMessage}
        </Alert>
      </Snackbar>
      <Box className={classes.box}>
        <Typography variant="body2" className={classes.content}>
          It looks like you're in the middle of editing your QR Code. Are you sure you want to leave without saving your
          changes?
        </Typography>
        {saving ? (
          <Box className={classes.savingSpinner}>
            <Throbber />
          </Box>
        ) : (
          <>
            <form>
              <Field
                name="message"
                label="Notification Message"
                multiline
                rows={3}
                inputRef={register({
                  required: validationMessages.fieldRequired,
                  maxLength: { value: 140, message: validationMessages.maxLength },
                })}
                error={!!errors?.message}
                helperText={
                  errors?.message
                    ? (errors?.message as FieldError)?.message
                    : `${message ? message.length : 0} / 140 characters`
                }
              />
              <Grid container className={classes.actionBox}>
                <Grid xs={6}>
                  <Controller
                    name="scheduledTime"
                    control={control}
                    render={(data) => (
                      <LocalizationProvider dateAdapter={DateFnsUtils}>
                        <DateTimePicker
                          {...data}
                          label="Scheduled Time"
                          inputFormat="MM/dd/yyyy hh:mm:ss a"
                          value={selectedDate}
                          onChange={handleDateChange}
                          disablePast
                          renderInput={(props) => <Field {...props} helperText={null} />}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </Grid>
                <Grid item xs={6} className={classes.actionsContainer}>
                  <FlatButton
                    variant="contained"
                    onClick={withoutDefault(handleSubmit(onSubmit))}
                    color="primary"
                    disabled={!formState.isValid}
                    className={classes.formActionButton}
                  >
                    <Send />
                  </FlatButton>
                </Grid>
              </Grid>
            </form>
          </>
        )}
      </Box>
    </LiiingoDialog>
  );
};
