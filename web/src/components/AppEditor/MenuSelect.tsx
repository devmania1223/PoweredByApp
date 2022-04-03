import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { SvgIconComponent } from '@material-ui/icons';
import AddCircle from '@material-ui/icons/AddCircleOutline';
import InsertDriveFile from '@material-ui/icons/InsertDriveFileOutlined';
import React, { useState } from 'react';
import { colors } from '../../theme/palette';
import { LiiingoTooltip } from '../LiiingoTooltip';
import { QrIcon } from '../SvgComponents/SvgQr';
import { MultiLingIcon } from '../SvgComponents/SvgMultiLing';
import { LiiingoDrawer } from './LiiingoDrawer';
import MultilanguageDrawer from '../ML/MLDrawer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageAdd: {
      backgroundColor: colors.grayLight20,
      justifyContent: 'space-between',
    },
    item: {
      '&.Mui-selected': {
        backgroundColor: theme.palette.background.default,
      },
    },
    leftNavItem: {
      paddingTop: 16,
      paddingBottom: 16,
      '&.Mui-selected': {
        backgroundColor: theme.palette.background.default,
        borderRightStyle: 'solid',
        borderRightWidth: '3px',
        borderRightColor: theme.palette.primary.main,
      },
    },
    iconSelectedColor: {
      color: theme.palette.primary.main,
    },
    iconNotSelectedColor: {
      color: colors.grayDark,
    },
  })
);

export type MenuSelectOption = {
  name: string;
  message: string;
  icon: SvgIconComponent;
};

const defaultOptions: MenuSelectOption[] = [
  {
    name: 'element',
    message: 'Elements',
    icon: AddCircle,
  },
  {
    name: 'page',
    message: 'Pages',
    icon: InsertDriveFile,
  },
  {
    name: 'qr',
    message: 'QR Code',
    icon: QrIcon,
  },
  {
    name: 'multilingual',
    message: 'Multilingual',
    icon: MultiLingIcon,
  },
];

export type MenuSelectProps = {
  selected: string;
  onLeftMenuClick: (menuOption: string) => void;
  options?: MenuSelectOption[];
};

const defaultProps: Partial<MenuSelectProps> = {
  options: defaultOptions,
};

export const MenuSelect = (props: MenuSelectProps) => {
  const { selected, onLeftMenuClick, options } = { ...defaultProps, ...props };
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  return (
    <LiiingoDrawer anchor="left" isExpanded={false}>
      <MultilanguageDrawer open={open} setOpen={setOpen} />
      <List>
        {options.map((option, index) => (
          <LiiingoTooltip key={option.name} message={option.message} placement="right" delay={2000}>
            <ListItem
              key={index}
              button
              onClick={() => {
                if (option.name === 'multilingual') setOpen(true);
                else onLeftMenuClick(option.name);
              }}
              classes={{ root: classes.leftNavItem }}
              selected={selected === option.name}
            >
              <ListItemIcon
                className={selected === option.name ? classes.iconSelectedColor : classes.iconNotSelectedColor}
              >
                <option.icon />
              </ListItemIcon>
            </ListItem>
          </LiiingoTooltip>
        ))}
      </List>
    </LiiingoDrawer>
  );
};
