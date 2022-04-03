import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FlatButton } from '../Buttons/FlatButton';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
export type Props = {
  disabled?: boolean;
  isUpgrade?: string;
  onHandleAddBill?: () => void;
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

export const BillingInformationCard = ({ disabled = false, isUpgrade = '', onHandleAddBill = () => {} }: Props) => {
  const classes = useStyles();
  return (
    <>
      <Card variant="outlined" className={classes.formCard}>
        <CardHeader title="Billing Information" />
        <CardContent>
          <Grid container>
            <Grid container item xs={12} md={12}>
              <Grid item xs container direction="row" spacing={2}>
                <Grid item xs={12} md={12}>
                  <Typography gutterBottom variant="subtitle1">
                    Add billing information to your Liiingo account to keep everything running without interruption
                    after your free trial ends.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} className={classes.formActions}>
                  <FlatButton disabled={disabled} onClick={onHandleAddBill} variant="contained" color="secondary">
                    {isUpgrade === 'true' ? 'Manage Billing' : 'Add Billing Info'}
                  </FlatButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
