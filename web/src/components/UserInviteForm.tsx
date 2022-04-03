import { useMutation } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import AddCircle from '@material-ui/icons/AddCircle';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorContext } from '../context/ErrorContext';
import { INVITE_USER_MUTATION } from '../services/schema';
import { inviteUser } from '../types/inviteUser';
import { withoutDefault } from '../util/withoutDefault';
import { Throbber } from './';
import { FlatButton } from './Buttons/FlatButton';

const useStyles = makeStyles({
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
  },
  formActionButton: {
    width: 125,
    marginLeft: 8,
  },
});
// The 'Field' component is here to set all the shared TextField properties for convenience
const Field = (props: TextFieldProps) => {
  return <TextField fullWidth variant="outlined" {...props} />;
};

export type UserInviteProps = {
  postSuccess: Function;
};

export type Fields = {
  email: string;
};

const validationMessages = {
  fieldRequired: 'This field is required',
};
export const UserInviteForm = (props: UserInviteProps) => {
  const classes = useStyles();
  const { handleError } = useContext(ErrorContext);

  const { postSuccess } = props;

  const onCompleted = (data) => {
    postSuccess();
  };

  const { register, errors, handleSubmit } = useForm<Fields>({
    criteriaMode: 'all',
    mode: 'onBlur',
  });
  const [inviteUserMutation, { loading: saving }] = useMutation<inviteUser>(INVITE_USER_MUTATION, {
    onCompleted,
    onError: handleError,
  });

  const onSubmit = async (fields: Fields) => {
    inviteUserMutation({
      variables: {
        email: fields.email,
      },
    });
  };

  const renderForm = () => (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Field
            label="Email Address"
            type="email"
            name="email"
            error={!!errors.email}
            helperText={errors?.email?.message}
            inputRef={register({ required: validationMessages.fieldRequired })}
          />
        </Grid>
        <Grid item xs={4} className={classes.actionsContainer}>
          <Hidden smDown>
            <FlatButton
              variant="contained"
              onClick={withoutDefault(handleSubmit(onSubmit))}
              color="primary"
              className={classes.formActionButton}
            >
              Invite
              <AddCircle />
            </FlatButton>
          </Hidden>
          <Hidden mdUp>
            <IconButton onClick={withoutDefault(handleSubmit(onSubmit))}>
              <AddCircle />
            </IconButton>
          </Hidden>
        </Grid>
      </Grid>
    </form>
  );

  if (saving) {
    return <Throbber />;
  }

  return renderForm();
};
