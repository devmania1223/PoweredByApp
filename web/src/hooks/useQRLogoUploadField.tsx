import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createTheme';

import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import WarningIcon from '@material-ui/icons/Warning';
import React, { useCallback, useEffect, useState } from 'react';
import { DropzoneInputProps, DropzoneOptions, DropzoneRootProps, FileRejection, useDropzone } from 'react-dropzone';
import { FieldValues } from 'react-hook-form';
import { colors } from '../theme/palette';
import { IMAGE_ACCEPTABLE_TYPE } from '../util/constants';

const defaultProps = {
  acceptedFileTypes: ['image/jpeg', 'image/png'],
  fieldLabel: '',
  setDirtiness: () => {},
  maxFileSizeBytes: 900000, // limiting file size to 900kb because Liiingo rejects POST uploads larger than 1MB
  validateImage: () => null, // Returning null implies that all validation rules were successful
};

const getImageInfo = async (file: File) => {
  return new Promise<ImageInfo>((resolve) => {
    let reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
          sizeInBytes: file.size,
        });
      };
      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  });
};

const useStyles = makeStyles<Theme, { backgroundColor?: string; borderColor?: string }>({
  imageOptionContent: {
    height: '100%',
    width: 'auto',
    maxWidth: '100%',
    objectFit: 'contain',
  },
  dropZone: (props) => ({
    backgroundColor: props.backgroundColor,
    borderColor: props.borderColor,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 10,
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
  }),
  icon: (props) => ({
    width: 50,
    height: 50,
    color: props.borderColor,
  }),
  failureText: {
    color: colors.redDark,
    textAlign: 'center',
  },
  errorMessage: {
    textAlign: 'center',
  },
  qrDropReq: {
    color: colors.grayLight,
  },
  browsePrompt: {
    color: colors.tealAccent,
    marginTop: 8,
  },
});

type QRLogoUploadFieldProps = {
  getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
  fileTypes: string;
  imagePreviewUrl: string;
  isDragActive: boolean;
  success: boolean;
  failure: boolean;
  name: string;
  label: string;
  helperText: string;
  errorMessage: string;
  fieldRequirementsText?: string;
  isDrag?: boolean;
};

export type ImageInfo = {
  width: number;
  height: number;
  sizeInBytes: number;
};

/**
 * A validation function that should return either an error message or null (if all validation rules pass successfully)
 */
export type ImageValidator = (imageInfo: ImageInfo) => string | null;

export type UseQRLogoUploadFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  initialValue?: string;
  fieldName: Extract<keyof TFieldValues, string>;
  fieldLabel?: string;
  acceptedFileTypes?: DropzoneOptions['accept'];
  maxFileSizeBytes?: number;
  setDirtiness?: (fieldName: keyof TFieldValues, isDirty: boolean) => void;
  validateImage?: ImageValidator;
  setImagePreview: (file: File) => void;
  isDrag?: boolean;
};

export const useQRLogoUploadField = <TFieldValues extends FieldValues = FieldValues>(
  props: UseQRLogoUploadFieldProps<TFieldValues>
) => {
  const {
    setDirtiness,
    fieldName,
    fieldLabel,
    initialValue,
    maxFileSizeBytes,
    validateImage,
    setImagePreview,
    isDrag,
  } = {
    ...defaultProps,
    ...props,
  };

  useEffect(() => {}, [fieldName, initialValue]);

  const [fieldHelperText, setFieldHelperText] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const readableFileTypes = IMAGE_ACCEPTABLE_TYPE;

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const handleFailure = () => {
    setFailure(true);
    setTimeout(() => {
      setFailure(false);
    }, 3000);
  };

  const handleErrorMessage = (rejectedFiles: FileRejection[]) => {
    setErrorMessage(
      rejectedFiles.map(
        (rejectedFile) =>
          rejectedFile.errors.map((error) => {
            switch (error.code) {
              case 'file-too-large':
                return `File is too large.`;
              case 'too-many-files':
                return 'Too many files.';
              case 'file-invalid-type':
                return 'Invalid file type.';
              default:
                return error.message;
            }
          })[0]
      )[0]
    );
    setFieldHelperText(
      rejectedFiles.map(
        (rejectedFile) =>
          rejectedFile.errors.map((error) => {
            switch (error.code) {
              case 'file-too-large':
                return `Upload a file that is ${(maxFileSizeBytes / 1000000).toFixed(0)}MB or less.`;
              case 'too-many-files':
                return 'You can only drop 1 image here';
              case 'file-invalid-type':
                let readable = IMAGE_ACCEPTABLE_TYPE.split(',').reduce((total, current, index, arr) =>
                  arr[index + 1] ? `${total}, ${current}` : `${total} and ${current}`
                );
                return `The image added isn't a supported format. Only ${readable} image formats can be added.`;
              default:
                return error.message;
            }
          })[0]
      )[0]
    );
  };

  const onDropAccepted: DropzoneOptions['onDropAccepted'] = useCallback(
    async (acceptedFiles) => {
      let imageInfo: Promise<ImageInfo>;
      acceptedFiles.forEach((file) => {
        imageInfo = getImageInfo(file);
        setImagePreview(file);
      });
      const validationErrorMessage = validateImage(await imageInfo);
      setFieldHelperText(validationErrorMessage ?? '');
      setDirtiness(fieldName, true);
      handleSuccess();
    },
    [fieldName, setDirtiness, validateImage, setImagePreview]
  );

  const onDropRejected: DropzoneOptions['onDropRejected'] = (rejectedFiles) => {
    handleFailure();
    handleErrorMessage(rejectedFiles);
  };

  const fieldRequirementsText = (maxFileSizeBytes / 1000000).toFixed(1) + 'MB max';

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    onDropRejected,
    accept: IMAGE_ACCEPTABLE_TYPE,
    maxFiles: 1,
    maxSize: maxFileSizeBytes,
  });

  const qrLogoUploadFieldProps = {
    getRootProps,
    getInputProps,
    imagePreviewUrl: initialValue,
    isDragActive,
    success,
    failure,
    name: fieldName,
    label: fieldLabel,
    helperText: fieldHelperText,
    errorMessage,
    fieldRequirementsText,
    fileTypes: readableFileTypes,
    isDrag,
  };

  return [qrLogoUploadFieldProps, QRLogoUploadField] as const;
};

const QRLogoUploadField = ({
  getRootProps,
  getInputProps,
  fileTypes,
  imagePreviewUrl,
  isDragActive,
  success,
  failure,
  name,
  helperText,
  errorMessage,
  fieldRequirementsText,
  isDrag,
}: QRLogoUploadFieldProps) => {
  var styling: { backgroundColor: string; borderColor: string };

  if (success) {
    styling = {
      backgroundColor: colors.greenLight,
      borderColor: colors.greenDark,
    };
  } else if (failure) {
    styling = {
      backgroundColor: colors.redLight,
      borderColor: colors.redDark,
    };
  } else if (isDragActive) {
    styling = {
      backgroundColor: colors.tealAccent20,
      borderColor: colors.tealAccent,
    };
  } else if (isDrag) {
    styling = {
      backgroundColor: colors.pureWhite,
      borderColor: colors.tealAccent,
    };
  } else {
    styling = {
      backgroundColor: colors.pureWhite,
      borderColor: colors.grayLight,
    };
  }

  const classes = useStyles(styling);

  return (
    <>
      <div className={classes.dropZone} {...getRootProps()}>
        <Input inputProps={{ ...getInputProps() }} color="primary" id={name} name={name} />
        {success ? (
          <SuccessfulUpload />
        ) : failure ? (
          <FailedUpload helperText={helperText} errorMessage={errorMessage} />
        ) : (
          <UploadField
            getInputProps={getInputProps}
            imagePreviewUrl={imagePreviewUrl}
            isDragActive={isDragActive || isDrag}
            name={name}
            fieldRequirementsText={fieldRequirementsText}
          />
        )}
      </div>
      <Typography className={classes.qrDropReq} variant="caption">
        Accepted file types: {fileTypes}
      </Typography>
    </>
  );
};

const UploadField = (
  props: Omit<
    QRLogoUploadFieldProps,
    'getRootProps' | 'success' | 'failure' | 'helperText' | 'errorMessage' | 'label' | 'fileTypes'
  >
) => {
  const { getInputProps, name, isDragActive, fieldRequirementsText, imagePreviewUrl } = { ...props };
  const classes = useStyles({ borderColor: isDragActive ? colors.tealAccent : colors.grayLight });

  return (
    <>
      <Input inputProps={{ ...getInputProps() }} color="primary" id={name} name={name} />
      {isDragActive ? (
        <>
          <CloudDownloadIcon className={classes.icon} />
          <Typography>Drop here to upload!</Typography>
          {fieldRequirementsText && (
            <Typography
              className={classes.qrDropReq}
              variant="caption"
            >{`Minimum 100 x 100px. ${fieldRequirementsText}.`}</Typography>
          )}
        </>
      ) : imagePreviewUrl ? (
        <img src={imagePreviewUrl} alt="" className={classes.imageOptionContent} />
      ) : (
        <>
          <CloudDownloadIcon className={classes.icon} />
          <Typography>Drag {' & '} drop your logo.</Typography>
          {fieldRequirementsText && (
            <Typography
              className={classes.qrDropReq}
              variant="caption"
            >{`Minimum 100 x 100px. ${fieldRequirementsText}.`}</Typography>
          )}
          <Typography className={classes.browsePrompt}>Browse to Upload</Typography>
        </>
      )}
    </>
  );
};

const SuccessfulUpload = () => {
  const classes = useStyles({ borderColor: colors.greenDark });
  return (
    <>
      <CheckCircleIcon className={classes.icon} />
      <Typography>Uploaded Successfully</Typography>
    </>
  );
};

const FailedUpload = (props: { helperText: string; errorMessage: string }) => {
  const { helperText, errorMessage } = { ...props };
  const classes = useStyles({ borderColor: colors.redDark });
  return (
    <>
      <WarningIcon className={classes.icon} />
      <Typography>{errorMessage}</Typography>
      <Typography className={classes.failureText}>{helperText}</Typography>
    </>
  );
};
