import { createStyles, makeStyles, Theme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Status, toString } from '../../store/models/status/Status';
import { addTip } from '../../store/slices/editorSlice';
import { updateTopicOptions } from '../../store/slices/topicSlice';
import { colors } from '../../theme/palette';
import { PAGE_HIDDEN_TIP, PAGE_INCOGNITO_TIP } from '../../util/constants';
import { LiiingoTooltip } from '../LiiingoTooltip';
import { IncognitoIcon } from '../SvgComponents/SvgIncognito';

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

export type LiiingoTriStateToggleProps = {
  topicId: string;
  status: Status;
  addTip: (tip: string) => void;
  updateTopicOptions: (payload: { status: Status; topicId: string }) => void;
  // Live   = 1
  // Hidden = 2
  // Secret = 3
};

export const LiiingoTriStateToggle = (props: LiiingoTriStateToggleProps) => {
  const { topicId, status: statusRedux, addTip, updateTopicOptions } = { ...props };
  const classes = useStyles();

  const [status, setStatus] = useState(statusRedux);

  const handleClick = (e) => {
    let newStatus = status % 3 !== 0 ? status + 1 : 1;
    if (newStatus === Status.Hidden) {
      addTip(PAGE_HIDDEN_TIP);
    } else if (newStatus === Status.Secret) {
      addTip(PAGE_INCOGNITO_TIP);
    }
    setStatus(newStatus);
    updateTopicOptions({ status: newStatus, topicId });
  };

  const toggleIcon = (status) => {
    switch (status) {
      case Status.Live:
        return <VisibilityIcon fontSize="small" className={classes.icon} />;
      case Status.Hidden:
        return <VisibilityOffIcon fontSize="small" className={classes.icon} />;
      case Status.Secret:
        return <IncognitoIcon fontSize="medium" className={classes.icon} />;
    }
  };

  return (
    <LiiingoTooltip message={toString(status)} placement="right" delay={2000}>
      <IconButton className={classes.button} onClick={handleClick} size="small">
        {toggleIcon(status)}
      </IconButton>
    </LiiingoTooltip>
  );
};

const LiiingoTriStateToggleContainer = (props: Omit<LiiingoTriStateToggleProps, 'addTip' | 'updateTopicOptions'>) => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      updateTopicOptions,
      addTip,
    },
    dispatch
  );

  return <LiiingoTriStateToggle {...props} {...actions} />;
};

export default LiiingoTriStateToggleContainer;
