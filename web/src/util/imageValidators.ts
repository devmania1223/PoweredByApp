import { ImageValidator } from '../hooks/useImageUploadField';

export const checkMultipleValidationRules =
  (validators: ImageValidator[]): ImageValidator =>
  (imageInfo) => {
    return validators
      .map((validator) => validator(imageInfo)) // Execute the validator function and return the error message (or null)
      .filter((errorMessage) => !!errorMessage) // Remove empty error messages from the array
      .join('. '); // Join all remaining error messages into a single string, with .'s between each message.
  };

export const recommendSquareAspectRatio: ImageValidator = ({ width, height }) => {
  // Allow width and height to differ by 3% without nagging
  return Math.abs(width - height) / width < 0.03 ? null : 'This image will work, but square images look best';
};

export const recommend2To1LandscapeAspectRatio: ImageValidator = ({ width, height }) => {
  return width === 2 * height
    ? null
    : "This image will work, but it will fit best if you use an image that's twice as wide as it is tall (2:1 landscape)";
};

export const recommendHighSolution: ImageValidator = ({ width, height }) => {
  return width > 100 || height > 100 ? null : `This image will work, but it's better to use a higher resolution image`;
};
