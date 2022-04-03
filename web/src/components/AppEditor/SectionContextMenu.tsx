import React from 'react';
import { LiiingoContextMenu } from '../Dashboard/CardComponents/Menu/LiiingoContextMenu';

export type SectionContextMenuProps = {
  id: string;
  index: number;
  last: number;
  deleteSection: () => void;
  renameSection: () => void;
  reorderSection: (payload: { oldIndex: number; newIndex: number }) => void;
};

export const SectionContextMenu: React.FC<SectionContextMenuProps> = (props) => {
  const { children, id, index, last, deleteSection, renameSection, reorderSection } = { ...props };

  return (
    <LiiingoContextMenu
      id={id}
      options={[
        {
          text: 'Rename',
          handleClick: renameSection,
        },
        {
          text: 'Delete',
          disabled: last === 0,
          handleClick: deleteSection,
        },
        {
          text: 'Move Up',
          disabled: index === 0,
          handleClick: () => reorderSection({ oldIndex: index, newIndex: index - 1 }),
        },
        {
          text: 'Move Down',
          disabled: index === last,
          handleClick: () => reorderSection({ oldIndex: index, newIndex: index + 1 }),
        },
      ]}
    >
      {children}
    </LiiingoContextMenu>
  );
};
