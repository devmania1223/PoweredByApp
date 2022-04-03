import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { colors } from '../../../../theme/palette';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: 10,
      marginBottom: 10,
    },
    title: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: colors.grayLight,
    },

    lightGray: {
      color: colors.grayLight,
    },
    menu: {
      backgroundColor: colors.grayLight5,
      borderStyle: 'solid',
      borderRadius: 10,
      borderColor: colors.grayLight20,
      '& li': {
        fontSize: 14,
      },
      '& li:hover': {
        backgroundColor: colors.tealAccent20,
      },
    },
  })
);

export type ChartContentProps = {
  name: string;
  label?: string;
  selected?: string;
  options?: string[];
  setSelected?: (selected: string) => void;
};

export const ChartContent: React.FC<ChartContentProps> = (props) => {
  const { children, name, label, selected, options, setSelected } = props;
  const classes = useStyles();

  const handleChange = (e) => setSelected(e.target.value);

  return (
    <Box className={classes.container}>
      <Box className={classes.title}>
        <Typography variant="subtitle2">{name}</Typography>
        {options ? (
          <Select
            onChange={handleChange}
            value={selected}
            MenuProps={{ classes: { paper: classes.menu } }}
            classes={{
              root: classes.lightGray,
              icon: classes.lightGray,
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                <Typography variant="caption">{option}</Typography>
              </MenuItem>
            ))}
          </Select>
        ) : (
          label && <Typography variant="caption">{label}</Typography>
        )}
      </Box>
      {children}
    </Box>
  );
};
