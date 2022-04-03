import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FlatButton } from '../../components/Buttons';
import { useImageUploadField } from '../../hooks/useImageUploadField';
import { checkMultipleValidationRules, recommendSquareAspectRatio } from '../../util/imageValidators';
import { withoutDefault } from '../../util/withoutDefault';
import { TemplateForm } from '../templateTypes';

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

const validationMessages = {
  fieldRequired: 'This field is required',
};

type Fields = {
  realtorIntensity: string;
  realtorImage: string;
  realtorLink: string;
};

const TopicForm: TemplateForm = (props) => {
  const classes = useStyles();
  const {
    useOnExhibitSubmit,
    // onSuccess = () => {},
    submitButtonLabel = 'Save',
    onCancel = () => {},
    cancelButtonLabel = 'Cancel',
    // appOnboardingFlow,
    // onError = () => {},
    // setIsLoading = () => {},
    liiingoContent = [],
    locationId,
  } = props;

  const contentMap = {
    realtorIntensity: {
      name: 'Realtor Intensity',
      content: liiingoContent.find((element) => element.languages?.en?.name === 'Realtor Intensity'),
      default: '',
    },
    realtorImage: {
      name: 'Realtor Image',
      content: liiingoContent.find((element) => element.languages?.en?.name === 'Realtor Image'),
      default: '',
    },
    realtorLink: {
      name: 'Realtor Link',
      content: liiingoContent.find((element) => element.languages?.en?.name === 'Realtor Link'),
      default: '',
    },
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useFormContext();

  const [onSubmit, { loading: saving }] = useOnExhibitSubmit<Fields>(locationId, contentMap);
  const [ImageField, imageFieldProps, setImagePreview] = useImageUploadField({
    register,
    setValue,
    fieldName: 'realtorImage',
    maxFileSizeBytes: 3000000,
    validateImage: checkMultipleValidationRules([recommendSquareAspectRatio]),
  });

  useEffect(() => {
    setImagePreview(contentMap?.realtorImage?.content?.languages?.en?.value ?? '');
  }, [contentMap?.realtorImage?.content?.languages?.en?.value, setImagePreview]);

  return (
    <>
      <Typography variant="h3" paragraph>
        Template Form Example
      </Typography>
      <form id="template-form">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              id="realtor-intensity"
              name="realtorIntensity"
              label={contentMap?.realtorIntensity?.name}
              inputRef={register({ required: validationMessages.fieldRequired })}
              defaultValue={
                contentMap?.realtorIntensity?.content?.languages?.en?.value ?? contentMap?.realtorIntensity?.default
              }
              error={!!errors?.realtorIntensity}
              helperText={errors?.realtorIntensity?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <ImageField {...imageFieldProps} label="Realtor Image" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              id="realtor-intensity"
              name="realtorLink"
              label={contentMap?.realtorLink?.name}
              inputRef={register({ required: validationMessages.fieldRequired })}
              defaultValue={contentMap?.realtorLink?.content?.languages?.en?.value ?? contentMap?.realtorLink?.default}
              error={!!errors?.realtorLink}
              helperText={errors?.realtorLink?.message}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.actionsContainer}>
          <FlatButton
            variant="contained"
            onClick={withoutDefault(handleSubmit(onSubmit))}
            color="primary"
            className={classes.formActionButton}
            disabled={saving}
          >
            {saving ? <CircularProgress color="secondary" size={20} /> : submitButtonLabel}
          </FlatButton>
          {cancelButtonLabel && (
            <FlatButton variant="outlined" onClick={onCancel} color="default" className={classes.formActionButton}>
              {cancelButtonLabel}
            </FlatButton>
          )}
        </Grid>
      </form>
    </>
  );
};

export default TopicForm;
