import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Delete from '@material-ui/icons/DeleteOutline';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FileType } from '../../store/models';
import { ContentReorderPayload, _selectedContent, duplicateContent } from '../../store/slices/contentSlice';
import { makeChange } from '../../store/slices/editorSlice';

import { IS_DISMISSED_DELETE, IS_DISMISSED_ML_DELETE } from '../../util/constants';
import { DeleteDialog } from './Dialog/DeleteDialog';
import { Option } from './Option';
import { OptionGroup } from './OptionGroup';
export type ActionMenuProps = {
  multilanguage: boolean;
  length: number;
  index: number;
  type: FileType;
  handleReorder?: (payload: ContentReorderPayload) => void;
  onDeleteContent?: (index: number) => void;
};

export const ActionMenu = (props: ActionMenuProps) => {
  const { multilanguage, length, index, type, handleReorder, onDeleteContent } = { ...props };
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const selectedContent = useSelector(_selectedContent);
  const dispatch = useDispatch();
  const onDuplicateContent = bindActionCreators(duplicateContent, dispatch);
  return (
    <OptionGroup title="Actions">
      <Option
        icon={ArrowUpward}
        label="Move Up"
        clickable={true}
        disabled={index === 0}
        onClick={() => {
          handleReorder({ oldIndex: index, newIndex: index - 1 });
        }}
      />
      <Option
        icon={ArrowDownward}
        label="Move Down"
        clickable={true}
        disabled={index === length - 1}
        onClick={() => {
          handleReorder({ oldIndex: index, newIndex: index + 1 });
        }}
      />
      <Option
        icon={FileCopyIcon}
        label="Duplicate"
        clickable={true}
        onClick={() => {
          makeChange(true);
          onDuplicateContent({
            languages: selectedContent.languages,
            contentType: selectedContent.type,
            index: index,
          });
        }}
      />
      <Option
        icon={Delete}
        label="Delete"
        clickable={true}
        onClick={() => {
          let openDialog: boolean;
          if (multilanguage) {
            openDialog = !localStorage.getItem(IS_DISMISSED_ML_DELETE);
          } else {
            openDialog = !localStorage.getItem(IS_DISMISSED_DELETE);
          }
          if (openDialog) {
            setOpenDeleteDialog(true);
          } else {
            onDeleteContent(index);
          }
        }}
      />
      <DeleteDialog
        multilanguage={multilanguage}
        open={openDeleteDialog}
        type={type}
        handleDelete={() => onDeleteContent(index)}
        handleClose={() => setOpenDeleteDialog(false)}
      />
    </OptionGroup>
  );
};
