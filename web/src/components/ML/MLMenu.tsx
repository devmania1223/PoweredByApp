import React, { useState } from 'react';
import { DISMISSED_LANGUAGE_DELETE } from '../../util/constants';
import { LiiingoMenu } from '../Dashboard/CardComponents/Menu/LiiingoMenu';
import { LiiingoMenuItem } from '../Dashboard/CardComponents/Menu/LiiingoMenuItem';
import { LanguageDeleteDialog } from './LanguageDeleteDialog';
import { PrimaryLanguageDeleteDialog } from './PrimaryLanguageDeleteDialog';

export type MultilanguageMenuProps = {
  primary: boolean;
  languageCode: string;
  supported: string[];
  removeLanguage: (languageCode: string) => void;
  changePrimary: (languageCode: string) => void;
};

export const MultilanguageMenu = (props: MultilanguageMenuProps) => {
  const { primary, languageCode, supported, removeLanguage, changePrimary } = { ...props };
  const [anchor, setAnchor] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChangePrimary = () => changePrimary(languageCode);
  const handleDelete = () => {
    removeLanguage(languageCode);
  };
  const closeDialog = () => setOpenDialog(false);

  return (
    <LiiingoMenu anchor={anchor} setAnchor={setAnchor}>
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
      <LiiingoMenuItem
        setAnchor={setAnchor}
        text="Delete"
        handleClick={() => {
          !primary && localStorage.getItem(DISMISSED_LANGUAGE_DELETE) ? handleDelete() : setOpenDialog(true);
        }}
      />
      {!primary && <LiiingoMenuItem setAnchor={setAnchor} text="Make Primary" handleClick={handleChangePrimary} />}
    </LiiingoMenu>
  );
};
