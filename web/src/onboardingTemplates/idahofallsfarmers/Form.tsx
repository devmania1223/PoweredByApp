import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { TextButtonField } from '../../components/TextButtonField';
import { useImageUploadField } from '../../hooks/useImageUploadField';
import { useVideoUploadField } from '../../hooks/useVideoUploadField';
import { EnumLocationExhibitTemplatedContentLiiingoContentType } from '../../types/globalTypes';
import { checkMultipleValidationRules } from '../../util/imageValidators';
import { TemplateForm } from '../templateTypes';

export const contentMap = {
  spotlightImage: {
    name: 'Spotlight Image',
    liiingoContentType: EnumLocationExhibitTemplatedContentLiiingoContentType['image'],
  },
  video1: {
    name: 'Featured Video',
    liiingoContentType: EnumLocationExhibitTemplatedContentLiiingoContentType['video'],
  },
  textBlurb: {
    name: 'Text Blurb',
    liiingoContentType: EnumLocationExhibitTemplatedContentLiiingoContentType['text'],
  },
  buttonLink: {
    name: 'Button Link',
    liiingoContentType: EnumLocationExhibitTemplatedContentLiiingoContentType['webview'],
  },
};

const TopicForm: TemplateForm = (props) => {
  const { liiingoContent = [], index } = props;

  const { register, formState, errors, setValue } = useFormContext();

  const imageFieldValue =
    liiingoContent.find((element) => element?.languages?.[index]?.name === 'Spotlight Image')?.languages?.[index]
      ?.value || '';
  const [ImageField, imageFieldProps, setImagePreview] = useImageUploadField({
    register,
    setValue,
    fieldName: `${index}.spotlightImage`,
    maxFileSizeBytes: 3000000,
    initialValue: imageFieldValue,
    validateImage: checkMultipleValidationRules([]),
  });

  const videoValue =
    liiingoContent.find((element) => element?.languages?.[index]?.name === 'Featured Video')?.languages?.[index]
      ?.value || '';
  const [Video1Field, video1FieldProps, setVideo1Preview] = useVideoUploadField({
    register,
    setValue,
    fieldName: `${index}.video1`,
    initialValue: videoValue,
    maxFileSizeBytes: 100000000,
    validateVideo: checkMultipleValidationRules([]),
  });
  useEffect(() => {
    setVideo1Preview(videoValue);
  }, [videoValue, setVideo1Preview]);
  useEffect(() => {
    setImagePreview(imageFieldValue);
  }, [imageFieldValue, setImagePreview]);

  return (
    <>
      <Typography variant="h5">App Layout</Typography>
      <form id="template-form">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ImageField {...imageFieldProps} label="Spotlight Image" />
          </Grid>
          <Grid item xs={12}>
            <Video1Field {...video1FieldProps} label="Upload a video" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              label="Text Blurb"
              name={`${index}.textBlurb`}
              inputRef={register()}
              defaultValue={
                liiingoContent.find((element) => element.languages?.[index]?.name === 'Text Blurb')?.languages?.[index]
                  ?.value || ''
              }
              error={!!errors?.textBlurb}
              helperText={errors?.textBlurb?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextButtonField
              name={`${index}.buttonLink`}
              sectionTitle="Add a button"
              register={register}
              formState={formState}
              defaultValue={
                liiingoContent.filter(
                  (element) =>
                    element.liiingoContentType === EnumLocationExhibitTemplatedContentLiiingoContentType['webview']
                )?.[0]?.languages?.[index] || {}
              }
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default TopicForm;
