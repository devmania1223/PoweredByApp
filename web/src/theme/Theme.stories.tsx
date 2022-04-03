import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { SSOButton } from '../components/Buttons';
import { FlatButton } from '../components/Buttons/FlatButton';

const useStyles = makeStyles({
  withMargin: {
    margin: 5,
  },
  withPadding: {
    padding: '2em',
  },
});

const ThemeSampler = () => <div></div>;

const InputThemes = () => {
  const classes = useStyles();
  return (
    <Container>
      <Paper className={`${classes.withMargin} ${classes.withPadding}`}>
        <Grid item xs={12}>
          <Typography>Flat Buttons</Typography>
          <FlatButton className={classes.withMargin} variant="contained">
            <Typography variant="button">Default</Typography>
          </FlatButton>
          <FlatButton className={classes.withMargin} variant="contained" color="primary">
            Primary
          </FlatButton>
          <FlatButton className={classes.withMargin} variant="contained" color="secondary">
            Secondary
          </FlatButton>
          <FlatButton className={classes.withMargin} variant="contained" disabled>
            Disabled
          </FlatButton>
        </Grid>

        <Grid item xs={12}>
          <FlatButton className={classes.withMargin} variant="outlined">
            Default
          </FlatButton>
          <FlatButton className={classes.withMargin} variant="outlined" color="primary">
            Primary
          </FlatButton>
          <FlatButton className={classes.withMargin} variant="outlined" color="secondary">
            Secondary
          </FlatButton>
          <FlatButton className={classes.withMargin} variant="outlined" disabled>
            Disabled
          </FlatButton>
        </Grid>

        <Grid item xs={12}>
          <Typography>Buttons with Elevation</Typography>
          <Button className={classes.withMargin} variant="contained">
            Default
          </Button>
          <Button className={classes.withMargin} variant="contained" color="primary">
            Primary
          </Button>
          <Button className={classes.withMargin} variant="contained" color="secondary">
            Secondary
          </Button>
          <Button className={classes.withMargin} variant="contained" disabled>
            Disabled
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography>SSO Buttons</Typography>
          <SSOButton provider="Google" />
          <SSOButton provider="Facebook" />
        </Grid>

        <Grid item xs={12}>
          <Typography>Auxilliary Actions</Typography>
          <Button className={classes.withMargin} variant="text" color="primary">
            Sign Up
          </Button>
          <Button className={classes.withMargin} variant="text" color="secondary">
            Already have an account?
          </Button>
          <Button className={classes.withMargin} variant="text">
            Forgot Password
          </Button>
        </Grid>
      </Paper>

      <Paper className={`${classes.withMargin} ${classes.withPadding}`}>
        <Grid item xs={12}>
          <Typography>Toggles</Typography>
          <FormControl component="fieldset" style={{ display: 'block' }}>
            <FormLabel component="legend">color: 'default'</FormLabel>
            <Switch color="default" name="demoSwitchOffDefault" />
            <Switch color="default" checked name="demoSwitchOnDefault" />
          </FormControl>
          <FormControl component="fieldset" style={{ display: 'block' }}>
            <FormLabel component="legend">color: 'primary'</FormLabel>
            <Switch color="primary" name="demoSwitchOffPrimary" />
            <Switch color="primary" checked name="demoSwitchOnPrimary" />
          </FormControl>
          <FormControl component="fieldset" style={{ display: 'block' }}>
            <FormLabel component="legend">color: 'secondary'</FormLabel>
            <Switch color="secondary" name="demoSwitchOffSecondary" />
            <Switch color="secondary" checked name="demoSwitchOnSecondary" />
          </FormControl>
        </Grid>
      </Paper>
      <Paper className={`${classes.withMargin} ${classes.withPadding}`}>
        <Typography className={classes.withMargin}>TextFields</Typography>
        <TextField
          className={classes.withMargin}
          label="Outlined Empty"
          type="text"
          fullWidth
          variant="outlined"
          name="outlinedEmpty"
        />

        <TextField
          className={classes.withMargin}
          label="Outlined Error"
          type="text"
          error={true}
          fullWidth
          variant="outlined"
          name="outlinedError"
          helperText="There's an error in this input field"
        />
      </Paper>
      <Paper className={`${classes.withMargin} ${classes.withPadding}`}>
        <Typography>Checkboxes</Typography>
        <Table>
          <TableHead>
            <TableCell>Unselected</TableCell>
            <TableCell>Selected</TableCell>
            <TableCell>Indeterminate</TableCell>
            <TableCell>Color</TableCell>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Checkbox color="primary" />
              </TableCell>
              <TableCell>
                <Checkbox color="primary" checked />
              </TableCell>
              <TableCell>
                <Checkbox color="primary" indeterminate />
              </TableCell>
              <TableCell>Primary</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Checkbox color="primary" disabled />
              </TableCell>
              <TableCell>
                <Checkbox color="primary" checked disabled />
              </TableCell>
              <TableCell>
                <Checkbox color="primary" indeterminate disabled />
              </TableCell>
              <TableCell>Disabled (Primary)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Checkbox color="secondary" />
              </TableCell>
              <TableCell>
                <Checkbox color="secondary" checked />
              </TableCell>
              <TableCell>
                <Checkbox color="secondary" indeterminate />
              </TableCell>
              <TableCell>Error (Secondary)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <FormControlLabel control={<Checkbox color="primary" />} label="checkbox label" labelPlacement="end" />
              </TableCell>
              <TableCell>
                <FormControlLabel
                  control={<Checkbox color="primary" checked />}
                  label="checkbox label"
                  labelPlacement="end"
                />
              </TableCell>
              <TableCell>
                <FormControlLabel
                  control={<Checkbox color="primary" indeterminate />}
                  label="checkbox label"
                  labelPlacement="end"
                />
              </TableCell>
              <TableCell>Primary with Label</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <FormControlLabel
                  control={<Checkbox color="primary" disabled />}
                  label="checkbox label"
                  labelPlacement="end"
                />
              </TableCell>
              <TableCell>
                <FormControlLabel
                  control={<Checkbox color="primary" checked disabled />}
                  label="checkbox label"
                  labelPlacement="end"
                />
              </TableCell>
              <TableCell>
                <FormControlLabel
                  control={<Checkbox color="primary" indeterminate disabled />}
                  label="checkbox label"
                  labelPlacement="end"
                />
              </TableCell>
              <TableCell>Disabled with Label</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <FormControlLabel
                  control={<Checkbox color="secondary" />}
                  label="checkbox label"
                  labelPlacement="end"
                />
              </TableCell>
              <TableCell>
                <FormControlLabel
                  control={<Checkbox color="secondary" checked />}
                  label="checkbox label"
                  labelPlacement="end"
                />
              </TableCell>
              <TableCell>
                <FormControlLabel
                  control={<Checkbox color="secondary" indeterminate />}
                  label="checkbox label"
                  labelPlacement="end"
                />
              </TableCell>
              <TableCell>Error (Secondary) with Label</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default {
  component: ThemeSampler,
  subcomponents: { InputThemes },
  title: 'Theme Sampler',
  excludeStories: [],
};

export { InputThemes };
