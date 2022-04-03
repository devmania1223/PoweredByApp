import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { Theme } from '@material-ui/core/styles/createTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import React, { useState, useCallback } from 'react';
import { AppBarHeight } from '../Navigation/AppBar';
import { setDrawerWidth } from '../../store/slices/editorSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export const drawerWidth = 260;
export const drawerCollapsedWidth = 60;

const minDrawerWidth = drawerWidth;
const maxDrawerWidth = 400;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerLogoContainer: {
      width: drawerWidth,
      height: AppBarHeight,
      padding: theme.spacing(1),
    },
    drawerLogo: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: drawerCollapsedWidth,
      overflow: 'hidden',
    },
    topList: {
      paddingTop: AppBarHeight,
    },
    dragger: {
      width: '5px',
      cursor: 'ew-resize',
      padding: '4px 0 0',
      borderTop: '1px solid #ddd',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      zIndex: 100,
      backgroundColor: '#f4f7f9',
    },
  })
);

export type LiiingoDrawerProps = {
  anchor: 'left' | 'right';
  isExpanded?: boolean;
};

const defaultProps = {
  isClosed: false,
  isExpanded: true,
};

export const LiiingoDrawer: React.FC<LiiingoDrawerProps> = (props) => {
  const { anchor, children, isExpanded } = { ...defaultProps, ...props };
  const classes = useStyles();
  const [newWidth, setNewWidth] = useState(drawerWidth);
  const dispatch = useDispatch();
  const onSetDrawerWidth = bindActionCreators(setDrawerWidth, dispatch);

  const handleMousedown = (e) => {
    document.addEventListener('mouseup', handleMouseup, true);
    document.addEventListener('mousemove', handleMousemove, true);
  };

  const handleMousemove = useCallback(
    (e) => {
      const calcWidth = e.clientX - document.body.offsetLeft;
      if (calcWidth > minDrawerWidth && calcWidth < maxDrawerWidth) {
        setNewWidth(calcWidth);
        onSetDrawerWidth(calcWidth);
      }
    },
    [onSetDrawerWidth]
  );

  const handleMouseup = (e) => {
    document.removeEventListener('mouseup', handleMouseup, true);
    document.removeEventListener('mousemove', handleMousemove, true);
  };

  return (
    <Box component="nav" className={classes.drawer}>
      {/* Small screens only */}
      <Hidden smUp implementation="js">
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: isExpanded,
            [classes.drawerClose]: !isExpanded,
          })}
          PaperProps={{ style: { width: isExpanded ? newWidth : drawerCollapsedWidth } }}
          open={isExpanded}
          anchor={anchor}
        >
          <div className={classes.topList} />
          {children}
          {anchor === 'left' && isExpanded ? (
            <>
              <div
                id="dragger"
                onMouseDown={(event) => {
                  handleMousedown(event);
                }}
                className={classes.dragger}
              />
            </>
          ) : null}
        </Drawer>
      </Hidden>

      {/* Large screens only */}
      <Hidden xsDown implementation="js">
        <Drawer
          anchor={anchor}
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: isExpanded,
            [classes.drawerClose]: !isExpanded,
          })}
          PaperProps={{ style: { width: isExpanded ? newWidth : drawerCollapsedWidth } }}
        >
          <div className={classes.topList} />
          {children}
          {anchor === 'left' && isExpanded ? (
            <>
              <div
                id="dragger"
                onMouseDown={(event) => {
                  handleMousedown(event);
                }}
                className={classes.dragger}
              />
            </>
          ) : null}
        </Drawer>
      </Hidden>
    </Box>
  );
};
