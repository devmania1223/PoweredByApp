import { Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FileType, Location } from '../../store/models';
import {
  contentChanged,
  contentDelete,
  contentReorder,
  _contents,
  _selectedContent,
} from '../../store/slices/contentSlice';
import {
  linkDialogMenuChange,
  makeChange,
  toggleMlDrawer,
  _activeLanguageCode,
  _focusedContentId,
  _mlOpen,
} from '../../store/slices/editorSlice';
import { changeHeaderLogo, _selectedLocation } from '../../store/slices/locationSlice';
import {
  changeBackground,
  topicContentDelete,
  topicContentReorder,
  _selectedTopic,
} from '../../store/slices/topicSlice';
import { HEADER_LOGO_IMAGE_URL_ID } from '../PhoneViewer/IphoneStatusbar';
import { ActionMenu } from '../SettingsMenuOptions/ActionMenu';
import { ButtonMenu } from '../SettingsMenuOptions/ButtonMenu';
import { ImageMenu } from '../SettingsMenuOptions/ImageMenu';
import { SettingsMenu, SETTINGS_MENU } from '../SettingsMenuOptions/SettingsMenu';
import { VideoMenu } from '../SettingsMenuOptions/VideoMenu';
import { TOPIC_BACKGROUND_IMAGE_ID } from '../TemplateEditor';
import { LiiingoDrawer } from './LiiingoDrawer';
import { OptionGroup } from '../SettingsMenuOptions/OptionGroup';

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

export type RightDrawerProps = {
  isExpanded?: boolean;
  component?: React.ReactNode;
  content?: React.ReactNode;
  topicId?: string;
  location?: Location;
};

const defaultProps = {
  isExpanded: true,
};

export const RightDrawer = (props: RightDrawerProps) => {
  const { isExpanded, component, content } = { ...defaultProps, ...props };
  const classes = useStyles();
  const el1 = document.querySelectorAll('.tox-tinymce-inline');
  for (let i = 0; i < el1.length; i++) {
    if (content !== null && content !== undefined && el1[i] !== null) {
      if (content['type'] !== 'text') {
        el1[i].setAttribute('style', 'display:none');
      }
    } else if (el1[i] !== null) el1[i].setAttribute('style', 'display:none');
  }

  return (
    <LiiingoDrawer anchor="right" isExpanded={isExpanded}>
      <Box className={classes.drawerBox}>
        <Box className={classes.contentBox}>
          {content !== null && content !== undefined && content['type'] === 'text' && (
            <OptionGroup title="Text"></OptionGroup>
          )}
          <div id="tinyToolbarSpot" />
          {component}
        </Box>
      </Box>
    </LiiingoDrawer>
  );
};

export type Fields = {
  bannerImageFile?: File;
  headerLogoImageFile?: File;
  welcomeMessage?: string;
  topicImageFile?: File;
  topicBackgroundImageFile?: File;
};

const RightDrawerContainer = (props: Omit<RightDrawerProps, 'component'>) => {
  const contentId = useSelector(_focusedContentId);
  const content = useSelector(_selectedContent);
  const activeLanguageCode = useSelector(_activeLanguageCode);
  const contentArr = useSelector(_contents);
  const selectedTopic = useSelector(_selectedTopic);
  const selectedLocation = useSelector(_selectedLocation);
  const openMl = useSelector(_mlOpen);
  const length = contentArr?.length;
  const index = contentArr?.findIndex((contentPiece) => contentPiece._id === contentId);
  const languageContent = content?.languages.filter((lang) => lang.language === activeLanguageCode)[0];
  const elementName = languageContent?.fileUrl?.file?.name ?? languageContent?.fileName;
  let component: React.ReactNode;
  const dispatch = useDispatch();

  const setBackgroundCropImage = (image, fileName) => {
    actions.makeChange(true);
    actions.onBackgroundChange({
      name: fileName,
      url: image,
    });
  };

  const setLogoCropImage = (image, fileName) => {
    actions.makeChange(true);
    actions.saveHeaderLogo({
      name: fileName,
      url: image,
    });
  };

  const setContentCropImage = (image, fileName) => {
    actions.makeChange(true);
    actions.onChangeContent({
      content: { language: languageContent?.language, fileUrl: image, fileName: fileName },
    });
  };

  const actions = bindActionCreators(
    {
      onChangeContent: contentChanged,
      saveHeaderLogo: changeHeaderLogo,
      onReorderContent: contentReorder,
      onReorderTopicContent: topicContentReorder,
      onDeleteContent: contentDelete,
      onDeleteTopicContent: topicContentDelete,
      onBackgroundChange: changeBackground,
      onMenuChange: linkDialogMenuChange,
      toggleMlDrawer,
      makeChange,
    },
    dispatch
  );

  if (contentId === HEADER_LOGO_IMAGE_URL_ID) {
    component = (
      <ImageMenu
        name="Logo"
        imageUrl={selectedLocation.headerLogo}
        toCropData={setLogoCropImage}
        setImagePreview={(file) => {
          actions.makeChange(true);
          actions.saveHeaderLogo({
            name: file.name,
            url: URL.createObjectURL(file),
          });
        }}
      />
    );
  }

  if (contentId === TOPIC_BACKGROUND_IMAGE_ID) {
    component = (
      <ImageMenu
        name="Page Background"
        imageUrl={selectedTopic?.exhibitImage}
        toCropData={setBackgroundCropImage}
        setImagePreview={(file) => {
          actions.makeChange(true);
          actions.onBackgroundChange({ name: file.name, url: URL.createObjectURL(file) });
        }}
      />
    );
  }

  if (contentId === SETTINGS_MENU) {
    component = <SettingsMenu open={openMl} setOpen={actions.toggleMlDrawer} />;
  }

  const preparedActionMenu = index >= 0 && (
    <ActionMenu
      multilanguage={selectedLocation.supportedLanguages.length > 1}
      length={length}
      index={index}
      type={content?.type}
      handleReorder={(payload) => {
        actions.makeChange(true);
        actions.onReorderContent(payload);
        actions.onReorderTopicContent(payload);
      }}
      onDeleteContent={(index) => {
        actions.makeChange(true);
        actions.onDeleteContent(index);
        actions.onDeleteTopicContent(index);
      }}
    />
  );

  switch (contentId && content && content?.type) {
    case FileType.text:
      component = preparedActionMenu;
      break;
    case FileType.image:
      component = (
        <>
          <ImageMenu
            languageCode={languageContent?.language}
            name={elementName}
            imageUrl={languageContent?.fileUrl}
            toCropData={setContentCropImage}
            setImagePreview={(file: File) => {
              actions.makeChange(true);
              actions.onChangeContent({
                primary: languageContent?.language === selectedLocation?.defaultLanguage,
                content: {
                  language: languageContent?.language,
                  fileUrl: URL.createObjectURL(file),
                  fileName: `${languageContent?.language}_${file.name}`,
                },
              });
            }}
          />
          {preparedActionMenu}
        </>
      );
      break;
    case FileType.webview:
      component = (
        <>
          <ButtonMenu
            title={languageContent.title}
            url={languageContent.url}
            onChange={(title, url) => {
              actions.makeChange(true);
              actions.onChangeContent({
                content: { language: languageContent?.language, title: title, url: url },
              });
            }}
            onMenuChange={actions.onMenuChange}
          />
          {preparedActionMenu}
        </>
      );
      break;
    case FileType.video:
      const video = languageContent.fileUrl.includes('blob')
        ? languageContent.fileUrl
        : languageContent.content === 'New video'
        ? null
        : languageContent.content;
      component = (
        <>
          <VideoMenu
            languageCode={languageContent?.language}
            name={elementName}
            videoUrl={video}
            setVideo={(file) => {
              actions.makeChange(true);
              actions.onChangeContent({
                primary: languageContent?.language === selectedLocation?.defaultLanguage,
                content: {
                  language: languageContent?.language,
                  fileUrl: URL.createObjectURL(file),
                  fileName: `${languageContent?.language}_${file.name}`,
                },
              });
            }}
          />
          {preparedActionMenu}
        </>
      );
      break;
  }
  const state = { component, content };

  return <RightDrawer {...props} {...state} {...actions} />;
};

export default RightDrawerContainer;
