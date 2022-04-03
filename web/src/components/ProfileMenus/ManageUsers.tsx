import { useQuery } from '@apollo/client';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React, { useContext } from 'react';
import { Throbber } from '../';
import { FIND_USERS_FOR_ORGANIZATION } from '../../services/schema';
import { getUser } from '../../types/getUser';
import { AppContext } from '../../context/AppContext';
import { UserInviteForm } from '../UserInviteForm';

const useStyles = makeStyles({
  table: {
    overflow: 'scroll',
  },
  divider: {
    margin: '16px 0 16px',
  },
});

export const ManageUsers = () => {
  const { identity } = useContext(AppContext);
  const classes = useStyles();
  const onCompleted = (data) => {};
  const onError = () => {};

  const { loading, data, refetch } = useQuery<getUser>(FIND_USERS_FOR_ORGANIZATION, {
    variables: {
      filter: {
        sub: identity.id,
      },
    },
    onCompleted,
    onError,
  });

  if (loading) {
    return <Throbber withOverlay />;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" align="center">
        User List
      </Typography>
      <Divider className={classes.divider} />
      <Box pt={2} pb={2}>
        <UserInviteForm postSuccess={refetch}></UserInviteForm>
      </Box>
      <TableContainer component={Paper} className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.user?.organization?.users?.map((user) => (
              <TableRow key={user.sub}>
                <TableCell component="th" scope="row">
                  {user.email}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
