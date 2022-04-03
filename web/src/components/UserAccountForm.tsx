import { useMutation } from '@apollo/client';
import { Auth } from '@aws-amplify/auth/lib-esm/Auth';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import React, { CSSProperties, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AppContext } from '../context/AppContext';
import { UPDATE_USER_MUTATION } from '../services/schema';
import { getOrganizationById, updateOrgEmail } from '../store/api-client';
import { Organization } from '../store/models';
import { emailPattern, phoneNumberPattern } from '../util/patternValidators';
import { Throbber } from './';
import { BlockingModal } from './BlockingModal';
import { FlatButton } from './Buttons/FlatButton';

export type Props = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  submitButtonText?: string;
  styles?: CSSProperties;
  onError?: (error: string) => void;
};

type Fields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  confirmationCode: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formActions: {
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
    },
    formCard: {
      marginBottom: 20,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export const UserAccountForm = ({
  firstName: initialFirstName = '',
  lastName: initialLastName = '',
  email: initialEmail = '',
  phone: initialPhone = '',
  submitButtonText = 'Save',
  onError = () => {},
}: Props) => {
  const { identity, refreshAppContext } = useContext(AppContext);
  const classes = useStyles();
  const [showConfirmEmail, setShowConfirmEmail] = useState<boolean>(false);
  const [org, setOrg] = useState(new Organization());
  const { register, errors, formState, handleSubmit } = useForm<Fields>({
    mode: 'onChange',
  });
  const [snackBarSuccessMessage, setSnackBarSuccessMessage] = useState<string>('');
  const [updateUserMutation] = useMutation(UPDATE_USER_MUTATION);
  const onSubmit: SubmitHandler<Fields> = async (data: Fields) => {
    try {
      if (showConfirmEmail) {
        await Auth.verifyCurrentUserAttributeSubmit('email', data.confirmationCode);
        refreshAppContext();
        updateUserMutation({
          variables: {
            record: {
              email: data.email,
            },
            filter: {
              sub: identity?.id,
            },
          },
        });

        // updating organization email on the backend
        await updateOrgEmail(org, data.email, data.firstName);

        setShowConfirmEmail(false);
      } else {
        let user = await Auth.currentAuthenticatedUser();

        let organization = await getOrganizationById();
        setOrg(organization);

        const phoneNumber = data.phone ? { phone_number: '+1' + data.phone.replace(/\D/g, '') } : {};

        const attributes = {
          given_name: data.firstName,
          family_name: data.lastName,
          email: data.email,
          ...phoneNumber,
        };

        await Auth.updateUserAttributes(user, attributes);
        if (identity?.email !== data.email) {
          setShowConfirmEmail(true);
        } else {
          refreshAppContext();
        }
      }
    } catch (error) {
      onError(error.message);
    }
  };

  const validationMessages = {
    requiredMessage: 'This field is required',
    passwordsMatch: 'Password fields must match',
    phoneNumberMinLength:
      'This phone number looks too short. Please provide a full 10-digit phone number with area code.',
    phoneNumberMaxLength: 'This phone number looks too long',
  };

  const isInvalid = (value: string, pattern: RegExp) => {
    const rule = new RegExp(pattern);
    return !rule.test(value);
  };

  const [phoneInvalid, setPhoneInvalid] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);

  return (
    <>
      <Card variant="outlined" className={classes.formCard}>
        <CardHeader title="Basic Information" />
        <CardContent>
          <Snackbar
            open={!!snackBarSuccessMessage}
            autoHideDuration={6000}
            onClose={() => setSnackBarSuccessMessage('')}
          >
            <Alert severity="success" onClose={() => setSnackBarSuccessMessage('')} elevation={3}>
              {snackBarSuccessMessage}
            </Alert>
          </Snackbar>
          <form onSubmit={handleSubmit(onSubmit)}>
            <BlockingModal open={showConfirmEmail} fullPage={true}>
              <Card>
                <CardHeader title="Enter the code that was emailed to you" />
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={8}>
                      <TextField
                        label="Confirmation Code"
                        fullWidth
                        variant="outlined"
                        type="text"
                        name="confirmationCode"
                        error={!!errors.confirmationCode}
                        helperText={errors?.confirmationCode?.message}
                        inputRef={register}
                      />
                    </Grid>
                    <Grid item container alignContent="flex-end" justifyContent="flex-end" xs={12} md={4}>
                      <FlatButton role="button" type="submit" variant="contained">
                        CONFIRM
                      </FlatButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </BlockingModal>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <TextField
                  label="First Name"
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="firstName"
                  defaultValue={identity?.firstName}
                  error={!!errors.firstName}
                  helperText={errors?.firstName?.message}
                  inputRef={register({ required: validationMessages.requiredMessage })}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  label="Last Name"
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="lastName"
                  defaultValue={identity?.lastName}
                  error={!!errors.lastName}
                  helperText={errors?.lastName?.message}
                  inputRef={register({ required: validationMessages.requiredMessage })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email Address"
                  fullWidth
                  variant="outlined"
                  type="email"
                  name="email"
                  defaultValue={identity?.email}
                  error={emailInvalid}
                  helperText={emailInvalid && 'Please input a valid email'}
                  inputRef={register({ required: validationMessages.requiredMessage })}
                  onChange={(newValue) => {
                    const tempInvalid = isInvalid(newValue.target.value, emailPattern);
                    setEmailInvalid(tempInvalid);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  variant="outlined"
                  name="phone"
                  defaultValue={
                    identity?.phoneNumber !== '' &&
                    identity?.phoneNumber !== null &&
                    identity?.phoneNumber !== undefined
                      ? `(` +
                        identity?.phoneNumber.substring(2, 5) +
                        `)` +
                        identity?.phoneNumber.substring(5, 8) +
                        `-` +
                        identity?.phoneNumber.substring(8, identity?.phoneNumber.length)
                      : ''
                  }
                  error={phoneInvalid}
                  helperText={phoneInvalid && 'Please input a valid Phone Number'}
                  inputRef={register({ required: validationMessages.requiredMessage })}
                  onChange={(newValue) => {
                    const tempInvalid = isInvalid(newValue.target.value, phoneNumberPattern);
                    setPhoneInvalid(tempInvalid);
                  }}
                />
              </Grid>
              <Grid item xs={12} className={classes.formActions}>
                <FlatButton
                  role="button"
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!formState.isValid}
                >
                  {formState.isSubmitting ? <Throbber /> : submitButtonText}
                </FlatButton>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default UserAccountForm;
