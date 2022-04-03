import React from 'react';
import { DISMISSED_SECTION_DELETE } from '../../util/constants';
import { LiiingoDeleteDialog } from '../LiiingoDeleteDialog';

export type SectionDeleteDialogProps = {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
};

export const SectionDeleteDialog = (props: SectionDeleteDialogProps) => {
  const { open, handleClose, handleDelete } = { ...props };

  return (
    <LiiingoDeleteDialog
      id={DISMISSED_SECTION_DELETE}
      open={open}
      title="Delete Section?"
      firstLine="Deleting this section will remove it and all pages within the section from your app permanently. Are you sure you want to delete this section?"
      handleDelete={handleDelete}
      handleClose={handleClose}
    />
  );
};
