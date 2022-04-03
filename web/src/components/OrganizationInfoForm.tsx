import { ApolloError, useMutation, useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import React, { ReactNode, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Throbber } from '.';
import { AppContext } from '../context/AppContext';
import { GET_LOCATION_FOR_USER, UPDATE_LOCATION } from '../services/schema';
import { getLocationForUser } from '../types/getLocationForUser';
import { updateLocation } from '../types/updateLocation';
import { withoutDefault } from '../util/withoutDefault';
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
  ridiculouslyLongFormLabel: {
    maxWidth: 'calc(100% - 20px)',
  },
});
// The 'Field' component is here to set all the shared TextField properties for convenience
const Field = (props: TextFieldProps) => {
  return <TextField fullWidth variant="outlined" {...props} />;
};
export type OrganizationInfoFormProps = {
  onSuccess: (response: updateLocation) => void;
  submitButtonLabel?: ReactNode;
  onCancel: () => void;
  cancelButtonLabel?: ReactNode;
  onError?: (error: ApolloError) => void;
};

export type Fields = {
  name: string;
  companyName: string;
  contactName: string;
};

const validationMessages = {
  fieldRequired: 'This field is required',
};

export const OrganizationInfoForm = (props: OrganizationInfoFormProps) => {
  const { identity } = useContext(AppContext);
  const classes = useStyles();
  const {
    onSuccess,
    submitButtonLabel = 'Save',
    onCancel = () => {},
    cancelButtonLabel = 'Cancel',
    onError = () => {},
  } = props;
  const { loading, data } = useQuery<getLocationForUser>(GET_LOCATION_FOR_USER, {
    variables: {
      sub: identity?.id,
    },
    onError: onError,
  });

  const { register, errors, handleSubmit } = useForm<Fields>({
    criteriaMode: 'all',
    mode: 'onBlur',
  });

  const [updateLocationMutation, { loading: saving }] = useMutation<updateLocation>(UPDATE_LOCATION, {
    onCompleted: onSuccess,
    onError,
  });

  const onSubmit = async (fields: Fields) => {
    updateLocationMutation({
      variables: {
        id: data?.user?.location?._id,
        name: fields.name,
        contactName: fields.contactName,
        companyName: fields.companyName,
      },
    });
  };

  return (
    <>
      <Throbber withOverlay isVisible={loading || saving} />
      <form id="organization-info-form">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Field
              id="app-name"
              name="name"
              label="App Name"
              inputRef={register({ required: validationMessages.fieldRequired })}
              defaultValue={data?.user?.location?.name}
              error={!!errors?.name}
              helperText={errors?.name?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              id="contact-name"
              name="contactName"
              label="Contact Name"
              inputRef={register({ required: validationMessages.fieldRequired })}
              defaultValue={data?.user?.location?.contactName}
              error={!!errors?.contactName}
              helperText={errors?.contactName?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              id="company-name"
              name="companyName"
              label="Company Name"
              inputRef={register({ required: validationMessages.fieldRequired })}
              defaultValue={data?.user?.location?.companyName}
              error={!!errors?.companyName}
              helperText={errors?.companyName?.message}
            />
          </Grid>

          <Grid item xs={12} className={classes.actionsContainer}>
            <FlatButton
              variant="contained"
              onClick={withoutDefault(handleSubmit(onSubmit))}
              color="primary"
              className={classes.formActionButton}
            >
              {submitButtonLabel}
            </FlatButton>
            {cancelButtonLabel && (
              <FlatButton variant="outlined" onClick={onCancel} color="default" className={classes.formActionButton}>
                {cancelButtonLabel}
              </FlatButton>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
};
