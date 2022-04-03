import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles({
  withMargin: {
    margin: 5,
  },
  withPadding: {
    padding: '2em',
  },
});

const ThemeSampler = () => <div></div>;
const Headers = () => {
  const classes = useStyles();
  return (
    <Container>
      <Paper className={`${classes.withMargin} ${classes.withPadding}`}>
        <Typography variant="h1">Title: The face of the moon was in shadow.</Typography>
        <Typography variant="h2">Heading 1: The face of the moon was in shadow.</Typography>
        <Typography variant="h3">Heading 2: The face of the moon was in shadow.</Typography>
        <Typography variant="h4">Heading 3: The face of the moon was in shadow.</Typography>
        <Typography variant="h5">Heading 4: The face of the moon was in shadow.</Typography>
        <Typography variant="h6">Heading 5: The face of the moon was in shadow.</Typography>
        <Typography variant="subtitle1">Subtitle 1: The face of the moon was in shadow.</Typography>
        <Typography variant="subtitle2">Subtitle 2: The face of the moon was in shadow.</Typography>
      </Paper>
    </Container>
  );
};
Headers.story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/jNL8pygV4Ts1mLkWLUIkEN/00.-Liiingo-Design-System?node-id=1130%3A2084',
    },
  },
};

const BodyText = () => (
  <Container>
    <Paper>
      <Typography variant="body1">
        Body1: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </Typography>
      <br />
      <Typography variant="body2">
        Body2: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </Typography>
    </Paper>
  </Container>
);

BodyText.story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/jNL8pygV4Ts1mLkWLUIkEN/00.-Liiingo-Design-System?node-id=1130%3A2084',
    },
  },
};

export default {
  component: ThemeSampler,
  title: 'Typography',
  excludeStories: [],
};

export { Headers, BodyText };
