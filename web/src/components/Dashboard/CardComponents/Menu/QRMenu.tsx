import React, { useState } from 'react';
import { LiiingoSuccessSnackbar } from '../../../LiiingoSuccessSnackbar';
import { LiiingoMenu } from './LiiingoMenu';
import { LiiingoMenuItem } from './LiiingoMenuItem';

export type QRMenuProps = {
  qrLinkPath: string;
  qrZipPath: string;
};

export const QRMenu = (props: QRMenuProps) => {
  const { qrLinkPath, qrZipPath } = { ...props };
  const [copySuccess, setCopySuccess] = useState(false);
  const [anchor, setAnchor] = useState(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrLinkPath);
    setCopySuccess(true);
  };

  const download = () => {
    window.location.href = qrZipPath || undefined;
  };

  return (
    <>
      <LiiingoMenu anchor={anchor} setAnchor={setAnchor} name="QRMenu">
        <LiiingoMenuItem text="Copy Link" handleClick={copyToClipboard} setAnchor={setAnchor} />
        <LiiingoMenuItem text="Download" handleClick={download} setAnchor={setAnchor} />
      </LiiingoMenu>
      <LiiingoSuccessSnackbar
        open={copySuccess}
        text="Link copied successfully"
        onClose={() => setCopySuccess(false)}
      />
    </>
  );
};
