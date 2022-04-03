import React from 'react';
import { useQRLogoUploadField } from '../../../hooks/useQRLogoUploadField';
import { checkMultipleValidationRules, recommendHighSolution } from '../../../util/imageValidators';

export const PreviewMinHeight = 133;

export type QRLogoOptionProps = {
  isDrag?: boolean;
  imageUrl?: string;
  setImagePreview: (file: File) => void;
};

export const QRLogoOption = (props: QRLogoOptionProps) => {
  const { imageUrl, isDrag, setImagePreview } = { ...props };
  const [qrLogoUploadFieldProps, QRLogoUploadField] = useQRLogoUploadField({
    fieldName: `customQrLogoImageFile`,
    maxFileSizeBytes: 3000000,
    initialValue: imageUrl,
    validateImage: checkMultipleValidationRules([recommendHighSolution]),
    setImagePreview: setImagePreview,
    isDrag: isDrag,
  });

  return <QRLogoUploadField {...qrLogoUploadFieldProps} />;
};
