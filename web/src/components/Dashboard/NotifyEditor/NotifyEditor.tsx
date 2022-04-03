import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles/createTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React, { useState, useContext } from 'react';
import { FlatButton } from '../../Buttons/FlatButton';
import { LiiingoTempDrawer } from '../../LiiingoTempDrawer';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
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
import 'date-fns';
import { useMutation } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import { Topic } from '../../../store/models';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { colors } from '../../../theme/palette';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editorBox: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      width: 547,
      height: '100%',
      marginLeft: 10,
      marginRight: 10,
    },
    desc: {
      width: '100%',
      padding: 5,
      marginBottom: 20,
    },
    menu: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      left: 0,
      top: 0,
    },
    box: {
      display: 'flex',
      flexDirection: 'column',
      padding: 5,
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
    lightGray: {
      color: colors.grayLight,
    },
    menuItem: {
      backgroundColor: colors.grayLight5,
      borderStyle: 'solid',
      borderRadius: 10,
      borderColor: colors.grayLight20,
      '& li': {
        fontSize: 14,
      },
      '& li:hover': {
        backgroundColor: colors.tealAccent20,
      },
    },
    formControl: {
      minWidth: 120,
      width: '100%',
    },
    pageLabel: {
      font: 'inherit',
      color: colors.grayDark,
      letterSpacing: 'inherit',
    },
  })
);

const Field = (props: TextFieldProps) => {
  return <TextField fullWidth variant="outlined" {...props} />;
};

export type Fields = {
  message: string;
  selectedPage: string;
  scheduledTime: Date;
};

const validationMessages = {
  fieldRequired: 'This field is required',
  maxLength: 'Notifications are limited to 140 characters',
};

export type NotifyEditorProps = {
  open: boolean;
  afterComplete: () => void;
  setOpen: (open: boolean) => void;
  topics: Topic[];
};

export const NotifyEditor = (props: NotifyEditorProps) => {
  const { afterComplete, open, setOpen, topics } = {
    ...props,
  };
  const classes = useStyles();

  const pageOptions = topics.map((topic) => ({
    pageName: topic.name.find((lang) => lang.language === 'en').name || topic.name[0].name,
    id: topic.id,
  }));
  const { handleError } = useContext(ErrorContext);

  const [snackBarSuccessMessage, setSnackBarSuccessMessage] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selected, setSelected] = useState('');
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
        topicId: selected,
      },
    });
    afterComplete();
  };

  const handleOpen = (open: boolean) => {
    setOpen(open);
  };

  const handleChange = (e) => setSelected(e.target.value);

  return (
    <LiiingoTempDrawer title="Push Notification" open={open} setOpen={handleOpen}>
      <Box className={classes.editorBox}>
        <Box className={classes.menu}>
          <Typography className={classes.desc} variant="body2">
            Use push notifications to generate business and to re-engage your base by sending announcements or updates.
          </Typography>
          <Snackbar
            open={!!snackBarSuccessMessage}
            autoHideDuration={6000}
            onClose={() => setSnackBarSuccessMessage('')}
          >
            <Alert severity="success" onClose={() => setSnackBarSuccessMessage('')} elevation={3}>
              {snackBarSuccessMessage}
            </Alert>
          </Snackbar>
          <Box className={classes.box}>
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
                    <Grid item xs={6}>
                      <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel>Page Selector</InputLabel>
                        <Select
                          onChange={handleChange}
                          name="selectedPage"
                          value={selected}
                          MenuProps={{ classes: { paper: classes.menuItem } }}
                          classes={{
                            root: classes.lightGray,
                            icon: classes.lightGray,
                          }}
                          label="Page Selector"
                        >
                          {pageOptions.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              <Typography variant="caption" className={classes.pageLabel}>
                                {option.pageName}
                              </Typography>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.actionBox}>
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
                        disabled={!formState.isValid || selected === ''}
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
        </Box>
      </Box>
    </LiiingoTempDrawer>
  );
};
