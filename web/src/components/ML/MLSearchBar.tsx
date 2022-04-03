import InputAdornment from '@material-ui/core/InputAdornment';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState } from 'react';
import { colors } from '../../theme/palette';
import { LANGUAGE_MAP } from '../../util/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      width: 517,
    },
    searchIcon: {
      color: colors.grayDark20,
    },
  })
);

export type MultilanguageSearchBarProps = {
  supported: string[];
  addLanguages: (languageCode: string) => void;
  removeLanguage: (languageCode: string) => void;
};

type MultilanguageSearchOption = {
  code: string;
  lang: string;
};

export const MultilanguageSearchBar = (props: MultilanguageSearchBarProps) => {
  const { supported, addLanguages, removeLanguage } = { ...props };
  const classes = useStyles();
  const [tempCodes, setTempCodes] = useState([]);

  const languageOptions: MultilanguageSearchOption[] = Object.keys(LANGUAGE_MAP)
    .filter((key) => {
      if (!supported.includes(key)) {
        return key;
      }
      return null;
    })
    .map((key) => {
      return { code: key, lang: LANGUAGE_MAP[key] };
    });

  const Search = (
    <InputAdornment position="start">
      <SearchIcon className={classes.searchIcon} />
    </InputAdornment>
  );

  const Input = (params) => {
    var inputProps;

    if (params.InputProps.startAdornment) {
      let temp = params.InputProps.startAdornment;
      temp.unshift(Search);
      inputProps = {
        ...params.InputProps,
        startAdornment: temp,
      };
    } else {
      inputProps = {
        ...params.InputProps,
        startAdornment: Search,
      };
    }

    const props = {
      ...params,
      InputProps: inputProps,
    };
    return <TextField {...props} className={classes.search} label="Search" variant="outlined" />;
  };

  return (
    <Autocomplete
      id="multilanguage-search"
      multiple
      disableCloseOnSelect
      onChange={(e, value, reason) => {
        const codes = value.map((language: MultilanguageSearchOption) => language.code);
        if (reason === 'select-option') {
          setTempCodes(codes);
          addLanguages(codes[codes.length - 1]);
        } else if (reason === 'remove-option') {
          const remove = tempCodes.filter((lang) => !codes.includes(lang))[0];
          removeLanguage(remove);
          setTempCodes(supported);
        }
      }}
      forcePopupIcon={false}
      options={languageOptions}
      getOptionLabel={(option) => option.lang}
      renderInput={Input}
    />
  );
};
