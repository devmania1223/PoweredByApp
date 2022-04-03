import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Image from '@material-ui/icons/Image';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FileType } from '../../store/models';
import { _activeLanguageCode, _leftDrawerMenu } from '../../store/slices/editorSlice';
import { _sectionOrder } from '../../store/slices/locationSlice';
import {
  addSection,
  deleteSection,
  reorderSection,
  saveSection,
  selectSection,
  _sections,
  _selectedSection,
  _topicOrder,
} from '../../store/slices/sectionSlice';
import {
  addTopic,
  checkQrStatus,
  deleteTopic,
  renameTopic,
  reorderTopic,
  _selectedTopic,
  _topicIsLoading,
  _topics,
} from '../../store/slices/topicSlice';
import { ButtonOption, ElementMenu, MediaOption, TypographyOption } from '../ElementMenu/ElementMenu';
import { EnumTags } from '../ElementMenu/InsertTypographyOption';
import { AppMenu } from './AppMenu';
import { LiiingoDrawer } from './LiiingoDrawer';
import { QrMenu } from './QrMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerBox: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    contentBox: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
  })
);

export type LeftDrawerProps = {
  locationId: string;
  currentTopicId?: string;
  isExpanded?: boolean;
  component?: React.ReactNode;
};

const ButtonOptions: ButtonOption[] = [
  {
    contentType: FileType.webview,
    buttonText: 'Button',
    hoverText: 'Button',
  },
];

const MediaOptions: MediaOption[] = [
  {
    contentType: FileType.image,
    icon: Image,
    hoverText: 'Image',
  },
  {
    contentType: FileType.video,
    icon: PlayCircleFilled,
    hoverText: 'Video',
  },
];

const TypographyOptions: TypographyOption[] = [
  {
    displayName: 'Heading 1',
    displayVariant: 'h4',
    desc: 'Open Sans, 24px',
    tag: EnumTags['h1'],
  },
  {
    displayName: 'Heading 2',
    displayVariant: 'h5',
    desc: 'Open Sans, 20px',
    tag: EnumTags['h2'],
  },
  {
    displayName: 'Heading 3',
    displayVariant: 'subtitle1',
    desc: 'Open Sans, 16px',
    tag: EnumTags['h3'],
  },
  {
    displayName: 'Heading 4',
    displayVariant: 'subtitle2',
    desc: 'Open Sans, 14px',
    tag: EnumTags['h4'],
  },
  {
    displayName: 'Paragraph 1',
    displayVariant: 'body1',
    desc: 'Roboto, 16px',
    tag: EnumTags['p'],
  },
];

const defaultProps = {
  isExpanded: true,
};

export const LeftDrawer = (props: LeftDrawerProps) => {
  const classes = useStyles();

  const { isExpanded, component } = {
    ...defaultProps,
    ...props,
  };
  return (
    <LiiingoDrawer anchor="left" isExpanded={isExpanded}>
      <Box className={classes.drawerBox}>
        <Box className={classes.contentBox}>{component}</Box>
      </Box>
    </LiiingoDrawer>
  );
};

const LeftDrawerContainer = (props: LeftDrawerProps) => {
  const { locationId, currentTopicId } = { ...props };

  const dispatch = useDispatch();

  const actions = bindActionCreators(
    {
      addTopic,
      addSection,
      selectSection,
      deleteSection,
      saveSection,
      reorderSection,
      reorderTopic,
      deleteTopic,
      renameTopic,
      checkQrStatus,
    },
    dispatch
  );

  const leftDrawerMenuOption = useSelector(_leftDrawerMenu);
  const sections = useSelector(_sections);
  const sectionOrder = useSelector(_sectionOrder);
  const selectedSection = useSelector(_selectedSection);
  const topics = useSelector(_topics);
  const activeLanguageCode = useSelector(_activeLanguageCode);
  const topicOrder = useSelector(_topicOrder);
  const topicLoading = useSelector(_topicIsLoading);
  const topic = useSelector(_selectedTopic);

  const appMenuState = {
    language: activeLanguageCode,
    sections,
    selectedSection,
    topics,
    sectionOrder,
    topicOrder,
    topicLoading,
    topic,
  };

  let component: React.ReactNode;

  switch (leftDrawerMenuOption) {
    case 'page':
      component = <AppMenu {...actions} {...appMenuState} locationId={locationId} currentTopicId={currentTopicId} />;
      break;
    case 'element':
      component = (
        <ElementMenu mediaOptions={MediaOptions} typographyOptions={TypographyOptions} buttonOptions={ButtonOptions} />
      );
      break;
    case 'qr':
      component = <QrMenu {...appMenuState} />;
  }

  const state = { component };

  return <LeftDrawer {...props} {...state} />;
};

export default LeftDrawerContainer;
