import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import ReactJWPlayer from 'react-jw-player';
import {
  getLocationForUser_user_location,
  getLocationForUser_user_location_exhibit_templatedContent,
} from '../types/getLocationForUser';
import { PhoneViewer } from './PhoneViewer/PhoneViewer';

export type TemplateViewerProps = {
  location: getLocationForUser_user_location;
};
const defaultProps = {};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      height: 120,
      backgroundColor: '#a9a9a9',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      boxSizing: 'border-box',
      padding: 10,
    },
    companyNameInHeader: {
      display: 'flex',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      color: 'white',
    },
    companyNameSubtitleInHeader: {
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
  })
);

const renderItem = (item: getLocationForUser_user_location_exhibit_templatedContent, classes: any) => {
  if (item.liiingoContentType === 'text') {
    return (
      <div key={item._id} style={{ margin: '10px 0px', padding: '0px 10px' }}>
        <div dangerouslySetInnerHTML={{ __html: item?.languages?.en?.value ?? '' }} />
      </div>
    );
    // } else if (item.liiingoContentType === 'image360') {
    //   const fileUrl = langContent.fileUrl;
    //   return (
    //     <div style={{ margin: '10px 0px' }}>
    //       <Image360 url={fileUrl} />
    //     </div>
    //   );
  } else if (item.liiingoContentType === 'image') {
    return (
      <div key={item._id}>
        <img className={classes.topicImageImage} alt="" src={item?.languages?.en?.value ?? undefined} />
      </div>
    );
  } else if (item.liiingoContentType === 'webview') {
    return item?.languages?.en?.fileUrl ? (
      <Link key={item._id} href={item?.languages?.en?.value ?? undefined} target="_blank">
        <img className={classes.topicImageImage} alt="" src={item?.languages?.en?.fileUrl} />
      </Link>
    ) : (
      <PreviewButton onClick={() => window.open(item?.languages?.en?.value, '_blank')} key={item._id}>
        {item?.languages?.en?.name}
      </PreviewButton>
    );
  } else if (item.liiingoContentType === 'video') {
    return (
      <div className={classes.jwPlayerRoot}>
        <ReactJWPlayer
          playerId={`${item._id}-jw-player-iphone-preview`}
          playerScript="https://cdn.jwplayer.com/libraries/vmwCNaVA.js"
          file={`https://content.jwplatform.com/videos/${item?.languages?.en?.value}.mp4`}
        />
      </div>
    );
  }

  return null;
};

export const TemplateViewer = (props: TemplateViewerProps) => {
  const { location } = { ...defaultProps, ...props };
  const { companyName, name: appName, contactName, topicBackgroundImageUrl, exhibit } = location || {};
  const classes = useStyles();

  return (
    <PhoneViewer>
      <PageHeader companyName={companyName} appName={appName} topicBackgroundImageUrl={topicBackgroundImageUrl} />
      <HorizontalMenu menuItemTitles={[companyName]} />
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
            {contactName}
          </Typography>
        </Box>
        {exhibit?.templatedContent?.map((content, index) => renderItem(content, classes))}
      </Box>
    </PhoneViewer>
  );
};

const PageHeader = ({ companyName, appName, topicBackgroundImageUrl }) => {
  const classes = useStyles();
  return (
    <Box
      className={classes.header}
      style={{
        backgroundImage: `url("${topicBackgroundImageUrl}")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Box className={classes.companyNameInHeader}>{companyName}</Box>
      <Box className={classes.companyNameSubtitleInHeader}>{appName}</Box>
    </Box>
  );
};

const HorizontalMenu = ({ menuItemTitles }: { menuItemTitles: string[] }) => {
  const classes = useStyles();
  return (
    <List className={classes.horizontalMenu}>
      {menuItemTitles.map((menuItem, index) => (
        <ListItem key={index} dense disableGutters classes={{ root: classes.horizontalMenuItem }}>
          <ListItemText
            classes={{ root: classes.horizontalMenuItemText, primary: classes.horizontalMenuItemTypography }}
          >
            {menuItem}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

const usePreviewButtonStyles = makeStyles({
  root: {
    marginBottom: 16,
    // These colors are hard-coded to match the colors that Liiingo automatically applies to webview buttons
    backgroundColor: '#555555',
    color: '#ffffff',
  },
});
export const PreviewButton = ({ onClick, children }) => {
  const classes = usePreviewButtonStyles();
  return (
    <Button fullWidth variant="contained" onClick={onClick} color="inherit" classes={{ root: classes.root }}>
      {children}
    </Button>
  );
};
