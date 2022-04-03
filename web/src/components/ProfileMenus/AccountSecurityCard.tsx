import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { DangerousButton } from '../Buttons/DangerousButton';
export type Props = {
  onCloseAccountDialogOpen?: (isOpen: boolean) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formActions: {
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row-reverse',
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(1),
        flexDirection: 'row',
      },
    },
    formCard: {
      marginBottom: 20,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export const AccountSecurityCard = ({ onCloseAccountDialogOpen = (isOpen: boolean) => {} }: Props) => {
  const classes = useStyles();
  return (
    <>
      <Card variant="outlined" className={classes.formCard}>
        <CardHeader title="Account & Security" />
        <CardContent>
          <Grid container>
            {/* <Grid container item xs={12} md={12}>
              <Grid item xs container direction="row" spacing={2}>
                <Grid item xs={12} md={12}>
                  <Typography gutterBottom variant="subtitle1">
                    EMAIL VERIFICATION
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Help us keep your Liiingo account secure by verifying your email
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} className={classes.formActions}>
                  <FlatButton role="button" type="submit" variant="contained" color="primary">
                    Verify My Email
                  </FlatButton>
                </Grid>
              </Grid>
            </Grid> */}
            <Grid container item xs={12} md={12}>
              <Grid item xs container direction="row" spacing={2}>
                <Grid item xs={12} md={12}>
                  <Typography gutterBottom variant="subtitle1">
                    CLOSE YOUR ACCOUNT
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    We're sad to see you go, but you can come back any time!
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} className={classes.formActions}>
                  <DangerousButton onClick={() => onCloseAccountDialogOpen(true)} data-cy={'closeAccount'}>
                    Close My Account
                  </DangerousButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
