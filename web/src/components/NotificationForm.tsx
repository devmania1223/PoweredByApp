import 'date-fns';
import { useMutation } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import Alert from '@material-ui/lab/Alert';
import React, { useContext, useState } from 'react';
import { FieldError, useForm, Controller } from 'react-hook-form';
import { ErrorContext } from '../context/ErrorContext';
import { SEND_NOTIFICATION_MUTATION } from '../services/schema';
import { inviteUser } from '../types/inviteUser';
import { withoutDefault } from '../util/withoutDefault';
import { Throbber } from './';
import { FlatButton } from './Buttons/FlatButton';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { DateTimePicker, LocalizationProvider } from '@material-ui/pickers';
const useStyles = makeStyles({
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
  },
  formActionButton: {
    width: 64,
    marginLeft: 8,
    height: 48,
  },
});
// The 'Field' component is here to set all the shared TextField properties for convenience
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

export type NotificationFormProps = {
  liiingoExhibitId: string;
  afterComplete: Function;
};

export const NotificationForm = ({ liiingoExhibitId, afterComplete }: NotificationFormProps) => {
  const classes = useStyles();
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

  const renderForm = () => (
    <>
      <Snackbar open={!!snackBarSuccessMessage} autoHideDuration={6000} onClose={() => setSnackBarSuccessMessage('')}>
        <Alert severity="success" onClose={() => setSnackBarSuccessMessage('')} elevation={3}>
          {snackBarSuccessMessage}
        </Alert>
      </Snackbar>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={6}>
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
  );

  if (saving) {
    return <Throbber />;
  }

  return renderForm();
};
