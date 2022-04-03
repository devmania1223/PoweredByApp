import React from 'react';
import { DISMISSED_LANGUAGE_DELETE } from '../../util/constants';
import { LiiingoDeleteDialog } from '../LiiingoDeleteDialog';

export type LanguageDeleteDialogProps = {
  open: boolean;
  handleDelete: () => void;
  handleClose: () => void;
};

export const LanguageDeleteDialog = (props: LanguageDeleteDialogProps) => {
  const { open, handleDelete, handleClose } = { ...props };
  return (
    <LiiingoDeleteDialog
      id={DISMISSED_LANGUAGE_DELETE}
      open={open}
      title="Delete Language?"
      firstLine="Deleting a language will remove the content in that language."
      secondLine="Are you sure you want to delete this language from your app?"
      handleDelete={handleDelete}
      handleClose={handleClose}
    />
  );
};
