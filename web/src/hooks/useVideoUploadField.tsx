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
// @ts-ignore
import ReactJWPlayer from 'react-jw-player';
import { ErrorBanner } from '../components/ErrorBanner';
import { PreviewMinHeight } from '../components/SettingsMenuOptions/ImageOption';

export type UseVideoUploadFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  /**
   * The 'register' and 'setValue' functions come from the 'react-hook-forms' library.
   * They should be provided by a useForm() hook:
   *
   *    const { register, setValue } = useForm<MyFormFields>();
   */
  register: UseFormMethods['register'];
  setValue: UseFormMethods['setValue'];

  /**
   * The 'name' property to be used on the form <input> for this field.
   * This will be registered as the form field's name with react-hook-forms.
   *
   * Since 'keyof T' matches `string | number | symbol`, we need to narrow the
   * contraint to only include strings since the register() func will only accept a string
   */
  fieldName: Extract<keyof TFieldValues, string>;
  fieldLabel?: string;
  initialValue: string;
  /**
   * An array of file extensions that will be accepted.
   * i.e. ['.jpg', '.png']
   */
  // acceptedFileTypes?: DropzoneOptions['accept'];

  setDirtiness?: (fieldName: keyof TFieldValues, isDirty: boolean) => void;

  /**
   * The maximum allowed filesize (in bytes), i.e. 5000000 is 5MB
   */
  maxFileSizeBytes?: number;

  /**
   * A validation function that should return either an error message or null (if all validation rules pass successfully)
   */
  validateVideo?: VideoValidator;
};
const defaultProps = {
  fieldLabel: '',
  maxFileSizeBytes: 50000000, // 50MB
  setDirtiness: () => {},
  validateImage: () => null, // Returning null implies that all validation rules were successful
};
export const useVideoUploadField = <TFieldValues extends FieldValues = FieldValues>(
  props: UseVideoUploadFieldProps<TFieldValues>
) => {
  const {
    register,
    setValue,
    fieldName,
    fieldLabel,
    maxFileSizeBytes,
    initialValue,
    setDirtiness /*, validateVideo */,
  } = {
    ...defaultProps,
    ...props,
  };

  const uploadUrlFieldName = `${fieldName}JwpUploadUrl`;

  useEffect(() => {
    register(fieldName);
    register(uploadUrlFieldName);
    setValue(fieldName, initialValue);
  }, [fieldName, register, uploadUrlFieldName, setValue, initialValue]);

  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [fieldHelperText, setFieldHelperText] = useState<string>('');

  const onDropAccepted: DropzoneOptions['onDropAccepted'] = useCallback(
    async (acceptedFiles) => {
      // Do something with the files
      // NOTE: This only supports a single file - subsequent files would overwrite the previous one when setValue() is called
      acceptedFiles.forEach((file: File) => {
        setPreviewUrl(URL.createObjectURL(file));
        setValue(fieldName as unknown as string, file);
        getJWPlayerUploadUrl().then((uploadUrl) => setValue(uploadUrlFieldName, uploadUrl));
      });

      const validationErrorMessage = null; //validateVideo(await imageInfo);

      // Set the field helper text even if the error message is NULL so that any previous errors are cleared
      setFieldHelperText(validationErrorMessage ?? '');

      setDirtiness(fieldName, true);
    },
    [fieldName, setDirtiness, setValue, uploadUrlFieldName]
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
                return `The filesize is too large! Maximum filesize is ${(maxFileSizeBytes / 1000).toFixed(0)}KB`;
              case 'too-many-files':
                return 'You can only drop 1 file here';
              // case 'file-invalid-type':
              //   return Array.isArray(acceptedFileTypes)
              //     ? `That video format isn't supported. Only the following video types can be uploaded: ${acceptedFileTypes.join(
              //         ', '
              //       )}`
              //     : `That video format isn't supported. Only ${acceptedFileTypes} images can be uploaded.`;
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
    // accept: acceptedFileTypes,
    maxFiles: 1,
    maxSize: maxFileSizeBytes,
    noClick: true,
  });

  const getJWPlayerUploadUrlInputProps = (props: any) => {
    return {
      name: uploadUrlFieldName,
      style: { display: 'none' },
      ...props,
    };
  };

  const getBinaryValueInputProps = (props?: DropzoneInputProps | undefined) =>
    getInputProps({ name: fieldName as unknown as string, ...props });

  const videoUploadFieldProps = {
    getRootProps,
    getBinaryValueInputProps,
    getJWPlayerUploadUrlInputProps,
    previewUrl,
    isDragActive,
    name: fieldName,
    label: fieldLabel,
    helperText: fieldHelperText,
    fieldRequirementsText,
  };

  // Why use the 'const' assertion on this array?  Great question.
  // https://stackoverflow.com/questions/61543626/react-typescript-hook-error-this-expression-is-not-callable
  return [VideoUploadField, videoUploadFieldProps, setPreviewUrl] as const;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    videoFieldContent: {
      objectFit: 'contain',
      maxWidth: 267,
      borderRadius: 16,
    },
    dropZone: {
      display: 'flex',
      borderColor: 'gray',
      borderWidth: 2,
      borderStyle: 'dashed',
      borderRadius: 16,
      marginTop: 50,
      width: 267,
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
      fontSize: '0.9em',
    },
    helperText: {
      maxWidth: 250,
    },
    hiddenFormField: {
      display: 'none',
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
type VideoUploadFieldProps = {
  getRootProps: (props?: DropzoneRootProps | undefined) => DropzoneRootProps;
  getJWPlayerUploadUrlInputProps: (
    props?: React.InputHTMLAttributes<HTMLInputElement>
  ) => React.InputHTMLAttributes<HTMLInputElement>;
  getBinaryValueInputProps: (props?: DropzoneInputProps | undefined) => DropzoneInputProps;
  previewUrl: string;
  isDragActive: boolean;
  name: string;
  label: string;
  helperText: string;
  fieldRequirementsText?: string;
};
const VideoUploadField = ({
  getRootProps,
  getJWPlayerUploadUrlInputProps,
  getBinaryValueInputProps,
  previewUrl,
  isDragActive,
  name,
  label,
  helperText,
  fieldRequirementsText,
}: VideoUploadFieldProps) => {
  const classes = useStyles();

  return (
    <>
      <FormControl>
        <InputLabel htmlFor={name}>
          <Typography variant="subtitle2">{label}</Typography>
        </InputLabel>
        <div className={classes.dropZone} {...getRootProps()}>
          {/*
          This component actually renders 2 form inputs (not just 1)
          Here's what's up:
            - When a video file is dropped onto this dropzone, we'll store the binary content in the "binaryValue" Input field and 
              tell the JWPlayer API that we want to upload a new video file.
            - The JWPlayer API will respond with a dynamically-generated URL where we can upload our binary video file.
            - This URL will be stored in the <Input> field below named '{myvideo}-jwp-upload-url' (the Input that gets its
               props from the getJWPlayerUploadUrlInputProps() function)
            - When we actually submit the form, the onSubmit() function will upload the video from the "binaryValue" field to 
              the URL in the "jwp-upload-url" field.
            - The JWPlayer API will respond to the upload with a unique ID for this new video.  That ID is the value that
              we'll actually store in our own backend to reference this video, so we'll REPLACE the value in the "binaryValue" Input field
              with this JWPlayer ID before sending the 'save' request to our own backend.
        */}
          <Input inputProps={{ ...getBinaryValueInputProps() }} />
          {isDragActive ? (
            <p className={classes.videoFieldContent}>Nailed it!</p>
          ) : previewUrl ? (
            previewUrl.includes('blob') ? (
              <video controls className={classes.videoFieldContent}>
                <source src={previewUrl} /> :
              </video>
            ) : (
              <ReactJWPlayer
                playerId={`${name}-jw-player`}
                playerScript="https://cdn.jwplayer.com/libraries/EI5i6PzB.js"
                file={`https://content.jwplatform.com/videos/${previewUrl}.mp4`}
              />
            )
          ) : (
            <>
              <AddCircleOutline className={classes.dropZoneIcon} />
              <span className={classes.dropZoneText}>Drag and drop a video </span>
              {fieldRequirementsText && (
                <Typography className={classes.dropZoneText}>({fieldRequirementsText})</Typography>
              )}
            </>
          )}
        </div>
        {helperText && (
          <FormHelperText error id={`${name}-helper-text`} className={classes.helperText}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
      <Input inputProps={{ ...getJWPlayerUploadUrlInputProps() }} />
    </>
  );
};

/**
 * A validation function that should return either an error message or null (if all validation rules pass successfully)
 */
export type VideoValidator = (something: any) => any; // TODO: implement this

/**
 * Requests a new unique upload URL from the JWPlayer API that we can use to store a new video file.
 * @returns Promise<string> A JWPlayer URL that we can send a binary file upload to
 */
const getJWPlayerUploadUrl = async () => {
  return fetch(`${process.env.REACT_APP_LIIINGO_URL}/content/getJWPUploadLink`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: '{}',
  })
    .then((response) => response.json())
    .then(
      (data) =>
        `https://${data.link.address}${data.link.path}?api_format=json&key=${data.link.query.key}&token=${data.link.query.token}`
    );
};

export type UseVideoOptionFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  initialValue?: string;
  fieldName: Extract<keyof TFieldValues, string>;
  fieldLabel?: string;
  acceptedFileTypes?: DropzoneOptions['accept'];
  maxFileSizeBytes?: number;
  setDirtiness?: (fieldName: keyof TFieldValues, isDirty: boolean) => void;
  validateVideo?: VideoValidator;
  setVideo: (file: File) => void;
};

const defaultVideoProps = {
  acceptedFileTypes: ['video/webm', 'video/mp4'],
  fieldLabel: '',
  setDirtiness: () => {},
  maxFileSizeBytes: 50000000, // 50MB
  validateVideo: () => null, // Returning null implies that all validation rules were successful
};

export const useVideoOptionField = <TFieldValues extends FieldValues = FieldValues>(
  props: UseVideoOptionFieldProps<TFieldValues>
) => {
  const { setDirtiness, fieldName, fieldLabel, initialValue, acceptedFileTypes, maxFileSizeBytes, setVideo } = {
    ...defaultVideoProps,
    ...props,
  };

  const uploadUrlFieldName = `${fieldName}JwpUploadUrl`;

  useEffect(() => {}, [fieldName, initialValue]);

  const [fieldHelperText, setFieldHelperText] = useState<string>('');

  const onDropAccepted: DropzoneOptions['onDropAccepted'] = useCallback(
    async (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        setVideo(file);
      });
      setDirtiness(fieldName, true);
    },
    [fieldName, setDirtiness, setVideo]
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
                return Array.isArray(acceptedFileTypes)
                  ? `That image format isn't supported. Only the following image types can be uploaded: ${acceptedFileTypes.join(
                      ', '
                    )}`
                  : `That image format isn't supported. Only ${acceptedFileTypes} images can be uploaded.`;
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
    accept: acceptedFileTypes,
    maxFiles: 1,
    maxSize: maxFileSizeBytes,
  });

  const getJWPlayerUploadUrlInputProps = (props: any) => {
    return {
      name: uploadUrlFieldName,
      style: { display: 'none' },
      ...props,
    };
  };

  const getBinaryValueInputProps = (props?: DropzoneInputProps | undefined) =>
    getInputProps({ name: fieldName as unknown as string, ...props });

  const videoUploadFieldProps = {
    getRootProps,
    getBinaryValueInputProps,
    getJWPlayerUploadUrlInputProps,
    getInputProps,
    previewUrl: initialValue,
    isDragActive,
    name: fieldName,
    label: fieldLabel,
    helperText: fieldHelperText,
    fieldRequirementsText,
  };

  return [VideoOptionField, videoUploadFieldProps, setVideo] as const;
};

type VideoOptionFieldProps = {
  getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
  getBinaryValueInputProps: (props?: DropzoneInputProps | undefined) => DropzoneInputProps;
  previewUrl: string;
  isDragActive: boolean;
  name: string;
  label: string;
  helperText: string;
  fieldRequirementsText?: string;
};

const VideoOptionField = ({
  getRootProps,
  getBinaryValueInputProps,
  previewUrl,
  isDragActive,
  name,
  helperText,
  fieldRequirementsText,
}: VideoOptionFieldProps) => {
  const classes = useStyles();

  return (
    <>
      <ErrorBanner title="Upload Error" message={helperText} />
      <div className={classes.dropZoneOption} {...getRootProps()}>
        <Input inputProps={{ ...getBinaryValueInputProps() }} />
        {isDragActive ? (
          <Typography>Drop!</Typography>
        ) : previewUrl ? (
          previewUrl.includes('blob') ? (
            <video controls className={classes.videoFieldContent}>
              <source src={previewUrl} /> :
            </video>
          ) : (
            <ReactJWPlayer
              playerId={`${name}-jw-player`}
              playerScript="https://cdn.jwplayer.com/libraries/EI5i6PzB.js"
              file={`https://content.jwplatform.com/videos/${previewUrl}.mp4`}
            />
          )
        ) : (
          <>
            <Typography>Drag and drop a video</Typography>
            {fieldRequirementsText && <Typography variant="body2">({fieldRequirementsText})</Typography>}
          </>
        )}
      </div>
    </>
  );
};
