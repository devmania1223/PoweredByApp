import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { useLogout } from '../hooks/useLogout';

const SignOut = () => {
  const logout = useLogout();
  useEffect(logout);
  return <Container>You have been successfully logged out</Container>;
};

export default SignOut;
