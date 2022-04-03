import { Box, ListItemSecondaryAction } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import ListItem from '@material-ui/core/ListItem';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Check from '@material-ui/icons/Check';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { newTitle, Status, Title } from '../../store/models';
import { removeNewLanguageIds, _activeLanguageCode, _newLanguageIds } from '../../store/slices/editorSlice';
import { colors } from '../../theme/palette';
import { DISMISSED_PAGE_DELETE } from '../../util/constants';
import { DraggableMenuWrapper } from '../ElementMenu/DraggableMenuWrapper';
import { LiiingoSuccessSnackbar } from '../LiiingoSuccessSnackbar';
import LiiingoTriStateToggle from './LiiingoTriStateToggle';
import { PageDeleteDialog } from './PageDeleteDialog';
import { PageContextMenu } from './PageMenuActions';
import { LiiingoTooltip } from '../LiiingoTooltip';
import ShareButton from './ShareButton';

const useStyles = makeStyles<Theme, { dim: boolean }>({
  item: {
    '&.Mui-selected': {
      backgroundColor: colors.grayLight5,
    },
  },
  pageName: (props) => ({
    opacity: props.dim ? 0.5 : 1,
    '&.Mui-focused': {
      borderRadius: 5,
      borderStyle: 'solid',
      borderColor: colors.blueAccent20,
      borderWidth: 0.5,
    },
    '&.Mui-disabled': {
      color: colors.pureBlack,
    },
  }),
  placeholder: {
    width: 30,
  },
  icon: {
    paddingTop: 10,
  },
  secondaryActions: {
    display: 'flex',
  },
});

export type PageMenuItemProps = {
  locationId: string;
  status: number;
  enableSharing: boolean;
  topicId: string;
  topicLink: string;
  index: number;
  last: number;
  selected: boolean;
  qrZip: string;
  displayName?: string;
  disableDelete?: boolean;
  deleteTopic: (topicId: string) => void;
  renameTopic: (payload: { topicId: string; name: Title }) => void;
  moveUp: () => void;
  moveDown: () => void;
  checkQrStatus: () => void;
};

export const PageMenuItem = (props: PageMenuItemProps) => {
  const {
    locationId,
    status,
    enableSharing,
    topicId,
    topicLink,
    index,
    last,
    selected,
    qrZip,
    displayName,
    disableDelete,
    deleteTopic,
    renameTopic,
    moveUp,
    moveDown,
    checkQrStatus,
  } = {
    ...props,
  };
  const [showDialog, setShowDialog] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const pageName = useRef(null);

  // too deep for me to put it in app-editor container; global state doesn't need passed down as props; should only be referenced in component that needs it; etc :)
  const activeLanguageCode = useSelector(_activeLanguageCode);
  const dispatch = useDispatch();
  const removeLanguageId = bindActionCreators(removeNewLanguageIds, dispatch);
  const newLanguageIds = useSelector(_newLanguageIds);
  const thisIsNew = newLanguageIds[activeLanguageCode]?.includes(topicId);

  const classes = useStyles({ dim: thisIsNew });

  const copyPageLink = () => {
    navigator.clipboard.writeText(topicLink);
    setCopySuccess(true);
  };

  const renamePage = () => {
    setDisabled(false);
    setTimeout(() => {
      pageName.current.focus();
      pageName.current.select();
    }, 1);
  };

  const deletePage = () => {
    if (!localStorage.getItem(DISMISSED_PAGE_DELETE)) {
      setShowDialog(true);
    } else {
      deleteTopic(topicId);
    }
  };

  return (
    <DraggableMenuWrapper id={topicId} index={index} showSnapshot={false}>
      <PageDeleteDialog
        open={showDialog}
        handleDelete={() => deleteTopic(topicId)}
        handleClose={() => {
          setShowDialog(false);
          setShowOptions(false);
        }}
      />
      <PageContextMenu
        topicId={topicId}
        disableDelete={disableDelete}
        disableUp={index === 0}
        disableDown={last === index}
        qrZip={qrZip}
        renamePage={renamePage}
        deletePage={deletePage}
        copyPageLink={copyPageLink}
        moveUp={moveUp}
        moveDown={moveDown}
        checkQrStatus={checkQrStatus}
      >
        <ListItem
          button
          onMouseEnter={() => setShowOptions(true)}
          onMouseLeave={() => setShowOptions(false)}
          key={topicId}
          classes={{ root: classes.item }}
          component={Link}
          to={`app-editor?locationId=${locationId}&topicId=${topicId}`}
          selected={selected}
        >
          <LiiingoTooltip message="Right-click for page options" placement="right" delay={2000}>
            <LiiingoSuccessSnackbar
              open={copySuccess}
              text="Link copied successfully"
              onClose={() => setCopySuccess(false)}
            />
            {showOptions ? (
              <DragIndicatorIcon fontSize="medium" className={classes.icon} />
            ) : selected ? (
              <Check className={classes.icon} />
            ) : (
              <div className={classes.placeholder} />
            )}
            <InputBase
              onDoubleClick={renamePage}
              disabled={disabled}
              inputRef={pageName}
              fullWidth={false}
              className={classes.pageName}
              defaultValue={displayName}
              onFocus={() => {
                thisIsNew && removeLanguageId({ language: activeLanguageCode, ids: [topicId] });
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  pageName.current.blur();
                }
              }}
              onBlur={(e) => {
                setDisabled(true);
                let pageTitle = e.target.value;
                if (!pageTitle) {
                  // If the field is left empty, default back to the previous page name
                  e.target.value = displayName;
                  return;
                }
                pageTitle = newTitle({ name: pageTitle, language: activeLanguageCode });
                renameTopic({ topicId: topicId, name: pageTitle });
              }}
            />
          </LiiingoTooltip>
          {(showOptions || showSecondary || status !== Status.Live || !enableSharing) && (
            <ListItemSecondaryAction
              onMouseEnter={() => setShowSecondary(true)}
              onMouseLeave={() => setShowSecondary(false)}
            >
              <Box className={classes.secondaryActions}>
                {(showOptions || showSecondary || !enableSharing) && (
                  <ShareButton initialShareStatus={enableSharing} topicId={topicId} />
                )}
                {(showOptions || showSecondary || status !== Status.Live) && (
                  <LiiingoTriStateToggle topicId={topicId} status={status} />
                )}
              </Box>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      </PageContextMenu>
    </DraggableMenuWrapper>
  );
};
