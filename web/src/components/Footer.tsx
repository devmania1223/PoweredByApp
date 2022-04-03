import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Box position="fixed" left={0} bottom={0} p={1} margin="auto" width="100%">
      <Grid item xs={12} container justifyContent="center" alignItems="center">
        Copyright {year} Liiingo, All rights reserved
      </Grid>
    </Box>
  );
};

export default Footer;
export { Footer };
