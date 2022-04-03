import React from 'react';
import { DISMISSED_PAGE_DELETE } from '../../util/constants';
import { LiiingoDeleteDialog } from '../LiiingoDeleteDialog';

export type PageDeleteDialogProps = {
  open: boolean;
  handleDelete: () => void;
  handleClose: () => void;
};

export const PageDeleteDialog = (props: PageDeleteDialogProps) => {
  const { open, handleDelete, handleClose } = { ...props };

  return (
    <LiiingoDeleteDialog
      id={DISMISSED_PAGE_DELETE}
      open={open}
      title="Delete Page?"
      handleClose={handleClose}
      handleDelete={handleDelete}
      firstLine="Deleting this page will remove it from your app permanently."
      secondLine="Are you sure you want to delete this page?"
    />
  );
};
