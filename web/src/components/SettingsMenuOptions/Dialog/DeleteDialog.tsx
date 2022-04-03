import React from 'react';
import { FileType } from '../../../store/models';
import { toString } from '../../../store/models/file/FileType';
import { IS_DISMISSED_DELETE, IS_DISMISSED_ML_DELETE } from '../../../util/constants';
import { LiiingoDeleteDialog } from '../../LiiingoDeleteDialog';

export type DeleteDialogProps = {
  multilanguage: boolean;
  open: boolean;
  type: FileType;
  handleClose: () => void;
  handleDelete: () => void;
};

export const DeleteDialog = (props: DeleteDialogProps) => {
  const { multilanguage, open, type, handleClose, handleDelete } = { ...props };

  const contentType = toString(type);
  const lower = contentType.toLowerCase();

  let id: string;
  let firstLine: string;
  let secondLine: string;

  if (multilanguage) {
    id = IS_DISMISSED_ML_DELETE;
    firstLine = `Deleting this ${lower} will remove it from your app permanently`;
    secondLine = `for all languages. Are you sure you want to delete this ${lower}?`;
  } else {
    id = IS_DISMISSED_DELETE;
    firstLine = `Deleting this ${lower} will remove it from your app permanently. Are you`;
    secondLine = `sure you want to delete this ${lower}?`;
  }

  return (
    <LiiingoDeleteDialog
      id={id}
      open={open}
      title={`Delete ${contentType}`}
      handleClose={handleClose}
      handleDelete={handleDelete}
      firstLine={firstLine}
      secondLine={secondLine}
    />
  );
};
