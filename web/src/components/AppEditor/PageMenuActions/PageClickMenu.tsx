import React, { useState } from 'react';
import { LiiingoMenu } from '../../Dashboard/CardComponents/Menu/LiiingoMenu';
import { LiiingoMenuItem } from '../../Dashboard/CardComponents/Menu/LiiingoMenuItem';
import { LiiingoTooltip } from '../../LiiingoTooltip';

export type PageClickMenuProps = {
  disableDelete: boolean;
  disableDown: boolean;
  disableUp: boolean;
  renamePage: () => void;
  deletePage: () => void;
  copyPageLink: () => void;
  downloadQr: () => void;
  moveUp: () => void;
  moveDown: () => void;
};

export const PageClickMenu = (props: PageClickMenuProps) => {
  const { renamePage, copyPageLink, deletePage, downloadQr, moveUp, moveDown, disableDelete, disableUp, disableDown } =
    {
      ...props,
    };
  const [anchor, setAnchor] = useState(null);

  return (
    <LiiingoTooltip message="Page Options" placement="right" delay={2000}>
      <LiiingoMenu anchor={anchor} setAnchor={setAnchor} color="dark">
        <LiiingoMenuItem text="Copy Page Link" setAnchor={setAnchor} handleClick={copyPageLink} />
        <LiiingoMenuItem text="Download Page QR Code" setAnchor={setAnchor} handleClick={downloadQr} />
        <LiiingoMenuItem text="Delete" setAnchor={setAnchor} handleClick={deletePage} disabled={disableDelete} />
        <LiiingoMenuItem text="Rename Page" setAnchor={setAnchor} handleClick={renamePage} />
        <LiiingoMenuItem text="Move Up" setAnchor={setAnchor} handleClick={moveUp} disabled={disableUp} />
        <LiiingoMenuItem text="Move Down" setAnchor={setAnchor} handleClick={moveDown} disabled={disableDown} />
      </LiiingoMenu>
    </LiiingoTooltip>
  );
};
