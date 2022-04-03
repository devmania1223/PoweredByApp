import { Box, Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React from 'react';

const ColorSampler = () => <div></div>;
const Colors = () => {
  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item container direction="column" xs={12} sm={4}>
          <Box bgcolor="primary.main" color="background.paper" p={2} mb={1} borderRadius={10}>
            primary.main
          </Box>
          <Box bgcolor="primary.light" color="primary.contrastText" p={2} borderRadius={10}>
            primary.light
          </Box>
        </Grid>
        <Grid item container direction="column" xs={12} sm={4}>
          <Box bgcolor="secondary.main" color="background.paper" p={2} mb={1} borderRadius={10}>
            secondary.main
          </Box>
          <Box bgcolor="secondary.light" color="secondary.contrastText" p={2} borderRadius={10}>
            secondary.light
          </Box>
        </Grid>
        <Grid item container direction="column" xs={12} sm={4}>
          <Box bgcolor="error.main" color="background.paper" p={2} mb={1} borderRadius={10}>
            error.main
          </Box>
          <Box bgcolor="error.light" color="error.contrastText" p={2} borderRadius={10}>
            error.light
          </Box>
        </Grid>
        <Grid item container direction="column" xs={12} sm={4}>
          <Box bgcolor="warning.main" color="background.paper" p={2} mb={1} borderRadius={10}>
            warning.main
          </Box>
          <Box bgcolor="warning.light" color="warning.contrastText" p={2} borderRadius={10}>
            warning.light
          </Box>
        </Grid>
        <Grid item container direction="column" xs={12} sm={4}>
          <Box bgcolor="info.main" color="background.paper" p={2} mb={1} borderRadius={10}>
            info.main
          </Box>
          <Box bgcolor="info.light" color="info.contrastText" p={2} borderRadius={10}>
            info.light
          </Box>
        </Grid>
        <Grid item container direction="column" xs={12} sm={4}>
          <Box bgcolor="success.main" color="background.paper" p={2} mb={1} borderRadius={10}>
            success.main
          </Box>
          <Box bgcolor="success.light" color="success.contrastText" p={2} borderRadius={10}>
            success.light
          </Box>
        </Grid>
        <Grid item container direction="column" xs={12} sm={4}>
          <Box bgcolor="text.primary" color="background.paper" p={2} mb={1} borderRadius={10}>
            text.primary
          </Box>
          <Box bgcolor="text.secondary" color="background.paper" p={2} mb={1} borderRadius={10}>
            text.secondary
          </Box>
          <Box bgcolor="text.disabled" color="background.paper" p={2} borderRadius={10}>
            text.disabled
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
Colors.story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/jNL8pygV4Ts1mLkWLUIkEN/00.-Liiingo-Design-System?node-id=1130%3A2325',
    },
  },
};

export default {
  component: ColorSampler,
  title: 'Colors',
  excludeStories: [],
};

export { Colors };
