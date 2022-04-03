import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar from '@material-ui/core/Toolbar';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { OnboardingFlowContext } from '../context/OnboardingFlowContext';
import liiingoFavicon from '../theme/favicon.png';
import { MenuButton } from './Buttons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // A linear gradient that starts transparent at the bottom, and is completely opaque from 90% to the top.
      backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,0), rgba(255,255,255,1) 90%)',
      minHeight: 100, // This is large to allow the gradient to be more gradual
      marginBottom: -50, // This compensates for the large height of the header by allowing page content to spill into the transparent lower part of the header
    },
  })
);

export type HeaderProps = {
  onMenuButtonClick: () => void;

  /**
   * On pages where no LeftNav should be displayed (like sign-up), we should also hide the Header.
   * When the Header is 'hidden', it will never show up regardless of the screen size.
   */
  isHidden?: boolean;
};

/**
 * The Header only shows up on {xs} screen sizes.
 * It has a transparent gradient that prevents the menu open/close button from overlapping page content
 * when viewing on a small screen.
 */
export const Header = (props: HeaderProps) => {
  const { onMenuButtonClick, isHidden = false } = props;
  const flowContext = useContext(OnboardingFlowContext);
  const classes = useStyles();

  // Set the favicon image from the Dynamic Template
  const dynamicHTMLHead = (
    <Helmet>
      <link rel="icon" type="image/png" sizes="32x32" href={flowContext?.favicon ?? liiingoFavicon} />
    </Helmet>
  );

  if (isHidden) {
    return dynamicHTMLHead;
  }

  return (
    <>
      {dynamicHTMLHead}
      <Hidden smUp implementation="js">
        <AppBar position="sticky" color="transparent" className={classes.root} elevation={0}>
          <Toolbar>
            <MenuButton edge="start" aria-label="menu" onClick={onMenuButtonClick} />
          </Toolbar>
        </AppBar>
      </Hidden>
    </>
  );
};
