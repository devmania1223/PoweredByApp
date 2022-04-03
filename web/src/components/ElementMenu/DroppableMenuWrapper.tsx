import ListItem from '@material-ui/core/ListItem';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    noPlaceholder: {
      display: 'none',
    },
    droppable: {
      width: '100%',
    },
  })
);

export type DroppableMenuWrapperProps = {
  id: string;
  dropDisabled?: boolean;
  disableGutters?: boolean;
  placeholder?: boolean;
};

const defaultProps = {
  dropDisabled: true,
  disableGutters: false,
  placeholder: false,
};

export const DroppableMenuWrapper: React.FC<DroppableMenuWrapperProps> = (props) => {
  const { children, id, dropDisabled, disableGutters, placeholder } = { ...defaultProps, ...props };
  const classes = useStyles();

  return (
    <ListItem disableGutters={disableGutters}>
      <Droppable droppableId={id} isDropDisabled={dropDisabled}>
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className={classes.droppable}>
            {children}
            <div className={!placeholder ? classes.noPlaceholder : null}>{provided.placeholder}</div>
          </div>
        )}
      </Droppable>
    </ListItem>
  );
};
