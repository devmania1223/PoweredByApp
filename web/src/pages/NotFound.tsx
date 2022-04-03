import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React from 'react';

type Props = {
  title?: string;
  message?: string;
};
const defaultProps = {
  title: 'Wuh?',
  message: "That page doesn't seem to exist",
};
export const NotFound = (props: Props) => {
  const { title, message } = { ...defaultProps, ...props };

  return (
    <Container>
      <Box
        p={4}
        margin="12vh auto"
        maxWidth="22rem"
        bgcolor="#FFFFFF"
        borderRadius="1rem"
        boxShadow=".25rem .25rem .5rem 0rem"
      >
        <Typography variant="h1" align="center">
          {title}
        </Typography>
        <Typography variant="body2" align="center">
          {message}
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFound;
