import React from 'react';
import { LiiingoContextMenu } from './LiiingoContextMenu';

export type EditContextMenuProps = {
  navigateToApp: () => void;
  appName: React.MutableRefObject<any>;
  setDisabled: (disabled: boolean) => void;
};

export const EditContextMenu: React.FC<EditContextMenuProps> = (props) => {
  const { children, navigateToApp, appName, setDisabled } = { ...props };

  const renameApp = () => {
    setDisabled(false);
    setTimeout(() => {
      appName.current.focus();
      appName.current.select();
    }, 1);
  };
  return (
    <LiiingoContextMenu
      id="editcontextMenu1"
      options={[
        {
          text: 'Edit',
          handleClick: navigateToApp,
        },
        {
          text: 'Rename',
          handleClick: renameApp,
        },
      ]}
    >
      {children}
    </LiiingoContextMenu>
  );
};
