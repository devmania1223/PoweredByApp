import React, { useState } from 'react';
import { LiiingoMenu } from './LiiingoMenu';
import { LiiingoMenuItem } from './LiiingoMenuItem';

export type EditMenuProps = {
  navigateToApp: () => void;
  setDisabled: (disabled: boolean) => void;
  appName: React.MutableRefObject<any>;
};

export const EditMenu = (props: EditMenuProps) => {
  const { navigateToApp, setDisabled, appName } = { ...props };

  const [anchor, setAnchor] = useState(null);

  const renameApp = () => {
    setDisabled(false);
    setTimeout(() => {
      appName.current.focus();
      appName.current.select();
    }, 1);
  };

  return (
    <LiiingoMenu anchor={anchor} setAnchor={setAnchor}>
      <LiiingoMenuItem text="Edit" setAnchor={setAnchor} handleClick={navigateToApp} />
      <LiiingoMenuItem text="Rename" setAnchor={setAnchor} handleClick={renameApp} />
    </LiiingoMenu>
  );
};
