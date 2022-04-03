import React, { useState } from 'react';
import { LiiingoContextMenu } from '../Dashboard/CardComponents/Menu/LiiingoContextMenu';
import { LanguageDeleteDialog } from './LanguageDeleteDialog';
import { PrimaryLanguageDeleteDialog } from './PrimaryLanguageDeleteDialog';
import { DISMISSED_LANGUAGE_DELETE } from '../../util/constants';

export type MLContextMenuProps = {
  index: string;
  primary: boolean;
  languageCode: string;
  supported: string[];
  removeLanguage: (languageCode: string) => void;
  changePrimary: (languageCode: string) => void;
};

export const MLContextMenu: React.FC<MLContextMenuProps> = (props) => {
  const { children, primary, index, languageCode, supported, removeLanguage, changePrimary } = { ...props };
  const [openDialog, setOpenDialog] = useState(false);

  const handleChangePrimary = () => changePrimary(languageCode);
  const handleDelete = () => {
    removeLanguage(languageCode);
  };
  const closeDialog = () => setOpenDialog(false);
  const showDialog = () => setOpenDialog(true);

  let options;
  if (!primary) {
    options = [
      {
        text: 'Delete',
        handleClick: !primary && localStorage.getItem(DISMISSED_LANGUAGE_DELETE) ? handleDelete : showDialog,
      },
      {
        text: 'Make Primary',
        handleClick: handleChangePrimary,
      },
    ];
  } else {
    options = [
      {
        text: 'Delete',
        handleClick: !primary && localStorage.getItem(DISMISSED_LANGUAGE_DELETE) ? handleDelete : showDialog,
      },
    ];
  }

  return (
    <LiiingoContextMenu id={index} options={options}>
      {primary ? (
        <PrimaryLanguageDeleteDialog
          open={openDialog}
          current={languageCode}
          supported={supported}
          handleClose={closeDialog}
          handleDelete={handleDelete}
          handleChangePrimary={changePrimary}
        />
      ) : (
        <LanguageDeleteDialog open={openDialog} handleClose={closeDialog} handleDelete={handleDelete} />
      )}
      {children}
    </LiiingoContextMenu>
  );
};
