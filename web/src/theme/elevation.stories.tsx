import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const ThemeSampler = () => <div></div>;
const Elevations = () => {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Paper elevation={0}>
            <Typography variant="h6">Elevation: 0</Typography>
            <Typography variant="subtitle1">X: 0, Y: 0, Blur: 0, Spread: 0 Hex: #181B20, Opacity: 20%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={1}>
            <Typography variant="h6">Elevation: 1</Typography>
            <Typography variant="subtitle1">X: 0, Y: 1, Blur: 4, Spread: 0 Hex: #181B20, Opacity: 20%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={2}>
            <Typography variant="h6">Elevation: 2</Typography>
            <Typography variant="subtitle1">X: 0, Y: 2, Blur: 8, Spread: 0 Hex: #181B20, Opacity: 20%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3}>
            <Typography variant="h6">Elevation: 3</Typography>
            <Typography variant="subtitle1">X: 0, Y: 4, Blur: 16, Spread: 0 Hex: #181B20, Opacity: 20%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={4}>
            <Typography variant="h6">Elevation: 4</Typography>
            <Typography variant="subtitle1">X: 0, Y: 6, Blur: 24, Spread: 0 Hex: #181B20, Opacity: 20%</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
Elevations.story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/jNL8pygV4Ts1mLkWLUIkEN/00.-Liiingo-Design-System?node-id=1130%3A2229',
    },
  },
};

export default {
  component: ThemeSampler,
  title: 'Elevation',
  excludeStories: [],
};

export { Elevations };
