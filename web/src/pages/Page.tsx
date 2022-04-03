import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import { ErrorBanner, Header } from '../components';
import { drawerWidth } from '../components/AppEditor/LiiingoDrawer';
import { AppBarHeight } from '../components/Navigation/AppBar';
import { LeftNavMenuItem } from '../components/Navigation/LeftNav';
import { ErrorContext } from '../context/ErrorContext';
import { useNav } from '../hooks/useNav';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: AppBarHeight,
    },
    content: {
      backgroundColor: theme.palette.background.default,
      flexGrow: 1,
    },
    withMarginForLeftNav: {
      [theme.breakpoints.up('sm')]: {
        marginLeft: drawerWidth,
      },
    },
    footer: {
      backgroundColor: theme.palette.background.default,
    },
  })
);

export type PageProps = {
  hideLeftNav?: boolean;
  menuItems?: LeftNavMenuItem[];
  bottomMenuItems?: LeftNavMenuItem[];
};
const defaultProps = {
  hideLeftNav: false,
  menuItems: [],
  bottomMenuItems: [],
};
export const Page: React.FC<PageProps> = (props) => {
  const { hideLeftNav, menuItems, bottomMenuItems, children } = { ...defaultProps, ...props };
  const { toggleIsOpen, leftNavIsHidden, leftNavProps, Nav } = useNav({
    menuItems,
    bottomMenuItems,
    isHidden: hideLeftNav,
  });
  const { errorMessage, errorTitle, errorSeverity, clearError } = useContext(ErrorContext);
  const classes = useStyles();

  // Heads Up - we're overwriting all error messages with this generic message right now!
  const defaultError = {
    title: 'Oh no!',
    message: "We hate when this happens and we're looking into it. Try again in just a minute!",
  };

  return (
    <Container disableGutters={true} className={classes.root}>
      <Header onMenuButtonClick={toggleIsOpen} isHidden={leftNavIsHidden} />
      <Nav {...leftNavProps} />
      <div className={classes.content}>
        <Grid container>
          {errorMessage && (
            <ErrorBanner
              message={errorMessage || defaultError.message}
              title={errorTitle || defaultError.title}
              severity={errorSeverity}
              onClose={clearError}
            />
          )}
          <Grid item xs={12} component="main">
            {children}
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};
