import { useMutation, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createStyles } from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { ReactNode, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AppContext } from '../context/AppContext';
import { useImageUploadField } from '../hooks/useImageUploadField';
import { GET_LOCATION_FOR_USER, UPDATE_LOCATION_MEDIA } from '../services/schema';
import { getLocationForUser } from '../types/getLocationForUser';
import { updateLocationMedia } from '../types/updateLocationMedia';
import {
  checkMultipleValidationRules,
  recommend2To1LandscapeAspectRatio,
  recommendSquareAspectRatio,
} from '../util/imageValidators';
import { withoutDefault } from '../util/withoutDefault';
import { Throbber } from './';
import { FlatButton } from './Buttons';

const useStyles = makeStyles((theme) =>
  createStyles({
    actionsContainer: {
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'flex-start',
    },
    formActionButton: {
      width: 125,
      marginLeft: 8,
    },
    infoIcon: {
      cursor: 'pointer',
    },
    formControl: {},
    popoverContainer: {
      padding: 24,
    },
    formFieldTopLabel: {
      // A little extra space between this label and the form field below to allow for the MUI formLabel 'shrink' effect
      marginBottom: theme.spacing(1),
    },
  })
);
export type OrganizationAppContentFormProps = {
  onSuccess: (response: updateLocationMedia) => void;
  submitButtonLabel?: ReactNode;
  /**
   * The intent of the onCancel function is to allow a user to back out of the form without submitting. This should return to the previous view.
   * If no onCancel function is provided, the "Cancel" button will have a default no-op click handler attached (the button won't do anything when clicked)
   */
  onCancel: () => void;
  cancelButtonLabel?: ReactNode;
  /**
   * If an onSkip function is provided, the "Skip" link will be displayed, allowing the user to advance through the flow without submitting the form.
   * If no onSkip function is provided, the "Skip" link will be hidden.
   */
  onSkip?: () => void;
  skipButtonLabel?: ReactNode;
  onError?: (error: any) => void;
};

// All fields are optional to allow registration when the user doesn't know all their details up front.
export type Fields = {
  bannerImageFile?: File;
  headerLogoImageFile?: File;
  welcomeMessage?: string;
  topicImageFile?: File;
  topicBackgroundImageFile?: File;
};

const noOp = () => {};

export const OrganizationAppContentForm = (props: OrganizationAppContentFormProps) => {
  const {
    onSuccess,
    submitButtonLabel = 'Save',
    onCancel = noOp,
    cancelButtonLabel = 'Cancel',
    onSkip = null,
    skipButtonLabel = 'Skip',
    onError = noOp,
  } = props;
  const { identity } = useContext(AppContext);

  const { register, handleSubmit, setValue } = useForm<Fields>({
    criteriaMode: 'all',
    mode: 'onBlur',
  });

  const [BannerImageField, bannerImageFieldProps, setBannerImagePreview] = useImageUploadField({
    register,
    setValue,
    fieldName: 'bannerImageFile',
    validateImage: checkMultipleValidationRules([recommend2To1LandscapeAspectRatio]),
  });

  const [HeaderLogoImageField, headerLogoImageFieldProps, setHeaderLogoImagePreview] = useImageUploadField({
    register,
    setValue,
    fieldName: 'headerLogoImageFile',
    validateImage: checkMultipleValidationRules([recommendSquareAspectRatio]),
  });

  const [TopicBackgroundImageField, topicBackgroundImageFieldProps, setTopicBackgroundImagePreview] =
    useImageUploadField({
      register,
      setValue,
      fieldName: 'topicBackgroundImageFile',
    });

  const { loading, data } = useQuery<getLocationForUser>(GET_LOCATION_FOR_USER, {
    variables: {
      sub: identity?.id,
    },
    onError: onError,
    onCompleted: (data) => {
      setBannerImagePreview(data?.user?.location?.headerImageUrl || '');
      setHeaderLogoImagePreview(data?.user?.location?.headerLogoImageUrl || '');
      setTopicBackgroundImagePreview(data?.user?.location?.topicBackgroundImageUrl || '');
    },
  });
  const [updateLocationMediaMutation, { loading: saving }] = useMutation<updateLocationMedia>(UPDATE_LOCATION_MEDIA, {
    onCompleted: onSuccess,
    onError: onError,
  });

  const classes = useStyles();

  // const [visiblePopoverId, setVisiblePopoverId] = useState<string>('');
  // const [popoverAnchorElement, setPopoverAnchorElement] = useState<HTMLButtonElement | null>(null); // Only one Popover can be open at a time
  // const handleClosePopover = () => {
  //   setVisiblePopoverId('');
  //   setPopoverAnchorElement(null);
  // };
  // // This is a curry function that builds the onClick handler for a Popover Button.
  // const linkToPopoverId = (id: string) => (e: MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   setPopoverAnchorElement(e.currentTarget);
  //   setVisiblePopoverId(id);
  // };

  const onSubmit = async (fields: Fields) => {
    updateLocationMediaMutation({
      variables: {
        id: data?.user?.location?._id,
        headerImageFile: fields.bannerImageFile,
        headerLogoImageFile: fields.headerLogoImageFile,
        topicBackgroundImageFile: fields.topicBackgroundImageFile,
      },
    });
  };

  return (
    <>
      <Throbber withOverlay={true} isVisible={loading || saving} />
      <form id="organization-app-content-form">
        <Grid container spacing={2}>
          <Grid item>
            <BannerImageField {...bannerImageFieldProps} label="Banner Image" />
          </Grid>
          <Grid item>
            <HeaderLogoImageField {...headerLogoImageFieldProps} label="Banner Logo" />
          </Grid>
          <Grid item>
            <TopicBackgroundImageField {...topicBackgroundImageFieldProps} label="Topic Background Image" />
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
            {onSkip !== null && (
              <Button variant="text" onClick={onSkip} className={classes.formActionButton}>
                {skipButtonLabel}
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
};
