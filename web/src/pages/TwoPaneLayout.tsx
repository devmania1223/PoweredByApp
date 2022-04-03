import { Box, Grid, Hidden, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import SvgLogoBlack from '../components/SvgComponents/SvgLogoBlack';
import { colors } from '../theme/palette';

type StyleProps = {
  heroImageUrl: string;
  heroBackgroundImageUrl: string;
  dehero: boolean;
};

const useStyles = makeStyles<Theme, StyleProps>({
  root: {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
  },
  componentContainer: {
    height: '100vh',
    overflow: 'scroll',
  },
  heroImageContainer: (props) => ({
    backgroundImage: `url(${props.heroImageUrl})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'scroll',
    backgroundSize: props.dehero ? 'auto' : 'cover',
    height: '100%',
    width: '100%',
  }),
  heroImageBackground: (props) => ({
    backgroundImage: `url(${props.heroBackgroundImageUrl})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'scroll',
    backgroundSize: 'cover',
    height: '100%',
    width: '100%',
    backgroundColor: props.dehero ? colors.graySecondaryLight : 'none',
  }),
  svg: (props) => ({
    backgroundColor: colors.pureWhite,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }),
  logo: (props) => ({
    backgroundColor: colors.pureWhite,
    width: '100%',
    height: 42,
    paddingLeft: 30,
    marginTop: 30,
  }),
});

export type TwoPaneLayoutProps = {
  icon?: React.ReactNode;
  heroImageUrl?: string;
  heroBackgroundImageUrl?: string;
  component: React.ReactNode;
  direction?: 'row' | 'row-reverse';
  dehero?: boolean;
};

const defaultProps: Omit<TwoPaneLayoutProps, 'component'> = {
  icon: null,
  heroImageUrl: '',
  heroBackgroundImageUrl: '',
  direction: 'row',
  dehero: false,
};

export const TwoPaneLayout = (props: TwoPaneLayoutProps) => {
  const { component, icon, heroImageUrl, heroBackgroundImageUrl, direction, dehero } = { ...defaultProps, ...props };

  const classes = useStyles({ heroImageUrl, heroBackgroundImageUrl, dehero });

  return (
    <Grid container className={classes.root} direction={direction}>
      <Hidden smDown>
        <Grid container item md={6}>
          {icon ? (
            <Box className={classes.svg}>
              <Box className={classes.logo}>
                <SvgLogoBlack />
              </Box>
              {icon}
            </Box>
          ) : (
            <Box className={classes.heroImageBackground}>
              <Box className={classes.heroImageContainer}></Box>
            </Box>
          )}
        </Grid>
      </Hidden>
      <Grid container item sm={12} md={6} direction="column" className={classes.componentContainer}>
        {component}
      </Grid>
    </Grid>
  );
};
