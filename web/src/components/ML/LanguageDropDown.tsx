import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Language } from '../../store/models';
import { addTip, setActiveLanguageCode, _activeLanguageCode } from '../../store/slices/editorSlice';
import { _defaultLanguage, _supportedLanguages } from '../../store/slices/locationSlice';
import { colors } from '../../theme/palette';
import { LANGUAGE_MAP, NEW_LANGUAGE_CONTENT_TIP } from '../../util/constants';
import Box from '@material-ui/core/Box';
import { LiiingoTooltip } from '../LiiingoTooltip';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  menuBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 20,
  },
  menu: {
    backgroundColor: colors.grayLight5,
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: colors.grayLight20,
    borderRadius: 10,
    padding: 0,
    marginTop: 43,
    width: 120,
    marginLeft: -11,
    '& li': {
      fontSize: 12,
      paddingLeft: 8,
    },
    '& li:hover': {
      backgroundColor: 'linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), #49525D',
    },
    '& li.Mui-selected': {
      backgroundColor: colors.tealAccent20,
    },
  },
  select: {
    width: 120,
    height: 32,
    backgroundColor: colors.pureWhite,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.grayLight,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 12,
    '&:hover': {
      borderColor: colors.blueAccent20,
    },
    '&.Mui-focused': {
      borderColor: colors.blueAccent,
      backgroundColor: colors.pureWhite,
    },
    '& div.MuiSelect-select:focus': {
      backgroundColor: colors.pureWhite,
    },
  },
  whiteColor: {
    color: colors.neutralDark,
  },
  fullWidth: {
    width: '100%',
  },
  root: {
    marginLeft: 300,
  },
});

const StyledBadge = withStyles((theme) => ({
  badge: {
    left: 60,
    top: -5,
    width: 120,
    zIndex: 2000,
  },
}))(Badge);

export type LanguageDropdownProps = {
  activeLanguageCode: Language;
  defaultLanguage: Language;
  supportedLanguages: Language[];
  setActiveLanguageCode: (code: Language) => void;
  addTip: (tip: string) => void;
};

export const LanguageDropdown = (props: LanguageDropdownProps) => {
  const classes = useStyles();
  const [hideBadge, setHideBadge] = useState(true);
  const [focusBadge, setFocusBadge] = useState(false);
  const { activeLanguageCode, defaultLanguage, supportedLanguages, setActiveLanguageCode, addTip } = {
    ...props,
  };

  const handleChange = (e) => {
    if (defaultLanguage !== e.target.value) {
      addTip(NEW_LANGUAGE_CONTENT_TIP);
    }
    setActiveLanguageCode(e.target.value);
  };

  return supportedLanguages.length > 1 ? (
    <Box className={classes.menuBox}>
      <LiiingoTooltip message="Switch between added languages" placement="bottom" delay={2000}>
        <StyledBadge
          color={focusBadge ? 'primary' : 'default'}
          badgeContent={'Language Menu'}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          invisible={hideBadge && !focusBadge}
          className={classes.fullWidth}
        >
          <div
            className={classes.fullWidth}
            onPointerOver={() => {
              setHideBadge(false);
            }}
            onPointerLeave={() => {
              setHideBadge(true);
            }}
            onFocus={() => {
              setFocusBadge(true);
            }}
            onBlur={() => {
              setFocusBadge(false);
              setHideBadge(true);
            }}
          >
            <Select
              labelId="language-dropdown"
              id="language"
              value={activeLanguageCode}
              onChange={handleChange}
              MenuProps={{ classes: { paper: classes.menu } }}
              className={classes.select}
              classes={{
                icon: classes.whiteColor,
              }}
              disableUnderline
            >
              {Object.keys(LANGUAGE_MAP).map(
                (key: Language) =>
                  supportedLanguages.includes(key) && (
                    <MenuItem value={key} key={key}>
                      {LANGUAGE_MAP[key]}
                    </MenuItem>
                  )
              )}
            </Select>
          </div>
        </StyledBadge>
      </LiiingoTooltip>
    </Box>
  ) : null;
};

const LanguageDropdownContainer = () => {
  const dispatch = useDispatch();

  const activeLanguageCode = useSelector(_activeLanguageCode);
  const defaultLanguage = useSelector(_defaultLanguage);
  const supportedLanguages = useSelector(_supportedLanguages);

  const state = {
    activeLanguageCode,
    defaultLanguage,
    supportedLanguages,
  };

  const actions = bindActionCreators(
    {
      setActiveLanguageCode,
      addTip: addTip,
    },
    dispatch
  );

  return <LanguageDropdown {...state} {...actions} />;
};

export default LanguageDropdownContainer;
