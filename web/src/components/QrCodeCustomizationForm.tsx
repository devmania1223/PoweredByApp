import { useMutation, useQuery } from '@apollo/client';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { ReactNode, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AppContext } from '../context/AppContext';
import { useImageUploadField } from '../hooks/useImageUploadField';
import { GET_LOCATION_FOR_USER, UPDATE_LOCATION_QR_CODE } from '../services/schema';
import { getLocationForUser } from '../types/getLocationForUser';
import { updateLocation } from '../types/updateLocation';
import { colorHasValidLightness } from '../util/colorBrightnessValidator';
import { checkMultipleValidationRules, recommendSquareAspectRatio } from '../util/imageValidators';
import { withoutDefault } from '../util/withoutDefault';
import { Throbber } from './';
import { FlatButton } from './Buttons';
import { ColorPickerPopoverField } from './ColorPickerPopoverField';
import { LiiingoDemoQrCodeSvg } from './LiiingoDemoQrCodeSvg';

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
    qrActionsContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      width: '60%',
    },
    copyButton: {
      padding: 0,
      paddingLeft: 8,
    },
    downloadButton: {
      paddingLeft: 8,
    },
    liiingoUrl: {
      direction: 'rtl',
    },
    formControl: {},
    popoverContainer: {
      padding: 24,
    },
    formFieldTopLabel: {
      // A little extra space between this label and the form field below to allow for the MUI formLabel 'shrink' effect
      marginBottom: theme.spacing(1),
    },
    logoImageDropzone: {
      display: 'flex',
    },
    qrDownloadLinks: {
      paddingTop: 0,
    },
  })
);
export type QrCodeCustomizationFormProps = {
  onSuccess: (response: updateLocation) => void;
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
  customQrLogoImageFile?: File;
  customQrCodeColors?: {
    primary?: string;
    secondary?: string;
  };
};

const noOp = () => {};

const validationMessages = {
  lightness: 'Please choose a darker color to make your QR code scannable',
  colorRequired: "If you don't want to customize this color, please just choose black from the color-picker",
};

export const QrCodeCustomizationForm = (props: QrCodeCustomizationFormProps) => {
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

  const { register, handleSubmit, setValue, errors, watch, control, formState } = useForm<Fields>({
    criteriaMode: 'all',
    mode: 'onBlur',
  });
  const watchCustomQrCodeColors = watch('customQrCodeColors');

  const [CustomQrLogoImageField, CustomQrLogoImageFieldProps, setCustomQrLogoPreview] = useImageUploadField({
    register,
    setValue,
    fieldName: 'customQrLogoImageFile',
    maxFileSizeBytes: 3000000,
    validateImage: checkMultipleValidationRules([recommendSquareAspectRatio]),
  });

  const { loading, data } = useQuery<getLocationForUser>(GET_LOCATION_FOR_USER, {
    variables: {
      sub: identity?.id,
    },
    onError: onError,
    onCompleted: (data) => {
      setCustomQrLogoPreview(data?.user?.location?.customQrLogoImageUrl ?? '');
      setValue('customQrCodeColors', data?.user?.location?.customQrCodeColors);
    },
  });
  const [updateOrganization, { loading: saving }] = useMutation<updateLocation>(UPDATE_LOCATION_QR_CODE, {
    onCompleted: onSuccess,
    onError: onError,
  });

  const classes = useStyles();

  const onSubmit = async (fields: Fields) => {
    updateOrganization({
      variables: {
        id: data?.user?.location?._id,
        customQrLogoImageFile: fields.customQrLogoImageFile,
        customQrCodeColorPrimary: fields.customQrCodeColors?.primary,
        customQrCodeColorSecondary: fields.customQrCodeColors?.secondary,
      },
    });
  };

  return (
    <>
      <Throbber withOverlay={true} isVisible={loading || saving} />
      <form id="qr-code-customization-form">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ColorPickerPopoverField
              control={control}
              watch={watch}
              id="primaryColor"
              name="customQrCodeColors.primary"
              label="Primary Color"
              rules={{
                required: validationMessages.colorRequired,
                validate: { lightness: (value) => colorHasValidLightness(value) || validationMessages.lightness },
              }}
              defaultValue={data?.user?.location?.customQrCodeColors?.primary ?? ''}
              error={errors?.customQrCodeColors?.primary}
            />
          </Grid>
          <Grid item xs={6}>
            <ColorPickerPopoverField
              control={control}
              watch={watch}
              id="secondaryColor"
              name="customQrCodeColors.secondary"
              label="Secondary Color"
              rules={{
                required: validationMessages.colorRequired,
                validate: { lightness: (value) => colorHasValidLightness(value) || validationMessages.lightness },
              }}
              defaultValue={data?.user?.location?.customQrCodeColors?.secondary ?? ''}
              error={errors?.customQrCodeColors?.secondary}
            />
          </Grid>

          <Grid item xs={12} style={{ display: 'flex' }}>
            <LiiingoDemoQrCodeSvg
              primaryColor={watchCustomQrCodeColors?.primary}
              secondaryColor={watchCustomQrCodeColors?.secondary}
              customQrLogoUrl={CustomQrLogoImageFieldProps.imagePreviewUrl}
            />
            <Box className={classes.logoImageDropzone}>
              <CustomQrLogoImageField {...CustomQrLogoImageFieldProps} label="QR Code Image" />
            </Box>
          </Grid>

          <Grid item xs={12} className={classes.actionsContainer}>
            <FlatButton
              variant="contained"
              onClick={withoutDefault(handleSubmit(onSubmit))}
              color="primary"
              className={classes.formActionButton}
              disabled={!formState.isValid}
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
