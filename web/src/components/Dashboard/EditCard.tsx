import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import InputBase from '@material-ui/core/InputBase';
import { Theme } from '@material-ui/core/styles/createTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ImageIcon from '@material-ui/icons/Image';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import parse from 'date-fns/parse';
import React, { useRef, useState, useContext } from 'react';
import { Location, Topic } from '../../store/models';
import { colors } from '../../theme/palette';
import { TemplatePreview } from '../TemplatePreview';
import { Throbber } from '../Throbber';
import { EditMenu } from './CardComponents/Menu/EditMenu';
import { LiiingoTooltip } from '../LiiingoTooltip';
import { AppContext } from '../../context/AppContext';
import { EditContextMenu } from './CardComponents/Menu/EditContextMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formCard: {
      backgroundColor: theme.palette.background.paper,
      width: 500,
      height: 100,
      alignItems: 'start',
      '&:hover': {
        borderStyle: 'solid',
        borderColor: colors.tealAccent,
        borderWidth: 1,
        cursor: 'pointer',
      },
    },
    appButton: {
      height: '100%',
      display: 'flex',
    },
    imageBox: {
      width: 100,
      height: 100,
      display: 'flex',
      backgroundColor: colors.grayLight5,
      color: colors.grayMedium,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 37.5,
      height: 37.5,
    },
    content: {
      flex: '1 0 auto',
      textAlign: 'start',
      cursor: 'pointer',
    },
    appName: {
      fontSize: '1.5rem',
      fontWeight: 400,
      lineHeight: '2rem',
      '&:hover': {
        cursor: 'pointer',
      },
      '&.Mui-focused': {
        borderRadius: 5,
        borderStyle: 'solid',
        borderColor: colors.blueAccent20,
        borderWidth: 0.5,
        cursor: 'text',
      },
      '&.Mui-disabled': {
        color: colors.grayLight,
        cursor: 'pointer',
      },
    },
    menu: {
      position: 'relative',
      top: -65,
      left: 465,
    },
    spinnerBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 100,
    },
    arrow: {
      color: colors.grayDark,
    },
    tooltip: {
      backgroundColor: colors.grayDark,
      textAlign: 'center',
    },
  })
);

const lastUpdated = (timestamp) => {
  if (timestamp) {
    const timeframe = formatDistanceToNow(parse(timestamp, 'T', new Date()), { addSuffix: true });
    return `Last updated ${timeframe}`;
  } else {
    return;
  }
};

export type EditCardProps = {
  loading: boolean;
  location: Location;
  topic: Topic;
  changeName: (name: string) => void;
  saveName: () => void;
};

export const EditCard = (props: EditCardProps) => {
  const { loading, location, topic, changeName, saveName } = props;
  const classes = useStyles();
  const appName = useRef(null);
  const [disabledInput, setDisabled] = useState(true);
  const [isOverText, setIsOverText] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const context = useContext(AppContext);

  let companyName;

  if (location !== null) companyName = location.companyName;
  else {
    if (context.identity.firstName && context.identity.lastName)
      companyName = `${context.identity.firstName} ${context.identity.lastName}`;
    else if (!context.identity.firstName) companyName = context.identity.lastName;
    else if (!context.identity.lastName) companyName = context.identity.firstName;
  }

  const navigateToApp = () => {
    if (location !== null && topic !== null) {
      const newWindow = window.open(`../app-editor?locationId=${location.id}&topicId=${topic.id}`, '_self');
      newWindow.focus();
    }
  };

  let timer;
  const renameApp = (e) => {
    clearTimeout(timer);
    if (e.detail === 1 && disabledInput) {
      timer = setTimeout(navigateToApp, 200);
    } else if (e.detail === 2) {
      setDisabled(false);
      setTimeout(() => {
        appName.current.focus();
      }, 1);
    }
  };

  const AppName = (
    <InputBase
      disabled={disabledInput}
      inputRef={appName}
      fullWidth={false}
      className={classes.appName}
      inputProps={{ className: classes.content }}
      defaultValue={location?.name}
      onMouseOver={(e) => {
        setIsOverText(true);
      }}
      onMouseOut={(e) => {
        setIsOverText(false);
      }}
      onClick={(e) => {
        if (isOverText) renameApp(e);
      }}
      onBlur={(e) => {
        setDisabled(true);
        setIsChanged(false);
        if (e?.target?.value === location?.name) {
          return;
        } else if (!e?.target?.value) {
          changeName('My App');
          saveName();
        } else {
          changeName(e?.target?.value);
          saveName();
        }
      }}
      onKeyPress={(e) => {
        setIsChanged(true);
        if (e.key === 'Enter') {
          appName.current.blur();
        }
      }}
    />
  );

  return (
    <>
      <LiiingoTooltip placement="top" message={'Click to edit your app.'} delay={2000}>
        <Card variant="outlined" className={classes.formCard}>
          {loading ? (
            <Box className={classes.spinnerBox}>
              <Throbber isVisible={true} />
            </Box>
          ) : (
            <EditContextMenu navigateToApp={navigateToApp} appName={appName} setDisabled={setDisabled}>
              <Box className={classes.appButton}>
                <ButtonBase disabled={!disabledInput} className={classes.appButton} onClick={navigateToApp}>
                  <Box className={classes.imageBox}>
                    {topic?.exhibitImage ? (
                      <TemplatePreview company={companyName} name={location?.name} previewUrl={topic?.exhibitImage} />
                    ) : (
                      <ImageIcon className={classes.image} />
                    )}
                  </Box>
                </ButtonBase>
                <CardHeader
                  className={classes.content}
                  title={AppName}
                  subheader={lastUpdated(location?.modifiedDate?.$date?.$numberLong)}
                  onClick={(e) => {
                    if (!isOverText && !isChanged) navigateToApp();
                  }}
                />
              </Box>
            </EditContextMenu>
          )}
        </Card>
      </LiiingoTooltip>
      <Box className={classes.menu}>
        <LiiingoTooltip placement="left" message={'App Options'} delay={2000}>
          <div>
            <EditMenu navigateToApp={navigateToApp} appName={appName} setDisabled={setDisabled} />
          </div>
        </LiiingoTooltip>
      </Box>
    </>
  );
};
