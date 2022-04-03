import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Close from '@material-ui/icons/Close';
import React from 'react';
import { getScheduledNotifications_getNotifications_notifications } from '../types/getScheduledNotifications';

const useStyles = makeStyles({
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
  },
  formActionButton: {
    width: 64,
    marginLeft: 8,
  },
  table: {
    overflow: 'scroll',
  },
  divider: {
    margin: '16px 0 16px',
  },
});

export type Fields = {
  message: string;
};

export type NotificationListProps = {
  notifications: getScheduledNotifications_getNotifications_notifications[];
  removeNotification: Function;
};

export const NotificationsList = ({ notifications, removeNotification }: NotificationListProps) => {
  const classes = useStyles();

  const renderForm = () => (
    <>
      <TableContainer component={Paper} className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Message</TableCell>
              <TableCell>Scheduled Time</TableCell>
              <TableCell>Cancel</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications
              .slice()
              ?.sort(
                (first, second) => new Date(first.scheduleTime).getTime() - new Date(second.scheduleTime).getTime()
              )
              ?.map((notification) => (
                <TableRow key={notification?._id}>
                  <TableCell component="th" scope="row">
                    {notification.message}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {notification.scheduleTime && new Date(notification.scheduleTime).toLocaleString()}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        removeNotification({ variables: { id: notification._id } });
                      }}
                    >
                      <Close />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  // if (saving) {
  //   return <Throbber />;
  // }

  return renderForm();
};
