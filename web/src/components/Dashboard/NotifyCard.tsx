import { ApolloQueryResult, OperationVariables, useMutation } from '@apollo/client';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Theme } from '@material-ui/core/styles/createTheme';
import Grid from '@material-ui/core/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React, { useContext, useState } from 'react';
import { ErrorContext } from '../../context/ErrorContext';
import { DELETE_NOTIFICATION_MUTATION } from '../../services/schema';
import { deleteNotification } from '../../types/deleteNotification';
import { getLocationForUser } from '../../types/getLocationForUser';
import { getScheduledNotifications } from '../../types/getScheduledNotifications';
import { NotificationsList } from '../NotificationsList';
import { CardTitle } from './CardComponents/CardTitle';
import { FlatButton } from '../Buttons/FlatButton';
import { NotifyEditor } from '../Dashboard/NotifyEditor/NotifyEditor';
import { Topic } from '../../store/models';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formCard: {
      marginBottom: 20,
      width: 500,
      height: 170,
      backgroundColor: theme.palette.background.paper,
    },
    titleBox: {
      display: 'flex',
      alignItems: 'center',
    },
    actionsContainer: {
      display: 'flex',
      flexDirection: 'row-reverse',
      textAlign: 'right',
    },
    formActionButton: {
      height: 32,
      width: 175,
      marginLeft: 8,
    },
  })
);

export type NotifyCardProps = {
  data: getLocationForUser;
  notifications: getScheduledNotifications;
  setSnackBarSuccessMessage: (options: string) => void;
  refetch: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<getScheduledNotifications>>;
  topics: Topic[];
};

export const NotifyCard = (props: NotifyCardProps) => {
  const { data, notifications, setSnackBarSuccessMessage, refetch, topics } = props;
  const { handleError = () => {} } = useContext(ErrorContext);
  const [openEditor, setOpenEditor] = useState(false);
  const classes = useStyles();

  const [deleteNotification] = useMutation<deleteNotification>(DELETE_NOTIFICATION_MUTATION, {
    onCompleted: () => {
      refetch &&
        refetch({
          variables: {
            topicId: data?.user?.location?.exhibit?.liiingoExhibitId,
          },
        });
      setSnackBarSuccessMessage('Notification Successfully Canceled');
    },
    onError: handleError,
  });

  const handleOpen = () => {
    setOpenEditor(true);
  };

  return (
    <Card variant="outlined" className={classes.formCard}>
      <CardContent>
        <CardTitle title="Notify Your Audience" />
        <Typography variant="body2" paragraph>
          Use push notifications to generate business and to re-engage your base by sending announcements or updates.
        </Typography>
        <Grid container spacing={2} className={classes.actionsContainer}>
          <Grid item xs={6}>
            <FlatButton variant="contained" onClick={handleOpen} color="secondary" className={classes.formActionButton}>
              Create Notification
            </FlatButton>
            <NotifyEditor
              open={openEditor}
              setOpen={(open: boolean) => setOpenEditor(open)}
              afterComplete={() =>
                refetch &&
                refetch({
                  variables: {
                    topicId: data?.user?.location?.exhibit?.liiingoExhibitId,
                  },
                })
              }
              topics={topics}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        {(notifications?.getNotifications?.notifications?.length ?? 0) > 0 && (
          <>
            <Typography variant="h2">Scheduled Notifications</Typography>
            <NotificationsList
              notifications={notifications?.getNotifications?.notifications ?? []}
              removeNotification={deleteNotification}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};
