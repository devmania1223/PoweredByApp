import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Theme } from '@material-ui/core/styles/createTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ExitToApp from '@material-ui/icons/ExitToApp';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { colors } from '../../theme/palette';
import { LiiingoDrawer } from '../AppEditor/LiiingoDrawer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconSelectedColor: {
      color: theme.palette.primary.main,
    },
    iconNotSelectedColor: {
      color: colors.grayDark,
    },
    leftNavItem: {
      paddingTop: 16,
      paddingBottom: 16,
      '&.Mui-selected': {
        backgroundColor: theme.palette.background.default,
        borderRightStyle: 'solid',
        borderRightWidth: '3px',
        borderRightColor: theme.palette.primary.main,
      },
    },
    leftNavExpandIcon: {
      paddingTop: 5,
      paddingBottom: 5,
    },
    logoutButton: {
      alignItems: 'flex-start',
      paddingTop: 16,
      paddingBottom: 16,
    },
    bottomList: {
      display: 'flex',
      flexDirection: 'column-reverse',
      flex: 1,
    },
    leftAlignedIcon: {
      justifyContent: 'flex-start',
    },
    rightBorder: {
      borderRight: 5,
    },
  })
);

export type LeftNavMenuItem = {
  /**
   * The 'route' is the link 'target' that the browser will navigate to when this LeftNav link is clicked
   */
  route: string;

  /**
   * 'locationsThatMatch' is an array of URLs that will all result in the 'component' being rendered.
   * This is useful if you want to have a component that performs its own sub-routing.
   * If this isn't defined, then the value of 'route' will be used for matching instead.
   * i.e. locationsThatMatch: ['/profile/organization', 'profile/organization/guided-setup']
   */
  locationsThatMatch?: string[];
  displayName: string;
  icon: React.FunctionComponent<SvgIconProps>;
  component: React.FunctionComponent<any>;
};

export type LeftNavProps = {
  isOpen: boolean;
  onClose: () => void;
  toggleIsOpen: () => void;
  isHidden: boolean;
  menuItems: LeftNavMenuItem[];
  bottomMenuItems?: LeftNavMenuItem[];
};

const withoutTrailingSlash = (word: string) => {
  if (word.endsWith('/')) {
    return word.slice(0, word.length - 1); // Remove the trailing slash
  }
  return word;
};

export const LeftNav = (props: LeftNavProps) => {
  const { isOpen, menuItems = [], bottomMenuItems = [], isHidden = false } = props;
  const classes = useStyles();
  const location = useLocation();
  const logout = useLogout();

  const [expanded, setExpanded] = React.useState(isOpen);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Completely remove the left nav
  // This is different than "closing" the left nav because no floating button is visible to open the left nav.
  if (isHidden) {
    return null;
  }

  // Controls which menu item in the left nav appears to be "selected"
  let isSelected: boolean;

  return (
    <LiiingoDrawer anchor="left" isExpanded={expanded}>
      <List>
        <ListItem button onClick={toggleExpanded} classes={{ root: classes.leftNavExpandIcon }}>
          <ListItemIcon>{expanded ? <ChevronLeft /> : <ChevronRight />}</ListItemIcon>
        </ListItem>
        {menuItems.map((menu: LeftNavMenuItem) => {
          if (menu.route.search('/profile/billing') === -1) {
            const currentLocation = withoutTrailingSlash(location?.pathname);
            isSelected = !!menu.locationsThatMatch
              ? menu.locationsThatMatch.includes(currentLocation)
              : menu.route === currentLocation;
            return (
              <div key={menu.route}>
                <ListItem
                  button
                  key={menu.route}
                  classes={{ root: classes.leftNavItem }}
                  component={Link}
                  to={`${menu.route}`}
                  selected={isSelected}
                >
                  <ListItemIcon className={isSelected ? classes.iconSelectedColor : classes.iconNotSelectedColor}>
                    <menu.icon />
                  </ListItemIcon>
                  <Typography>{menu.displayName}</Typography>
                </ListItem>
              </div>
            );
          } else return null;
        })}
      </List>
    </LiiingoDrawer>
  );
};
