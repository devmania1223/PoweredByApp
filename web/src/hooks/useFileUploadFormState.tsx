import { useState } from 'react';
import { FieldValues } from 'react-hook-form';

export const useFileUploadFormState = <TFieldValues extends FieldValues = FieldValues>() => {
  const [dirtyFileUploadFields, setDirtyFileUploadFields] = useState([]);

  const isDirty = dirtyFileUploadFields.length > 0;

  const setFileUploadFieldToDirty = (fieldName: keyof TFieldValues) => {
    if (!dirtyFileUploadFields.includes(fieldName)) {
      setDirtyFileUploadFields([...dirtyFileUploadFields, fieldName]);
    }
  };
  const setFileUploadFieldToClean = (fieldName: keyof TFieldValues) => {
    // Remove 'fieldName' from the dirtyFileUploadFields array
    setDirtyFileUploadFields(dirtyFileUploadFields.filter((existingField) => existingField !== fieldName));
  };

  const setFileUploadFieldDirtiness = (fieldName: keyof TFieldValues, isDirty: boolean) => {
    if (isDirty) {
      setFileUploadFieldToDirty(fieldName);
    } else {
      setFileUploadFieldToClean(fieldName);
    }
  };

  return { isDirty, setFileUploadFieldDirtiness };
};
