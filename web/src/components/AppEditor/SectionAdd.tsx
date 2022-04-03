import InputBase from '@material-ui/core/InputBase';
import ListItem from '@material-ui/core/ListItem';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import React, { useRef, useState } from 'react';
import { colors } from '../../theme/palette';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sectionAdd: {
      color: colors.grayLight,
    },
    icon: {
      marginRight: 5,
    },
    subMenu: {
      justifyContent: 'space-between',
      backgroundColor: colors.grayDark5,
    },
    sectionName: {
      fontWeight: 700,
      '&.Mui-focused': {
        backgroundColor: colors.pureWhite,
        borderRadius: 5,
        borderStyle: 'solid',
        borderColor: colors.blueAccent20,
        borderWidth: 0.5,
      },
      '&.Mui-disabled': {
        color: colors.pureBlack,
      },
    },
  })
);

export type SectionAddProps = {
  addSection: (name: string) => void;
  pageCount: number;
};

export const SectionAdd = (props: SectionAddProps) => {
  const { addSection } = { ...props };
  const classes = useStyles();

  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const sectionName = useRef(null);

  const renameSection = () => {
    setDisabled(false);
    setTimeout(() => {
      sectionName.current.focus();
      sectionName.current.select();
    }, 1);
  };

  const handleClick = () => {
    setVisible(true);
    renameSection();
  };

  return (
    <>
      {visible && (
        <ListItem className={classes.subMenu}>
          <InputBase
            autoFocus
            onDoubleClick={renameSection}
            disabled={disabled}
            inputRef={sectionName}
            fullWidth={false}
            className={classes.sectionName}
            defaultValue=""
            onBlur={(e) => {
              const name = e.target.value === '' ? 'New Section' : e.target.value;
              addSection(name);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sectionName.current.blur();
              }
            }}
          />
        </ListItem>
      )}
      <ListItem button onClick={handleClick} className={classes.sectionAdd}>
        <Add fontSize="small" className={classes.icon} />
        <Typography className={classes.sectionAdd}>Add Section</Typography>
      </ListItem>
    </>
  );
};
