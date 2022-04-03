import MuiAppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { colors } from '../../theme/palette';
import importImg from '../../theme/logo.svg';
import { useContext, useState } from 'react';
import { OnboardingFlowContext } from '../../context/OnboardingFlowContext';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useLogout } from '../../hooks/useLogout';
import { useChangeRoute } from '../../hooks/useChangeRoute';
import { LiiingoTooltip } from '../../components/LiiingoTooltip';

export const AppBarHeight = '40px';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      background: 'linear-gradient(90deg, #2B2E34 0%, #49525D 100%)',
      minHeight: AppBarHeight,
      maxHeight: AppBarHeight,
    },
    appBarItem: {
      borderRadius: 8,
      marginLeft: theme.spacing(3),
      minHeight: AppBarHeight,
      maxHeight: AppBarHeight,
    },
    appBarLogo: {
      marginLeft: theme.spacing(3),
      width: 48,
      height: 20,
    },
    appBarText: {
      color: colors.pureWhite,
      '&:hover': {
        color: colors.grayLight,
      },
    },
    appBarTextSelected: {
      color: colors.tealAccent,
      fontWeight: 'bold',
      marginTop: 5,
    },
    box: {
      flexDirection: 'row',
      display: 'flex',
      flexGrow: 1,
      alignItems: 'center',
    },
    profileContainer: {
      marginLeft: 'auto',
      marginRight: 10,
      marginTop: 5,
      '&:hover': {
        cursor: 'pointer',
      },
    },
    profileIcon: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
    profileMenu: {
      marginTop: 17,
      padding: 0,
      backgroundColor: colors.pureWhite,
      filter: 'drop-shadow(0px 2px 8px rgba(24, 27, 32, 0.2))',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 0,
    },
  })
);

export type AppBarItem = {
  displayName: string;
  route?: string;
  action?: () => void;
};

export type AppBarProps = {
  isHidden?: boolean;
  appBarItems?: AppBarItem[];
};

const defaultProps = {
  isHidden: false,
  appBarItems: [],
};

export const AppBar = (props: AppBarProps) => {
  const { isHidden, appBarItems } = { ...defaultProps, ...props };
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLock, setIsLock] = useState(false);
  const flowContext = useContext(OnboardingFlowContext);
  const logout = useLogout();
  const toAccount = useChangeRoute('billing');
  const toDashboard = useChangeRoute('engagement');
  let tmp = 0;
  if (isHidden) {
    return null;
  }

  const handleMenu = (event) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setIsLock(false);
    setAnchorEl(null);
  };

  const handleToAccount = () => {
    handleClose();
    toAccount();
  };

  const handleSupport = () => {
    window.location.href = 'mailto:support@liiingo.com?subject=Liiingo Support Message&body=What can we help you with?';
  };

  const handleToDashboard = () => {
    toDashboard();
  };

  return (
    <MuiAppBar position="fixed" className={classes.appBar}>
      <Box className={classes.box}>
        <ButtonBase
          disableRipple
          onClick={() => window.open(`/${flowContext.route}/profile/engagement`, '_blank').focus()}
        >
          <img alt="Logo" className={classes.appBarLogo} src={importImg} />
        </ButtonBase>
        {appBarItems.map((item, index) => {
          const isDashboardItem = item.route.includes('engagement');
          const onDashboard = window.location.href.toString().includes('/engagement') && isDashboardItem;

          let handleClick;

          if (item.route.includes('engagement')) handleClick = handleToDashboard;
          else
            handleClick = item.action
              ? item.action
              : () => {
                  if (item.route) {
                    const newWindow = window.open(item.route, '_blank');
                    newWindow.focus();
                  }
                };

          return (
            <LiiingoTooltip
              message={isDashboardItem ? 'View high-level app info  on the App Dashboard' : 'Explore our Help Center'}
              placement={isDashboardItem ? 'bottom-start' : 'bottom'}
              delay={2000}
              key={index}
            >
              <ButtonBase
                key={item.displayName.toLowerCase()}
                className={classes.appBarItem}
                style={
                  onDashboard
                    ? {
                        borderBottomColor: colors.tealAccent,
                        borderBottomStyle: 'solid',
                        borderBottomWidth: 3,
                        borderRadius: 0,
                        color: colors.tealAccent,
                      }
                    : {}
                }
                onClick={handleClick}
              >
                <Typography variant="body2" className={onDashboard ? classes.appBarTextSelected : classes.appBarText}>
                  {item.displayName}
                </Typography>
              </ButtonBase>
            </LiiingoTooltip>
          );
        })}
        <div
          className={classes.profileContainer}
          onMouseEnter={(e) => {
            handleMenu(e);
            tmp = 0;
          }}
          onMouseOut={(e) => {
            tmp++;
            const target = e.relatedTarget as HTMLElement;
            if (tmp > 1 && target !== null && target.tagName !== 'LI' && target.tagName !== 'UL' && !isLock)
              handleClose();
          }}
          onClick={() => {
            setIsLock(!isLock);
          }}
        >
          <AccountCircleIcon
            stroke={
              anchorEl !== null
                ? colors.grayLight
                : window.location.href.toString().includes('/billing')
                ? colors.tealAccent
                : null
            }
            onMouseOver={handleMenu}
            strokeWidth={1}
            className={classes.profileIcon}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            classes={{ paper: classes.profileMenu }}
            elevation={4}
            disableAutoFocusItem
          >
            <MenuItem onClick={handleToAccount}>Account Settings</MenuItem>
            <MenuItem onClick={handleSupport}>Support</MenuItem>
            <MenuItem onClick={logout}>Log out</MenuItem>
          </Menu>
        </div>
      </Box>
    </MuiAppBar>
  );
};
