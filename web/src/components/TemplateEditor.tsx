import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Droppable } from 'react-beautiful-dnd';
import { Location, Language, Topic, Section } from '../store/models';
import { Focusable } from './Editable/Focusable';
import { IPhoneViewer } from './PhoneViewer/IPhoneViewer';
import { AppContext } from '../context/AppContext';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { _overState, editorContentFocused, editorSetOverState, makeChange } from '../store/slices/editorSlice';
import { changeLocationName, changeCompanyName } from '../store/slices/locationSlice';
import { contentFocused } from '../store/slices/contentSlice';
import { bindActionCreators } from 'redux';
import { colors } from '../theme/palette';
import { LiiingoTooltip } from '../components/LiiingoTooltip';

export const TOPIC_BACKGROUND_IMAGE_ID = 'topicBackgroundImageUrl';
export const ORG_NAME_ID = 'org_name';
export const APP_NAME_ID = 'app_name';

export type TemplateEditorProps = {
  location: Location;
  fields: React.ReactNode[];
  topicBackgroundImageUrl: string;
  onFocusContent: (contentId: string) => void;
  isFocusedHeaderLogo: boolean;
  isFocusedBackgroundImage: boolean;
  isFocusedAppName: boolean;
  isFocusedOrgName: boolean;
  headerLogo: string;
  currentTopicId: string;
  activeLanguageCode: Language;
  topics: Topic;
  selectedSection: Section;
};

const defaultProps = {};
export const PreviewMinHeight = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
    },
    header: {
      minHeight: PreviewMinHeight,
      height: 'auto',
      backgroundColor: '#a9a9a9',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      boxSizing: 'border-box',
      position: 'relative',
    },
    companyNameInHeader: {
      display: 'flex',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      color: 'white',
      position: 'absolute',
      bottom: 60,
      left: 10,
    },
    appNameInHeader: {
      display: 'flex',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      color: 'white',
      position: 'absolute',
      bottom: 20,
      left: 10,
    },
    orgNameSubtitleInHeader: {
      display: 'flex',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize - 1,
      color: 'white',
      fontWeight: 'bold',
    },
    appNameSubtitleInHeader: {
      display: 'flex',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize - 1,
      color: 'white',
    },
    horizontalMenu: {
      display: 'flex',
      overflow: 'hidden',
      borderBottom: '2px solid #dedede',
      padding: '8px 0px',
    },
    horizontalMenuItem: {
      whiteSpace: 'nowrap',
      padding: '0 5px',
    },
    horizontalMenuItemText: {
      margin: 0,
    },
    horizontalMenuItemTypography: {
      fontSize: 9,
      color: '#8c8c8c',
    },
    contentAreaBelowHorizontalMenu: {
      padding: '0 5px',
    },
    topicImageRoot: {
      display: 'flex',
      flex: 1,
      marginBottom: 8,
    },
    topicDotContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: '2em',
    },
    topicDot: {
      border: '3px solid #555555',
      width: 5,
      height: 5,
      borderRadius: 2,
    },
    topicImageImage: {
      width: '100%',
      objectFit: 'contain',
    },
    welcomeTitle: {},
    welcomeMessage: {
      paddingBottom: 46,
    },
    address: {
      textAlign: 'center',
      paddingBottom: 16,
    },
    hoursOfService: {
      textAlign: 'center',
      paddingBottom: 16,
    },
    jwPlayerRoot: {
      display: 'flex',
      marginTop: 10,
      width: '100%',
      height: 130,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    buttonName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#ffffff',
      padding: 20,
    },
    buttonImage: {
      alignItems: 'center',
      width: '100%',
      height: '100%',
      borderRadius: 5,
    },
    placeholder: {
      height: 188,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    orgName: {
      fontFamily: 'Open Sans, sans-serif',
      fontSize: 12,
      lineHeight: 32,
      color: colors.grayDark,
      border: 0,
    },
  })
);

export const TemplateEditor = (props: TemplateEditorProps) => {
  const {
    fields,
    location,
    topicBackgroundImageUrl,
    onFocusContent,
    isFocusedHeaderLogo,
    isFocusedBackgroundImage,
    isFocusedAppName,
    isFocusedOrgName,
    headerLogo,
    activeLanguageCode,
    currentTopicId,
    topics,
    selectedSection,
  } = {
    ...defaultProps,
    ...props,
  };
  const { name: appName } = location || {};
  const classes = useStyles();
  const context = useContext(AppContext);

  let defaultName;
  let companyName;

  if (context.identity.firstName && context.identity.lastName)
    defaultName = `${context.identity.firstName} ${context.identity.lastName}`;
  else if (!context.identity.firstName) defaultName = context.identity.lastName;
  else if (!context.identity.lastName) defaultName = context.identity.firstName;
  else defaultName = location.companyName;

  companyName = location.companyName;

  const pageName =
    topics.length > 0
      ? topics
          .find((topic) => topic.id === currentTopicId)
          ?.name.find((topicName) => topicName.language === activeLanguageCode)?.name
      : defaultName;
  const sectionName =
    selectedSection !== null
      ? selectedSection?.name.find((sectionName) => sectionName.language === activeLanguageCode)?.name
      : defaultName;

  const overState = useSelector(_overState);
  const ref = useRef(null);
  return (
    <IPhoneViewer
      onFocusContent={onFocusContent}
      isFocused={isFocusedHeaderLogo}
      logoUrl={headerLogo}
      appName={appName}
    >
      <Box className={classes.container}>
        <Focusable
          isFocused={isFocusedBackgroundImage}
          onFocus={() => {
            if (!overState) {
              onFocusContent(TOPIC_BACKGROUND_IMAGE_ID);
            }
          }}
          label={isFocusedBackgroundImage || !overState ? 'Banner Image' : ''}
        >
          <Box
            className={classes.header}
            onClick={() => {
              ref?.current?.focus();
            }}
          >
            <img
              style={{
                width: 'auto',
                maxWidth: '100%',
                height: PreviewMinHeight,
                minHeight: PreviewMinHeight,
              }}
              alt=""
              src={topicBackgroundImageUrl}
              ref={ref}
              tabIndex={-1}
              onClick={() => {
                ref?.current?.focus();
              }}
            />
          </Box>
        </Focusable>
        <PageHeader
          companyName={companyName}
          appName={appName}
          topicBackgroundImageUrl={topicBackgroundImageUrl}
          isFocusedAppName={isFocusedAppName}
          isFocusedOrgName={isFocusedOrgName}
        />
      </Box>

      <HorizontalMenu menuItemTitles={[sectionName]} />
      <Box className={classes.contentAreaBelowHorizontalMenu}>
        {/* {topicImageUrl && (
          <Box className={classes.topicImageRoot}>
            <img className={classes.topicImageImage} src={topicImageUrl} />
          </Box>
        )} */}
        <Box className={classes.topicDotContainer}>
          <Box className={classes.topicDot}>&nbsp;</Box>
        </Box>

        <Box className={classes.welcomeTitle}>
          <Typography variant="subtitle2" paragraph>
            {pageName}
          </Typography>
        </Box>
        <Droppable droppableId="phoneView">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fields?.length ? (
                fields
              ) : (
                <Box className={classes.placeholder}>
                  <Typography></Typography>
                </Box>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Box>
    </IPhoneViewer>
  );
};

const PageHeader = ({ companyName, appName, topicBackgroundImageUrl, isFocusedAppName, isFocusedOrgName }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const onEditorFocusContent = bindActionCreators(editorContentFocused, dispatch);
  const onEditorSetOverState = bindActionCreators(editorSetOverState, dispatch);
  const onFocusContent = bindActionCreators(contentFocused, dispatch);
  const changeAppName = bindActionCreators(changeLocationName, dispatch);
  const changeOrgName = bindActionCreators(changeCompanyName, dispatch);
  const onMakeChange = bindActionCreators(makeChange, dispatch);
  const handleFocus = useCallback(
    (id: string) => {
      onEditorFocusContent(id);
      onFocusContent(id);
    },
    [onEditorFocusContent, onFocusContent]
  );
  const orgNameRef = useRef(null);
  const appNameRef = useRef(null);

  const [headerAppName, setHeaderAppName] = useState(appName);

  useEffect(() => {
    setHeaderAppName(appName);
  }, [appName]);

  return (
    <>
      <Box className={classes.companyNameInHeader}>
        <div
          onClick={(e) => {
            handleFocus(ORG_NAME_ID);
            onEditorSetOverState(true);
          }}
        >
          <Focusable
            isFocused={isFocusedOrgName}
            onFocus={() => {
              handleFocus(ORG_NAME_ID);
            }}
            label="Organization Name"
            badgeVertical="top"
          >
            <InputBase
              defaultValue={companyName}
              className={classes.orgNameSubtitleInHeader}
              inputRef={orgNameRef}
              onBlur={(e) => {
                if (e.target.value !== companyName) {
                  onMakeChange(true);
                  changeOrgName(e.target.value);
                }
                onEditorSetOverState(false);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  orgNameRef.current.blur();
                }
              }}
              onPointerOver={() => {
                onEditorSetOverState(true);
              }}
              onPointerLeave={() => {
                onEditorSetOverState(false);
              }}
            />
          </Focusable>
        </div>
      </Box>
      <Box className={classes.appNameInHeader}>
        <div
          onClick={(e) => {
            handleFocus(APP_NAME_ID);
            onEditorSetOverState(true);
          }}
        >
          <Focusable
            isFocused={isFocusedAppName}
            onFocus={() => {
              handleFocus(APP_NAME_ID);
            }}
            label="App Name"
            badgeVertical="top"
          >
            <LiiingoTooltip message="Click to rename your app" placement="bottom" delay={2000}>
              <InputBase
                value={headerAppName}
                className={classes.appNameSubtitleInHeader}
                inputRef={appNameRef}
                onChange={(e) => {
                  setHeaderAppName(e.target.value);
                }}
                onBlur={(e) => {
                  if (e.target.value !== appName) {
                    onMakeChange(true);
                    changeAppName(e.target.value);
                  }
                  onEditorSetOverState(false);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    appNameRef.current.blur();
                  }
                }}
                onPointerOver={() => {
                  onEditorSetOverState(true);
                }}
                onPointerLeave={() => {
                  onEditorSetOverState(false);
                }}
              />
            </LiiingoTooltip>
          </Focusable>
        </div>
      </Box>
    </>
  );
};

const HorizontalMenu = ({ menuItemTitles }: { menuItemTitles: string[] }) => {
  const classes = useStyles();
  return (
    <List className={classes.horizontalMenu}>
      {menuItemTitles.map((menuItem, index) => (
        <ListItem key={index} dense disableGutters classes={{ root: classes.horizontalMenuItem }}>
          <LiiingoTooltip message="Rename sections from the Page Toolbox" placement="bottom" delay={2000}>
            <ListItemText
              classes={{ root: classes.horizontalMenuItemText, primary: classes.horizontalMenuItemTypography }}
            >
              {menuItem}
            </ListItemText>
          </LiiingoTooltip>
        </ListItem>
      ))}
    </List>
  );
};
