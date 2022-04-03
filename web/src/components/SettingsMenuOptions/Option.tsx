import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { colors } from '../../theme/palette';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subtitle: {
      marginRight: theme.spacing(1),
      color: colors.grayLight,
    },
    label: {
      maxWidth: 150,
    },
    iconLight: {
      color: colors.grayMedium,
    },
  })
);

export type OptionProps = {
  icon?: React.FunctionComponent<SvgIconProps>;
  iconVariant?: 'light' | 'dark';
  label?: string;
  subtitle?: string;
  clickable?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const defaultProps: Partial<OptionProps> = {
  iconVariant: 'dark',
  clickable: false,
  disabled: false,
  onClick: () => {},
};

export const Option = (props: OptionProps) => {
  const { icon: Icon, iconVariant, label, subtitle, clickable, disabled, onClick } = { ...defaultProps, ...props };
  const classes = useStyles();

  return (
    <ListItem button={clickable as any} disabled={disabled as any} onClick={onClick} key={label}>
      {Icon && (
        <ListItemIcon>
          <Icon className={iconVariant === 'light' ? classes.iconLight : null} />
        </ListItemIcon>
      )}
      {subtitle && <Typography className={classes.subtitle}>{`${subtitle}:`}</Typography>}
      {label && (
        <Typography noWrap className={classes.label}>
          {label}
        </Typography>
      )}
    </ListItem>
  );
};
