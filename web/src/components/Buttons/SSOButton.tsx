import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib-esm/types/Auth';
import { ButtonProps, createStyles, IconButton, makeStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createTheme';

import { Auth } from 'aws-amplify';
import React from 'react';
import { ReactComponent as FacebookSVG } from './images/facebook-branded-button.svg';
import { ReactComponent as GoogleSVG } from './images/google-branded-button.svg';

export interface SSOButtonProps extends ButtonProps {
  provider: 'Google' | 'Facebook';
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sso: {
      borderRadius: '100%',
      minWidth: 'unset',
      padding: 2,
      margin: 10,
      '&:hover': {
        backgroundColor: '#815CFF',
      },
    },
  })
);

export const SSOButton = (props: SSOButtonProps) => {
  const { provider } = props;
  const classes = useStyles();

  const handleClick = async () => {
    Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider[provider] });
  };

  return (
    <IconButton className={classes.sso} onClick={handleClick} aria-label={`Login with ${provider}`}>
      {provider === 'Google' && <GoogleSVG />}
      {provider === 'Facebook' && <FacebookSVG />}
    </IconButton>
  );
};
