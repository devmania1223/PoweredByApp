import { createStyles } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useState } from 'react';
import { colors } from '../../../../theme/palette';
import { LiiingoMenuItem, LiiingoMenuItemProps } from './LiiingoMenuItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      padding: 0,
      backgroundColor: colors.pureWhite,
      filter: 'drop-shadow(0px 2px 8px rgba(24, 27, 32, 0.2))',
      borderRadius: 5,
    },
  })
);

export type LiiingoContextMenuProps = {
  id: string;
  options: Omit<LiiingoMenuItemProps, 'setAnchor'>[];
  onOpen?: () => void;
};

const initialPosition = {
  mouseX: null,
  mouseY: null,
};

const defaultProps = {
  onOpen: () => {},
};

export const LiiingoContextMenu: React.FC<LiiingoContextMenuProps> = (props) => {
  const { children, id, options, onOpen } = { ...defaultProps, ...props };
  const classes = useStyles({ options });

  const [position, setPosition] = useState(initialPosition);

  const closeMenu = () => {
    setPosition(initialPosition);
  };

  const handleClick = (e) => {
    onOpen();
    e.preventDefault();
    setPosition({
      mouseX: e.clientX - 2,
      mouseY: e.clientY - 4,
    });
  };

  return (
    <div onContextMenu={handleClick}>
      {children}
      <Menu
        keepMounted
        id={id}
        open={position.mouseY !== null}
        onClose={closeMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          position.mouseY !== null && position.mouseX !== null
            ? { top: position.mouseY, left: position.mouseX }
            : undefined
        }
        classes={{ paper: classes.menu }}
        elevation={4}
      >
        {options.map((option) => {
          return (
            <LiiingoMenuItem
              {...option}
              key={`${id}_${option.text}`}
              handleClick={() => {
                option.handleClick();
                setPosition({ mouseX: null, mouseY: null });
              }}
            />
          );
        })}
      </Menu>
    </div>
  );
};
