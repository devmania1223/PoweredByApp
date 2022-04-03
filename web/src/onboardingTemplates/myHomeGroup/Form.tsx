import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Prompt } from 'react-router';
import { useFileUploadFormState } from '../../hooks/useFileUploadFormState';
import { useImageUploadField } from '../../hooks/useImageUploadField';
import { useVideoUploadField } from '../../hooks/useVideoUploadField';
import { EnumLocationExhibitTemplatedContentLiiingoContentType } from '../../types/globalTypes';
import { checkMultipleValidationRules } from '../../util/imageValidators';
import { fullyQualifiedUrlPattern } from '../../util/patternValidators';
import { TemplateForm } from '../templateTypes';

const areYouSureYouWantToLeaveMessage = 'You have unsaved changes! Are you sure you want to leave?';
const DEFAULT_LANGUAGE = 'en';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionsContainer: {
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'flex-start',
      paddingTop: theme.spacing(1),
    },
    formActionButton: {
      width: 125,
      marginLeft: theme.spacing(1),
    },
    hiddenField: {
      display: 'none',
    },
  })
);

const validationMessages = {
  fieldRequired: 'This field is required',
  mustBeValidUrl:
    'This URL doesn\'t look quite right. It should start with "http://" or "https://" and should work if you try it in your web browser.',
};

type Fields = {
  profileImage: string;
  bio: string;
  featuredPropertyHeader: string; // This is a hidden field
  featuredPropertyDescription: string;
  video1: string;
  featuredPropertyImage1: string;
  featuredPropertyImage2: string;
  featuredPropertyImage3: string;
  featuredPropertyLink: string;
  closingPitch: string;
  mainSearchPageLink: string; // This is a hidden field
  viewMyListingsLink: string;
  realtorHomePageLink: string;
};

export const contentMap = {
  profileImage: {
    name: 'Profile Image',
    liiingoContentType: EnumLocationExhibitTemplatedContentLiiingoContentType['image'],
  },
  bio: {
    name: 'Bio',
    liiingoContentType: EnumLocationExhibitTemplatedContentLiiingoContentType['text'],
  },
  video1: {
    name: 'Upload a Video',
    liiingoContentType: EnumLocationExhibitTemplatedContentLiiingoContentType['video'],
  },
  featuredPropertyHeader: {
    name: 'Featured Property Header',
    liiingoContentType: EnumLocationExhibitTemplatedContentLiiingoContentType['text'],
    default: 'Featured Property',
    prefix: '<h1>',
    suffix: '</h1>',
  },
  featuredPropertyDescription: {
    name: 'Featured Property Description',
    liiingoContentType: EnumLocationExhibitTemplatedContentLiiingoContentType['text'],
  },
  featuredPropertyImage1: {
    name: 'Featured Property Image 1',
    liiingoContentType: EnumLocationExhibitTemplatedContentLiiingoContentType['image'],
  },
  featuredPropertyImage2: {
    name: 'Featured Property Image 2',
    liiingoContentType: EnumLocationExhibitTemplatedContentLiiingoContentType['image'],
  },
  featuredPropertyImage3: {
    name: 'Featured Property Image 3',
    liiingoContentType: EnumLocationExhibitTemplatedContentLiiingoContentType['image'],
  },
  featuredPropertyLink: {
    name: 'View this Listing',
    liiingoContentType: EnumLocationExhibitTemplatedContentLiiingoContentType['webview'],
  },
  closingPitch: {
    name: 'Closing Pitch',
    liiingoContentType: EnumLocationExhibitTemplatedContentLiiingoContentType['text'],
  },
  // The MainSearchPageLink is kind of a hack. This is content that will be identical in every templated app, but isn't part of the parent/inherited content.
  // So this won't appear as a form field in the poweredby dashboard, but it will appear in the templated app (after the form is saved the first time)
  mainSearchPageLink: {
    name: 'Search Homes',
    liiingoContentType: EnumLocationExhibitTemplatedContentLiiingoContentType['webview'],
    default: 'https://myhomegroup.com/buysell',
  },
  viewMyListingsLink: {
    name: 'View My Listings',
    liiingoContentType: EnumLocationExhibitTemplatedContentLiiingoContentType['webview'],
  },
  realtorHomePageLink: {
    name: 'Contact Me Today',
    liiingoContentType: EnumLocationExhibitTemplatedContentLiiingoContentType['webview'],
  },
};

const MyHomeGroupTopicForm: TemplateForm = (props) => {
  const classes = useStyles();
  const { liiingoContent, index } = props;

  const {
    register,
    setValue,
    formState: { errors, isDirty, isSubmitting },
  } = useFormContext();

  const { isDirty: fileUploadFieldsAreDirty, setFileUploadFieldDirtiness } = useFileUploadFormState<Fields>();

  const profileImageFieldValue =
    liiingoContent.find((element) => element?.languages?.[index]?.name === 'Profile Image')?.languages?.[index]
      ?.value || '';
  const [ProfileImageField, profileImageFieldProps, setProfileImagePreview] = useImageUploadField({
    register,
    setValue,
    setDirtiness: setFileUploadFieldDirtiness,
    fieldName: `${index}.profileImage` as keyof Fields,
    initialValue: profileImageFieldValue,
    maxFileSizeBytes: 1400000,
    validateImage: checkMultipleValidationRules([]),
  });
  useEffect(() => {
    setProfileImagePreview(profileImageFieldValue);
  }, [profileImageFieldValue, setProfileImagePreview]);

  const property1ImageFieldValue =
    liiingoContent.find((element) => element?.languages?.[index]?.name === 'Featured Property Image 1')?.languages?.[
      index
    ]?.value || '';
  const [FeaturedPropertyImage1Field, featuredPropertyImage1FieldProps, setFeaturedPropertyImage1Preview] =
    useImageUploadField({
      register,
      setValue,
      setDirtiness: setFileUploadFieldDirtiness,
      fieldName: `${index}.featuredPropertyImage1` as keyof Fields,
      initialValue: property1ImageFieldValue,
      maxFileSizeBytes: 1400000,
      validateImage: checkMultipleValidationRules([]),
    });
  useEffect(() => {
    setFeaturedPropertyImage1Preview(property1ImageFieldValue);
  }, [property1ImageFieldValue, setFeaturedPropertyImage1Preview]);

  const property2ImageFieldValue =
    liiingoContent.find((element) => element?.languages?.[index]?.name === 'Featured Property Image 2')?.languages?.[
      index
    ]?.value || '';
  const [FeaturedPropertyImage2Field, featuredPropertyImage2FieldProps, setFeaturedPropertyImage2Preview] =
    useImageUploadField({
      register,
      setValue,
      setDirtiness: setFileUploadFieldDirtiness,
      fieldName: `${index}.featuredPropertyImage2` as keyof Fields,
      initialValue: property2ImageFieldValue,
      maxFileSizeBytes: 1400000,
      validateImage: checkMultipleValidationRules([]),
    });
  useEffect(() => {
    setFeaturedPropertyImage2Preview(property2ImageFieldValue);
  }, [property2ImageFieldValue, setFeaturedPropertyImage2Preview]);

  const property3ImageFieldValue =
    liiingoContent.find((element) => element?.languages?.[index]?.name === 'Featured Property Image 3')?.languages?.[
      index
    ]?.value || '';
  const [FeaturedPropertyImage3Field, featuredPropertyImage3FieldProps, setFeaturedPropertyImage3Preview] =
    useImageUploadField({
      register,
      setValue,
      setDirtiness: setFileUploadFieldDirtiness,
      fieldName: `${index}.featuredPropertyImage3` as keyof Fields,
      initialValue: property3ImageFieldValue,
      maxFileSizeBytes: 1400000,
      validateImage: checkMultipleValidationRules([]),
    });
  useEffect(() => {
    setFeaturedPropertyImage3Preview(property3ImageFieldValue);
  }, [property3ImageFieldValue, setFeaturedPropertyImage3Preview]);

  const videoValue =
    liiingoContent.find((element) => element?.languages?.[index]?.name === 'Upload a Video')?.languages?.[index]
      ?.value || '';
  const [Video1Field, video1FieldProps, setVideo1Preview] = useVideoUploadField({
    register,
    setValue,
    setDirtiness: setFileUploadFieldDirtiness,
    fieldName: `${index}.video1` as keyof Fields,
    initialValue: videoValue,
    maxFileSizeBytes: 100000000,
    validateVideo: checkMultipleValidationRules([]),
  });
  useEffect(() => {
    setVideo1Preview(videoValue);
  }, [videoValue, setVideo1Preview]);

  return (
    <>
      <Prompt when={isDirty || isSubmitting || fileUploadFieldsAreDirty} message={areYouSureYouWantToLeaveMessage} />

      <Typography variant="h5" paragraph>
        Your Realtor Page
      </Typography>

      <form id="template-form">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ProfileImageField {...profileImageFieldProps} label="Profile Image" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              name={`${index}.bio` as keyof Fields}
              label="About Me"
              inputRef={register}
              defaultValue={
                liiingoContent.find((element) => element.languages?.[index]?.name === 'Bio')?.languages?.[index]
                  ?.value || ''
              }
              error={!!errors?.bio}
              helperText={errors?.bio?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              name={`${index}.featuredPropertyHeader` as keyof Fields}
              label="Featured Property Header"
              inputRef={register}
              defaultValue={
                liiingoContent
                  .find((element) => element.languages?.[index]?.name === 'Featured Property Header')
                  ?.languages?.[index]?.value.replace(contentMap.featuredPropertyHeader.prefix, '')
                  .replace(contentMap.featuredPropertyHeader.suffix, '') ||
                (DEFAULT_LANGUAGE === index ? contentMap.featuredPropertyHeader.default : '')
              }
              error={!!errors?.featuredPropertyHeader}
              helperText={errors?.featuredPropertyHeader?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              name={`${index}.featuredPropertyDescription` as keyof Fields}
              label="Featured Property Description"
              inputRef={register}
              defaultValue={
                liiingoContent.find((element) => element.languages?.[index]?.name === 'Featured Property Description')
                  ?.languages?.[index]?.value || ''
              }
              error={!!errors?.featuredPropertyDescription}
              helperText={errors?.featuredPropertyDescription?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Video1Field {...video1FieldProps} label="Upload a video" />
          </Grid>
          <Grid item>
            <FeaturedPropertyImage1Field {...featuredPropertyImage1FieldProps} label="Featured Property Pic #1" />
          </Grid>
          <Grid item>
            <FeaturedPropertyImage2Field {...featuredPropertyImage2FieldProps} label="Featured Property Pic #2" />
          </Grid>
          <Grid item>
            <FeaturedPropertyImage3Field {...featuredPropertyImage3FieldProps} label="Featured Property Pic #3" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              name={`${index}.featuredPropertyLink` as keyof Fields}
              label="Link to Featured Property Listing"
              inputRef={register({
                pattern: {
                  value: fullyQualifiedUrlPattern,
                  message: validationMessages.mustBeValidUrl,
                },
              })}
              defaultValue={
                liiingoContent.find((element) => element.languages?.[index]?.name === 'Featured Property Link')
                  ?.languages?.[index]?.value || ''
              }
              error={!!errors?.featuredPropertyLink}
              helperText={errors?.featuredPropertyLink?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              variant="outlined"
              id="closingPitch"
              name={`${index}.closingPitch` as keyof Fields}
              label="Closing Pitch"
              inputRef={register}
              defaultValue={
                liiingoContent.find((element) => element.languages?.[index]?.name === 'Closing Pitch')?.languages?.[
                  index
                ]?.value || ''
              }
              error={!!errors?.closingPitch}
              helperText={errors?.closingPitch?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              name={`${index}.viewMyListingsLink` as keyof Fields}
              label="'View My Listings' URL"
              inputRef={register({
                pattern: {
                  value: fullyQualifiedUrlPattern,
                  message: validationMessages.mustBeValidUrl,
                },
              })}
              defaultValue={
                liiingoContent.find((element) => element.languages?.[index]?.name === 'View My Listings')?.languages?.[
                  index
                ]?.value || ''
              }
              error={!!errors?.viewMyListingsLink}
              helperText={errors?.viewMyListingsLink?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              name={`${index}.realtorHomePageLink` as keyof Fields}
              label="'Contact Me Today' URL"
              inputRef={register({
                pattern: {
                  value: fullyQualifiedUrlPattern,
                  message: validationMessages.mustBeValidUrl,
                },
              })}
              defaultValue={
                liiingoContent.find((element) => element.languages?.[index]?.name === 'Contact Me Today')?.languages?.[
                  index
                ]?.value || ''
              }
              error={!!errors?.realtorHomePageLink}
              helperText={errors?.realtorHomePageLink?.message}
            />
            <TextField
              className={classes.hiddenField}
              fullWidth
              variant="outlined"
              name={`${index}.mainSearchPageLink` as keyof Fields}
              label={contentMap.mainSearchPageLink.name}
              inputRef={register({
                pattern: {
                  value: fullyQualifiedUrlPattern,
                  message: validationMessages.mustBeValidUrl,
                },
              })}
              defaultValue={DEFAULT_LANGUAGE === index ? contentMap.mainSearchPageLink.default : ''}
              error={!!errors?.mainSearchPageLink}
              helperText={errors?.mainSearchPageLink?.message}
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default MyHomeGroupTopicForm;
