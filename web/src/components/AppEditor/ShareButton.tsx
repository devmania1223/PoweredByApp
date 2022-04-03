import { createStyles, makeStyles, Theme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTopicOptions } from '../../store/slices/topicSlice';
import { colors } from '../../theme/palette';
import { LiiingoTooltip } from '../LiiingoTooltip';
import { SvgShareDisabled } from '../SvgComponents/SvgShareDisabled';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: colors.grayLight,
      '&:hover': {
        color: colors.blueAccent,
      },
    },
    button: {
      '&:hover': {
        backgroundColor: colors.blueAccent20,
      },
    },
  })
);

export type ShareButtonProps = {
  topicId: string;
  initialShareStatus: boolean;
  sharePage: (payload: { enableSharing: boolean; topicId: string }) => void;
};

export const ShareButton = (props: ShareButtonProps) => {
  const { topicId, initialShareStatus, sharePage } = { ...props };
  const classes = useStyles();

  const [shareEnabled, setShareEnabled] = useState(initialShareStatus);

  const handleClick = () => {
    sharePage({ enableSharing: !shareEnabled, topicId });
    setShareEnabled(!shareEnabled);
  };

  const message = shareEnabled ? 'Sharing Enabled' : 'Sharing Disabled';

  const shareIcon = shareEnabled ? (
    <ShareIcon fontSize="small" className={classes.icon} />
  ) : (
    <SvgShareDisabled fontSize="small" className={classes.icon} />
  );

  return (
    <LiiingoTooltip message={message} placement="right" delay={2000}>
      <IconButton className={classes.button} onClick={handleClick} size="small">
        {shareIcon}
      </IconButton>
    </LiiingoTooltip>
  );
};

const ShareButtonContainer = (props: Omit<ShareButtonProps, 'sharePage'>) => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      sharePage: updateTopicOptions,
    },
    dispatch
  );

  return <ShareButton {...props} {...actions} />;
};

export default ShareButtonContainer;
