import { Box, IconButton, ListItem, ListItemSecondaryAction, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { CloudDownloadOutlined } from '@material-ui/icons';
import ContentCopy from '@material-ui/icons/FileCopyOutlined';
import React, { useState } from 'react';
import { Topic } from '../../store/models';
import { colors } from '../../theme/palette';
import { LiiingoSuccessSnackbar } from '../LiiingoSuccessSnackbar';
import { LiiingoTooltip } from '../LiiingoTooltip';
import { drawerCollapsedWidth } from './LiiingoDrawer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      backgroundColor: colors.grayLight20,
    },
    list: {
      paddingLeft: drawerCollapsedWidth,
    },
    download: {
      '&:hover': {
        backgroundColor: colors.purpleAccent20,
        color: colors.purpleAccent,
      },
      '&:active': {
        color: colors.pureWhite,
        backgroundColor: colors.purpleAccent,
      },
    },
    copy: {
      '&:hover': {
        backgroundColor: colors.tealAccent20,
        color: colors.tealAccent,
      },
      '&:active': {
        color: colors.pureWhite,
        backgroundColor: colors.tealAccent,
      },
    },
    actions: {
      display: 'flex',
    },
    qr: {
      width: '100%',
      marginTop: 10,
    },
  })
);

export type QrMenuProps = {
  topic: Topic;
};

export const QrMenu = (props: QrMenuProps) => {
  const { topic } = { ...props };
  const [copySuccess, setCopySuccess] = useState(false);
  const classes = useStyles();

  const copy = () => {
    navigator.clipboard.writeText(topic?.branchLinkUrl);
    setCopySuccess(true);
  };

  const download = () => {
    window.location.href = topic?.qrZip || undefined;
  };

  return (
    <>
      <List className={classes.list}>
        <ListItem className={classes.title}>
          <Typography>QR Code</Typography>
          <ListItemSecondaryAction>
            <Box className={classes.actions}>
              <LiiingoTooltip message="Download" placement="bottom" delay={2000}>
                <IconButton disableRipple size="small" className={classes.download} onClick={download}>
                  <CloudDownloadOutlined fontSize="small" />
                </IconButton>
              </LiiingoTooltip>
              <LiiingoTooltip message="Copy Link" placement="bottom" delay={2000}>
                <IconButton disableRipple size="small" className={classes.copy} onClick={copy}>
                  <ContentCopy fontSize="small" />
                </IconButton>
              </LiiingoTooltip>
            </Box>
          </ListItemSecondaryAction>
        </ListItem>
        <LiiingoTooltip
          placement="right"
          message="Scan this code with a mobile device to view the page you're currently designing."
          delay={2000}
        >
          <img src={topic?.qr} alt="QR Code" className={classes.qr} />
        </LiiingoTooltip>
      </List>
      <LiiingoSuccessSnackbar
        open={copySuccess}
        text="Link copied successfully"
        onClose={() => setCopySuccess(false)}
      />
    </>
  );
};
