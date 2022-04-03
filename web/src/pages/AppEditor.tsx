import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import LeftDrawer from '../components/AppEditor/LeftDrawer';
import { drawerWidth } from '../components/AppEditor/LiiingoDrawer';
import { MenuSelect } from '../components/AppEditor/MenuSelect';
import RightDrawer from '../components/AppEditor/RightDrawer';
import { SaveButton } from '../components/AppEditor/SaveButton';
import { FocusableEditorField } from '../components/Editable/EditorField';
import { Focusable } from '../components/Editable/Focusable';
import { EnumTags } from '../components/ElementMenu/InsertTypographyOption';
import { LeavePageDialog } from '../components/LeavePageDialog';
import { LiiingoFailureSnackbar } from '../components/LiiingoFailureSnackbar';
import { LiiingoTooltip } from '../components/LiiingoTooltip';
import { AppBar, AppBarHeight } from '../components/Navigation/AppBar';
import { HEADER_LOGO_IMAGE_URL_ID } from '../components/PhoneViewer/IphoneStatusbar';
import LanguageDropdown from '../components/ML/LanguageDropDown';
import {
  APP_NAME_ID as APP_NAME,
  ORG_NAME_ID as ORG_NAME,
  TemplateEditor,
  TOPIC_BACKGROUND_IMAGE_ID,
} from '../components/TemplateEditor';
import { InactiveTip, IncognitoTip, MultilanguageTip } from '../components/Tips';
import { OnboardingFlowContext } from '../context/OnboardingFlowContext';
import { useQueryStringParams } from '../hooks/useQueryStringParams';
import { Content, FileType, Language, Location, Section, Topic } from '../store/models';
import {
  addNewContent,
  contentFocused,
  contentReorder,
  ContentReorderPayload,
  saveContents,
  _contentIsLoading,
  _contents,
  _selectedContent,
} from '../store/slices/contentSlice';
import {
  changeLeftDrawerMenu,
  contentUnfocused,
  editorContentFocused,
  editorTopicFocused,
  makeChange,
  removeTip,
  saveFailure as setSaveFailure,
  saveSuccessfully,
  setIsOrg,
  _activeLanguageCode,
  _focusedContentId,
  _leftDrawerMenu,
  _newContentId,
  _newLanguageIds,
  _saveFailure,
  _saveSuccess,
  _saving,
  _tips,
  _unsavedChanges,
  _leftDrawerWidth,
} from '../store/slices/editorSlice';
import {
  changeLocationName,
  fetchLocation,
  leaveWithoutSaving,
  _headerLogo,
  _locationIsLoading,
  _selectedLocation,
  _supportedLanguages,
} from '../store/slices/locationSlice';
import { _selectedSection } from '../store/slices/sectionSlice';
import {
  selectTopic,
  topicContentReorder,
  _topicBackground,
  _topicIsLoading,
  _topics,
} from '../store/slices/topicSlice';
import { colors } from '../theme/palette';
import { LIIINGO_HELP_URL, NEW_LANGUAGE_CONTENT_TIP, PAGE_HIDDEN_TIP, PAGE_INCOGNITO_TIP } from '../util/constants';
import NotFound from './NotFound';

export const APP_NAME_ID = 'name';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appName: {
      fontFamily: 'Open Sans, sans-serif',
      fontSize: 24,
      lineHeight: 32,
      color: colors.grayDark,
      border: 0,
    },
    container: {
      paddingRight: drawerWidth,
      paddingLeft: drawerWidth,
      paddingTop: AppBarHeight,
    },
    box: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      position: 'relative',
      marginTop: 100,
      marginBottom: 40,
    },
    headerBox: {
      zIndex: 1100,
      display: 'flex',
      flexDirection: 'row',
      height: 60,
      justifyContent: 'space-between',
      paddingLeft: 40,
      top: 40,
      position: 'fixed',
      background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), #92A0AC',
    },
    headerBottomBox: {
      zIndex: 1100,
      display: 'flex',
      flexDirection: 'row',
      height: 20,
      background: 'linear-gradient(180deg, #FAFAFB 5.21%, rgba(250, 250, 251, 0) 100%)',
      position: 'fixed',
      top: 100,
    },
    bottomBox: {
      height: 40,
    },
    text: {
      color: colors.pureWhite,
    },
  })
);

type AppEditorProps = {
  activeLanguageCode: Language;
  leftDrawerMenu: string;
  topicId: string;
  location: Location;
  contents: Content[];
  selectedContent: Content;
  loading: boolean;
  focusedContentId?: string;
  logo: string;
  topicBackground: string;
  onFocusContent: (contentId: string) => void;
  onEditorFocusContent: (contentId: string) => void;
  addNewContent: any; //https://xpbytes.com/articles/types-you-should-know-about-typescript/#returntypet-built-in
  onReorderContent: (payload: ContentReorderPayload) => void;
  onReorderTopicContent: (payload: ContentReorderPayload) => void;
  onLeftMenuClick: (menuOption: string) => void;
  saveContents: () => void;
  contentLoading: boolean;
  saving: boolean;
  saveSuccess: boolean;
  saveFailure: boolean;
  changeAppName: (name: string) => void;
  setSaveSuccess: (event?, reason?) => void;
  setSaveFailure: (event?, reason?) => void;
  supportedLanguages: string[];
  unsavedChanges: boolean;
  makeChange: (payload: boolean) => void;
  leaveWithoutSaving: () => void;
  newLanguageIds: string[];
  topics: Topic;
  selectedSection: Section;
  contentUnfocused: () => void;
  removeTip: () => void;
  tips: string[];
  newContentId: string;
  leftDrawerWidth: number;
};

const AppEditor = ({
  topicId,
  leftDrawerMenu,
  location,
  contents,
  selectedContent,
  loading,
  focusedContentId = '',
  logo,
  topicBackground,
  onEditorFocusContent,
  addNewContent,
  onFocusContent,
  activeLanguageCode,
  onReorderContent,
  onReorderTopicContent,
  onLeftMenuClick,
  saveContents,
  contentLoading,
  saving,
  saveSuccess,
  saveFailure,
  changeAppName,
  setSaveSuccess,
  setSaveFailure,
  supportedLanguages,
  unsavedChanges,
  makeChange,
  leaveWithoutSaving,
  newLanguageIds,
  topics,
  selectedSection,
  contentUnfocused,
  removeTip,
  newContentId,
  tips,
  leftDrawerWidth,
}: AppEditorProps) => {
  const classes = useStyles();
  const [editorFields, setEditorFields] = useState([]);
  const [isSave, setIsSave] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);
  const appName = useRef(null);

  const headerWidth = window.innerWidth - leftDrawerWidth - 260;
  const handleReorder = (oldIndex: number, newIndex: number) => {
    makeChange(true);
    onReorderContent({ oldIndex: oldIndex, newIndex: newIndex });
    onReorderTopicContent({ oldIndex: oldIndex, newIndex: newIndex });
  };
  const handleFocus = useCallback(
    (id: string) => {
      onEditorFocusContent(id);
      onFocusContent(id);
    },
    [onEditorFocusContent, onFocusContent]
  );

  const handleAdd = (payload) => {
    makeChange(true);
    addNewContent(payload);
  };

  const checkSave = () => {
    let isCheck = true;
    for (const content of contents) {
      for (let i = 0; i < content.languages.length; i++) {
        if (
          (content.type === 'image' && content.languages[i].fileUrl === '') ||
          (content.type === 'video' &&
            content.languages[i].fileUrl === '' &&
            content.languages[i].content === 'New video')
        ) {
          isCheck = false;
          setIsSave(false);
        }
      }
    }
    if (isCheck) {
      makeChange(false);
      saveContents();
    }
  };

  useEffect(() => {
    const editorFields = contents?.map((contentItem, index) => {
      return (
        <Draggable key={contentItem._id} draggableId={contentItem._id} index={index}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <FocusableEditorField
                key={contentItem._id}
                item={contentItem}
                activeLanguageCode={activeLanguageCode}
                onFocus={() => handleFocus(contentItem._id)}
                isFocused={contentItem._id === focusedContentId}
                newElement={contentItem._id === newContentId}
              />
            </div>
          )}
        </Draggable>
      );
    });

    setEditorFields(editorFields);
  }, [
    activeLanguageCode,
    topicId,
    location,
    selectedContent,
    contents,
    focusedContentId,
    newContentId,
    onFocusContent,
    handleFocus,
  ]);

  if (!location) {
    return null;
  }

  if (!loading && !location) {
    return <NotFound message={`locationId not found`} />;
  }

  const changeName = (e) => {
    if (e.target.value !== location.name) {
      makeChange(true);
      changeAppName(e.target.value);
    }
    contentUnfocused();
  };

  const handleScroll = (e) => {
    setScrollPos(document.documentElement.scrollTop);
  };

  window.addEventListener('scroll', handleScroll, true);

  return (
    <>
      <Container className={classes.container} disableGutters={true} maxWidth={false} onScroll={handleScroll}>
        <LeavePageDialog
          open={unsavedChanges}
          saveContent={checkSave}
          makeChange={makeChange}
          leaveWithoutSaving={leaveWithoutSaving}
        />
        <LiiingoFailureSnackbar open={saveFailure} text="Save Failed" onClose={() => setSaveFailure(false)} />
        <LiiingoFailureSnackbar
          open={!isSave}
          text="Video or Image content is empty. Please upload your files for all languages."
          onClose={() => setIsSave(true)}
        />
        <AppBar
          appBarItems={[
            {
              route: 'profile/engagement',
              displayName: 'Dashboard',
            },
            {
              route: LIIINGO_HELP_URL,
              displayName: 'Help',
            },
          ]}
        />
        <DragDropContext
          onDragStart={(result) => {
            handleFocus(result.draggableId);
          }}
          onDragEnd={(result) => {
            if (result?.destination?.index !== undefined) {
              switch (result?.draggableId) {
                case FileType[result.draggableId]:
                  handleAdd({
                    languages: supportedLanguages,
                    contentType: FileType[result.draggableId],
                    index: result.destination.index,
                  });
                  break;
                case EnumTags[result.draggableId]:
                  handleAdd({
                    languages: supportedLanguages,
                    contentType: FileType.text,
                    index: result.destination.index,
                    tag: result.draggableId,
                  });
                  break;
              }

              if (result?.source?.droppableId === result?.destination?.droppableId) {
                handleReorder(result?.source?.index, result?.destination?.index);
              }
            }
          }}
        >
          {loading ? null : <LeftDrawer locationId={location?.id} currentTopicId={topicId} />}
          <MenuSelect selected={leftDrawerMenu} onLeftMenuClick={onLeftMenuClick} />
          <RightDrawer topicId={topicId} location={location} />
          <Box className={classes.box}>
            <Box className={classes.headerBox} style={{ width: headerWidth, left: leftDrawerWidth }}>
              <div
                onDoubleClick={(e) => {
                  handleFocus(APP_NAME_ID);
                }}
              >
                <Focusable
                  isFocused={focusedContentId === APP_NAME_ID}
                  onFocus={() => {}}
                  label="App Name"
                  badgeVertical="bottom"
                >
                  <LiiingoTooltip message="Double-click to rename your app" placement="bottom" delay={2000}>
                    <InputBase
                      className={classes.appName}
                      defaultValue={location.name}
                      inputRef={appName}
                      onBlur={(e) => {
                        changeName(e);
                      }}
                      onKeyPress={(e) => {
                        if (focusedContentId !== APP_NAME_ID) e.preventDefault();
                        if (e.key === 'Enter') {
                          appName.current.blur();
                        }
                      }}
                      readOnly={focusedContentId !== APP_NAME_ID ? true : false}
                    />
                  </LiiingoTooltip>
                </Focusable>
              </div>
              <LanguageDropdown />
              <SaveButton
                disabled={!unsavedChanges}
                saving={saving}
                success={saveSuccess}
                setSuccess={setSaveSuccess}
                handleSave={checkSave}
              />
            </Box>
            {scrollPos === 0 ? null : (
              <Box className={classes.headerBottomBox} style={{ width: headerWidth, left: leftDrawerWidth }}></Box>
            )}
            <TemplateEditor
              fields={editorFields}
              location={location}
              headerLogo={logo}
              topicBackgroundImageUrl={topicBackground}
              onFocusContent={handleFocus}
              isFocusedHeaderLogo={focusedContentId === HEADER_LOGO_IMAGE_URL_ID}
              isFocusedBackgroundImage={focusedContentId === TOPIC_BACKGROUND_IMAGE_ID}
              isFocusedAppName={focusedContentId === APP_NAME}
              isFocusedOrgName={focusedContentId === ORG_NAME}
              currentTopicId={topicId}
              topics={topics}
              selectedSection={selectedSection}
              activeLanguageCode={activeLanguageCode}
            />
          </Box>
        </DragDropContext>
      </Container>
      {tips[tips.length - 1] === NEW_LANGUAGE_CONTENT_TIP && <MultilanguageTip removeTip={removeTip} />}
      {tips[tips.length - 1] === PAGE_HIDDEN_TIP && <InactiveTip removeTip={removeTip} />}
      {tips[tips.length - 1] === PAGE_INCOGNITO_TIP && <IncognitoTip removeTip={removeTip} />}
    </>
  );
};

const AppEditorContainer = () => {
  const urlParams = useQueryStringParams();
  const locationId = urlParams.get('locationId');
  const topicId = urlParams.get('topicId');
  const topicIsLoading = useSelector(_topicIsLoading);
  const leftDrawerWidth = useSelector(_leftDrawerWidth);

  const { createNewOrganization } = useContext(OnboardingFlowContext);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsOrg(createNewOrganization));
    dispatch(fetchLocation(locationId));
    // fetchLocation will fetchSections and fetchTopics
    // fetchTopics will set the selectedTopic to first item in Topics[]
    // selectTopic will fetchContents
  }, [locationId, createNewOrganization, dispatch]);

  useEffect(() => {
    !topicIsLoading && topicId && dispatch(selectTopic(topicId));
    dispatch(editorTopicFocused(topicId));
  }, [topicId, topicIsLoading, dispatch]);

  const locationIsLoading = useSelector(_locationIsLoading);
  const location = useSelector(_selectedLocation);

  const logo = useSelector(_headerLogo);
  const contents = useSelector(_contents);
  const contentLoading = useSelector(_contentIsLoading);
  const saving = useSelector(_saving);
  const leftDrawerMenu = useSelector(_leftDrawerMenu);
  const activeLanguageCode = useSelector(_activeLanguageCode);
  const focusedContentId = useSelector(_focusedContentId);
  const selectedContent = useSelector(_selectedContent);
  const background = useSelector(_topicBackground);
  const saveSuccess = useSelector(_saveSuccess);
  const saveFailure = useSelector(_saveFailure);
  const supportedLanguages = useSelector(_supportedLanguages);
  const unsavedChanges = useSelector(_unsavedChanges);
  const newLanguageIds = useSelector(_newLanguageIds);
  const selectedSection = useSelector(_selectedSection);
  const topics = useSelector(_topics);
  const tips = useSelector(_tips);
  const newContentId = useSelector(_newContentId);

  const state = {
    activeLanguageCode,
    leftDrawerMenu,
    topicId,
    location,
    contents,
    loading: locationIsLoading,
    contentLoading,
    saving,
    focusedContentId,
    logo,
    topicBackground: background,
    selectedContent,
    saveSuccess,
    saveFailure,
    supportedLanguages,
    unsavedChanges,
    newLanguageIds,
    selectedSection,
    topics,
    newContentId,
    tips,
    leftDrawerWidth,
  };

  const actions = bindActionCreators(
    {
      addNewContent,
      onReorderContent: contentReorder,
      onReorderTopicContent: topicContentReorder,
      onEditorFocusContent: editorContentFocused,
      onFocusContent: contentFocused,
      onLeftMenuClick: changeLeftDrawerMenu,
      saveContents: saveContents,
      changeAppName: changeLocationName,
      setSaveSuccess: saveSuccessfully,
      setSaveFailure: setSaveFailure,
      makeChange,
      leaveWithoutSaving,
      contentUnfocused,
      removeTip,
    },
    dispatch
  );

  return <AppEditor {...state} {...actions} />;
};

export default AppEditorContainer;
