import { LiiingoContextMenu } from './LiiingoContextMenu';
import { LiiingoSuccessSnackbar } from '../../../LiiingoSuccessSnackbar';

import React, { useState } from 'react';

export type QRContextMenuProps = {
  qrLinkPath: string;
  qrZipPath: string;
};

export const QRContextMenu: React.FC<QRContextMenuProps> = (props) => {
  const { children, qrLinkPath, qrZipPath } = { ...props };
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrLinkPath);
    setCopySuccess(true);
  };

  const download = () => {
    window.location.href = qrZipPath || undefined;
  };
  return (
    <>
      <LiiingoContextMenu
        id="editcontextMenu1"
        options={[
          {
            text: 'Copy Link',
            handleClick: copyToClipboard,
          },
          {
            text: 'Download',
            handleClick: download,
          },
        ]}
      >
        {children}
      </LiiingoContextMenu>
      <LiiingoSuccessSnackbar
        open={copySuccess}
        text="Link copied successfully"
        onClose={() => setCopySuccess(false)}
      />
    </>
  );
};
