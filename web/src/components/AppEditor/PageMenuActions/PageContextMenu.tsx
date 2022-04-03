import React from 'react';
import { LiiingoContextMenu } from '../../Dashboard/CardComponents/Menu/LiiingoContextMenu';

export type PageContextMenuProps = {
  topicId: string;
  disableDelete: boolean;
  disableDown: boolean;
  disableUp: boolean;
  renamePage: () => void;
  deletePage: () => void;
  copyPageLink: () => void;
  moveUp: () => void;
  moveDown: () => void;
  checkQrStatus: () => void;
  qrZip: string;
};

export const PageContextMenu: React.FC<PageContextMenuProps> = (props) => {
  const {
    children,
    topicId,
    disableDelete,
    disableDown,
    disableUp,
    renamePage,
    copyPageLink,
    deletePage,
    moveUp,
    moveDown,
    checkQrStatus,
    qrZip,
  } = {
    ...props,
  };

  return (
    <LiiingoContextMenu
      id={topicId}
      onOpen={checkQrStatus}
      options={[
        {
          text: 'Copy Page Link',
          handleClick: copyPageLink,
        },
        {
          text: 'Download Page QR Code',
          handleClick: () => {
            window.location.href = qrZip;
          },
        },
        { text: 'Rename', handleClick: renamePage },
        {
          text: 'Delete',
          disabled: disableDelete,
          handleClick: deletePage,
        },
        {
          text: 'Move Up',
          disabled: disableUp,
          handleClick: moveUp,
        },
        {
          text: 'Move Down',
          disabled: disableDown,
          handleClick: moveDown,
        },
      ]}
    >
      {children}
    </LiiingoContextMenu>
  );
};
