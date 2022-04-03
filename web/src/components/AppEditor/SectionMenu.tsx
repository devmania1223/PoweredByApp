import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import ListItem from '@material-ui/core/ListItem';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Language, newTitle, Section } from '../../store/models';
import { removeNewLanguageIds, _newLanguageIds } from '../../store/slices/editorSlice';
import { colors } from '../../theme/palette';
import { DISMISSED_SECTION_DELETE } from '../../util/constants';
import { DraggableMenuWrapper } from '../ElementMenu/DraggableMenuWrapper';
import { DroppableMenuWrapper } from '../ElementMenu/DroppableMenuWrapper';
import { SectionContextMenu } from './SectionContextMenu';
import { SectionDeleteDialog } from './SectionDeleteDialog';
import { LiiingoTooltip } from '../LiiingoTooltip';

const useStyles = makeStyles<Theme, { dim: boolean }>({
  subMenu: {
    justifyContent: 'space-between',
    backgroundColor: colors.grayDark5,
  },
  placeholder: {
    width: 30,
  },
  sectionName: (props) => ({
    fontWeight: 700,
    opacity: props.dim ? 0.5 : 1,
    '&.Mui-focused': {
      backgroundColor: colors.pureWhite,
      borderRadius: 5,
      borderStyle: 'solid',
      borderColor: colors.blueAccent20,
      borderWidth: 0.5,
    },
    '&.Mui-disabled': {
      color: colors.pureBlack,
    },
  }),
});

export type SectionMenuProps = {
  id: string;
  index: number;
  last: number;
  name: string;
  activeLanguageCode: Language;
  expand: boolean;
  selectSection: () => void;
  saveSection: (section: Partial<Section>) => void;
  deleteSection: () => void;
  reorderSection: (payload: { oldIndex: number; newIndex: number }) => void;
};

export const SectionMenu: React.FC<SectionMenuProps> = (props) => {
  const {
    children,
    name,
    index,
    last,
    id,
    activeLanguageCode,
    expand,
    selectSection,
    deleteSection,
    reorderSection,
    saveSection,
  } = {
    ...props,
  };
  const [open, setOpen] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [showDrag, setShowDrag] = useState(false);
  const sectionName = useRef(null);

  useEffect(() => {
    setOpen(true);
  }, [expand, setOpen]);

  // too deep for me to put it in app-editor container; global state doesn't need passed down as props; should only be referenced in component that needs it; etc :)
  const dispatch = useDispatch();
  const removeLanguageId = bindActionCreators(removeNewLanguageIds, dispatch);
  const newLanguageIds = useSelector(_newLanguageIds);
  const thisIsNew = newLanguageIds[activeLanguageCode]?.includes(id);

  const classes = useStyles({ dim: thisIsNew });

  const onClick = () => {
    setOpen(!open);
    if (!open) {
      // NOTE
      // This is used for determining which section will receive a new page
      // Currently the page will be added to the last section unfolded
      selectSection();
    }
  };

  const renameSection = () => {
    selectSection();
    setDisabled(false);
    setTimeout(() => {
      sectionName.current.focus();
      sectionName.current.select();
    }, 1);
  };

  const handleDelete = () => {
    if (localStorage.getItem(DISMISSED_SECTION_DELETE)) {
      deleteSection();
    } else {
      setOpenDialog(true);
    }
  };

  return (
    <DraggableMenuWrapper id={id} index={index} showSnapshot={false}>
      <SectionContextMenu
        id={id}
        index={index}
        last={last}
        deleteSection={handleDelete}
        renameSection={renameSection}
        reorderSection={reorderSection}
      >
        <SectionDeleteDialog open={openDialog} handleClose={() => setOpenDialog(false)} handleDelete={deleteSection} />
        <LiiingoTooltip message="Right-click for section options" placement="right" delay={2000}>
          <ListItem
            className={classes.subMenu}
            onMouseEnter={() => setShowDrag(true)}
            onMouseLeave={() => setShowDrag(false)}
            onClick={onClick}
          >
            {showDrag ? <DragIndicatorIcon fontSize="small" /> : <div className={classes.placeholder}></div>}
            <InputBase
              onDoubleClick={renameSection}
              disabled={disabled}
              inputRef={sectionName}
              fullWidth={false}
              className={classes.sectionName}
              defaultValue={name}
              onFocus={() => {
                thisIsNew && removeLanguageId({ language: activeLanguageCode, ids: [id] });
              }}
              onBlur={(e) => {
                setDisabled(true);
                let sectionTitle = e.target.value;
                if (!sectionTitle) {
                  e.target.value = name;
                  return;
                }
                sectionTitle = newTitle({ name: sectionTitle, language: activeLanguageCode });
                saveSection({ name: sectionTitle });
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  sectionName.current.blur();
                }
              }}
            />
            <IconButton size="small" onClick={onClick}>
              {open ? <ArrowDropUp /> : <ArrowDropDown />}
            </IconButton>
          </ListItem>
        </LiiingoTooltip>
      </SectionContextMenu>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <DroppableMenuWrapper id={id} dropDisabled={false} disableGutters placeholder>
          {children}
        </DroppableMenuWrapper>
      </Collapse>
    </DraggableMenuWrapper>
  );
};
