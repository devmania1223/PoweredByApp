import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createTheme';

import Typography from '@material-ui/core/Typography';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import React, { useCallback, useEffect, useState } from 'react';
import { DropzoneInputProps, DropzoneOptions, DropzoneRootProps, useDropzone } from 'react-dropzone';
import { FieldValues, UseFormMethods } from 'react-hook-form';
import { ErrorBanner } from '../components';
import { PreviewMinHeight } from '../components/SettingsMenuOptions/ImageOption';

import { IMAGE_ACCEPTABLE_TYPE } from '../util/constants';

import { useDispatch } from 'react-redux';
import { setCropImageUrl } from '../store/slices/editorSlice';
import { bindActionCreators } from 'redux';

export type UseImageUploadFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  /**
   * The 'register' and 'setValue' functions come from the 'react-hook-forms' library.
   * They should be provided by a useForm() hook:
   *
   *    const { register, setValue } = useForm<MyFormFields>();
   */
  register: UseFormMethods['register'];
  setValue: UseFormMethods['setValue'];
  initialValue?: string;
  /**
   * The 'name' property to be used on the form <input> for this field.
   * This will be registered as the form field's name with react-hook-forms.
   *
   * Since 'keyof T' matches `string | number | symbol`, we need to narrow the
   * contraint to only include strings since the register() func will only accept a string
   */
  fieldName: Extract<keyof TFieldValues, string>;
  fieldLabel?: string;

  /**
   * An array of file extensions that will be accepted.
   * i.e. ['.jpg', '.png']
   */
  acceptedFileTypes?: DropzoneOptions['accept'];

  /**
   * The maximum allowed filesize (in bytes), i.e. 5000000 is 5MB
   */
  maxFileSizeBytes?: number;

  setDirtiness?: (fieldName: keyof TFieldValues, isDirty: boolean) => void;

  /**
   * A validation function that should return either an error message or null (if all validation rules pass successfully)
   */
  validateImage?: ImageValidator;
};
const defaultProps = {
  acceptedFileTypes: ['image/jpeg', 'image/png'],
  fieldLabel: '',
  setDirtiness: () => {},
  maxFileSizeBytes: 900000, // limiting file size to 900kb because Liiingo rejects POST uploads larger than 1MB
  validateImage: () => null, // Returning null implies that all validation rules were successful
};
export const useImageUploadField = <TFieldValues extends FieldValues = FieldValues>(
  props: UseImageUploadFieldProps<TFieldValues>
) => {
  const { register, setValue, setDirtiness, fieldName, fieldLabel, initialValue, maxFileSizeBytes, validateImage } = {
    ...defaultProps,
    ...props,
  };

  useEffect(() => {
    register(fieldName);
    setValue(fieldName, initialValue);
  }, [fieldName, register, setValue, initialValue]);

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  const [fieldHelperText, setFieldHelperText] = useState<string>('');

  const dispatch = useDispatch();
  const onSetCropImageUrl = bindActionCreators(setCropImageUrl, dispatch);

  const onDropAccepted: DropzoneOptions['onDropAccepted'] = useCallback(
    async (acceptedFiles) => {
      // Do something with the files
      let imageInfo: Promise<ImageInfo>;

      acceptedFiles.forEach((file) => {
        imageInfo = getImageInfo(file);
        setImagePreviewUrl(URL.createObjectURL(file));
        onSetCropImageUrl(URL.createObjectURL(file));
        setValue(fieldName, file);
      });

      const validationErrorMessage = validateImage(await imageInfo);
      // Set the field helper text even if the error message is NULL so that any previous errors are cleared
      setFieldHelperText(validationErrorMessage ?? '');
      setDirtiness(fieldName, true);
    },
    [fieldName, setDirtiness, setValue, validateImage, onSetCropImageUrl]
  );

  const onDropRejected: DropzoneOptions['onDropRejected'] = (rejectedFiles) => {
    setFieldHelperText(
      rejectedFiles
        .map((rejectedFile) =>
          rejectedFile.errors.map((error) => {
            // The error codes come from the react-dropzone library, which also has default error messages
            // for each error but they sound very technical. These are some slightly more user-friendly messages.
            switch (error.code) {
              case 'file-too-large':
                return `The filesize of this image is too large! Maximum filesize is ${(
                  maxFileSizeBytes / 1000
                ).toFixed(0)}KB`;
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
          })
        )
        .filter((errorMessage) => !!errorMessage)
        .join('. ')
    );
  };

  const fieldRequirementsText = (maxFileSizeBytes / 1000000).toFixed(1) + 'MB max';

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    onDropRejected,
    accept: IMAGE_ACCEPTABLE_TYPE,
    maxFiles: 1,
    maxSize: maxFileSizeBytes,
  });

  const imageUploadFieldProps = {
    getRootProps,
    getInputProps,
    imagePreviewUrl,
    isDragActive,
    name: fieldName,
    label: fieldLabel,
    helperText: fieldHelperText,
    fieldRequirementsText,
  };

  // Why use the 'const' assertion on this array?  Great question.
  // https://stackoverflow.com/questions/61543626/react-typescript-hook-error-this-expression-is-not-callable
  return [ImageUploadField, imageUploadFieldProps, setImagePreviewUrl] as const;
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageFieldContent: {
      objectFit: 'contain',
      maxWidth: 140,
    },
    dropZone: {
      display: 'flex',
      borderColor: 'gray',
      borderWidth: 2,
      borderStyle: 'dashed',
      borderRadius: 16,
      marginTop: 50,
      width: 150,
      height: 150,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    dropZoneIcon: {
      width: 50,
      height: 50,
      opacity: 0.5,
    },
    dropZoneText: {
      fontSize: '0.7rem',
    },
    dropZoneHeader: {
      fontSize: '.75rem',
    },
    helperText: {
      maxWidth: 150,
    },
    imageOptionContent: {
      height: '100%',
      width: 'auto',
      maxWidth: '100%',
      objectFit: 'contain',
    },
    dropZoneOption: {
      display: 'flex',
      width: '100%',
      minHeight: PreviewMinHeight,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      overflow: 'hidden',
    },
  })
);
type ImageUploadFieldProps = {
  getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
  imagePreviewUrl: string;
  isDragActive: boolean;
  name: string;
  label: string;
  helperText: string;
  fieldRequirementsText?: string;
};
const ImageUploadField = ({
  getRootProps,
  getInputProps,
  imagePreviewUrl,
  isDragActive,
  name,
  label,
  helperText,
  fieldRequirementsText,
}: ImageUploadFieldProps) => {
  const classes = useStyles();

  return (
    <FormControl>
      <InputLabel htmlFor={name}>
        <Typography variant="subtitle2" className={classes.dropZoneHeader}>
          {label}
        </Typography>
      </InputLabel>
      <div className={classes.dropZone} {...getRootProps()}>
        <Input inputProps={{ ...getInputProps() }} color="primary" id={name} name={name} />
        {isDragActive ? (
          <p className={classes.imageFieldContent}>Nailed it!</p>
        ) : imagePreviewUrl ? (
          <img src={imagePreviewUrl} alt="" className={classes.imageFieldContent} />
        ) : (
          <>
            <AddCircleOutline className={classes.dropZoneIcon} />
            <Typography variant="body2" className={classes.dropZoneText}>
              Drag and drop an image
            </Typography>
            {fieldRequirementsText && <Typography variant="body2">({fieldRequirementsText})</Typography>}
          </>
        )}
      </div>
      {helperText && (
        <FormHelperText error id={`${name}-helper-text`} className={classes.helperText}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export type ImageInfo = {
  width: number;
  height: number;
  sizeInBytes: number;
};

export type ErrInfo = {
  code: string;
  message: string;
};

/**
 * A validation function that should return either an error message or null (if all validation rules pass successfully)
 */
export type ImageValidator = (imageInfo: ImageInfo) => string | null;

export type UseImageOptionFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  initialValue?: string;
  fieldName: Extract<keyof TFieldValues, string>;
  fieldLabel?: string;
  acceptedFileTypes?: DropzoneOptions['accept'];
  maxFileSizeBytes?: number;
  setDirtiness?: (fieldName: keyof TFieldValues, isDirty: boolean) => void;
  validateImage?: ImageValidator;
  setImagePreview: (file: File) => void;
};

export const useImageOptionField = <TFieldValues extends FieldValues = FieldValues>(
  props: UseImageOptionFieldProps<TFieldValues>
) => {
  const { setDirtiness, fieldName, fieldLabel, initialValue, maxFileSizeBytes, validateImage, setImagePreview } = {
    ...defaultProps,
    ...props,
  };

  useEffect(() => {}, [fieldName, initialValue]);

  const [fieldHelperText, setFieldHelperText] = useState<string>('');

  const dispatch = useDispatch();
  const onSetCropImageUrl = bindActionCreators(setCropImageUrl, dispatch);

  const onDropAccepted: DropzoneOptions['onDropAccepted'] = useCallback(
    async (acceptedFiles) => {
      let imageInfo: Promise<ImageInfo>;
      acceptedFiles.forEach((file) => {
        setImagePreview(file);
        imageInfo = getImageInfo(file);
        onSetCropImageUrl(URL.createObjectURL(file));
      });
      const validationErrorMessage = validateImage(await imageInfo);
      setFieldHelperText(validationErrorMessage ?? '');
      setDirtiness(fieldName, true);
    },
    [fieldName, setDirtiness, validateImage, setImagePreview, onSetCropImageUrl]
  );

  const onDropRejected: DropzoneOptions['onDropRejected'] = (rejectedFiles) => {
    setFieldHelperText(
      rejectedFiles
        .map((rejectedFile) =>
          rejectedFile.errors.map((error) => {
            switch (error.code) {
              case 'file-too-large':
                return `The filesize of this image is too large! Maximum filesize is ${(
                  maxFileSizeBytes / 1000
                ).toFixed(0)}KB`;
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
          })
        )
        .filter((errorMessage) => !!errorMessage)
        .join('. ')
    );
  };

  const fieldRequirementsText = (maxFileSizeBytes / 1000000).toFixed(1) + 'MB max';

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    onDropRejected,
    accept: IMAGE_ACCEPTABLE_TYPE,
    maxFiles: 1,
    maxSize: maxFileSizeBytes,
  });

  const imageUploadFieldProps = {
    getRootProps,
    getInputProps,
    imagePreviewUrl: initialValue,
    isDragActive,
    name: fieldName,
    label: fieldLabel,
    helperText: fieldHelperText,
    fieldRequirementsText,
  };

  return [ImageOptionField, imageUploadFieldProps, setImagePreview] as const;
};

const ImageOptionField = ({
  getRootProps,
  getInputProps,
  imagePreviewUrl,
  isDragActive,
  name,
  helperText,
  fieldRequirementsText,
}: ImageUploadFieldProps) => {
  const classes = useStyles();

  return (
    <>
      <ErrorBanner title="Upload Error" message={helperText} />
      <div className={classes.dropZoneOption} {...getRootProps()}>
        <Input inputProps={{ ...getInputProps() }} color="primary" id={name} name={name} />
        {isDragActive ? (
          <Typography>Drop!</Typography>
        ) : imagePreviewUrl ? (
          <img src={imagePreviewUrl} alt="" className={classes.imageOptionContent} />
        ) : (
          <>
            <Typography>Drag and drop an image</Typography>
            {fieldRequirementsText && <Typography variant="body2">({fieldRequirementsText})</Typography>}
          </>
        )}
      </div>
    </>
  );
};
