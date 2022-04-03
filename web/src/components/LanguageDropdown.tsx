import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { colors } from '../theme/palette';
import { LANGUAGE_MAP } from '../util/constants';

const useStyles = makeStyles({
  languageLabel: {
    color: '#8D9BAF',
  },
  languageDesc: {},
  languageField: {
    width: '258px',
    height: '59px',
    margin: '10px 0 25px 0',
    display: 'block',
  },
  dropdownDiv: {
    display: 'block',
  },
  menu: {
    backgroundColor: colors.grayLight5,
    borderStyle: 'solid',
    borderRadius: 10,
    borderColor: colors.grayLight20,
  },
});

export type LanguageDropdownProps = {
  language?: string;
  index: number;
  localLanguages: any[];
  updateLocalLanguages: (options: object) => void;
  unavailable: {};
  updateUnavailableLanguages: (options: object) => void;
};
const defaultProps = {
  language: '',
};

export const LanguageDropdown = (props: LanguageDropdownProps) => {
  const { language, localLanguages, unavailable, updateUnavailableLanguages, updateLocalLanguages, index } = {
    ...defaultProps,
    ...props,
  };
  const classes = useStyles();
  const { register, setValue } = useFormContext();
  const [errorStatus, setErrorStatus] = useState(!language);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [inUseLanguages, setinUseLanguages] = useState(unavailable);
  const [name, setName] = useState(`${language}.language`);

  useEffect(() => {
    setinUseLanguages({ ...unavailable });
  }, [unavailable]);
  useEffect(() => {
    const newName = `${language}.language`;
    setName(newName);
    setValue(newName, language, { shouldValidate: true });
  }, [language, setValue]);

  const promptLanguageSelect = (e) => {
    const lang = e.target.value;
    const newName = `${lang}.language`;
    setSelectedLanguage(lang);
    setErrorStatus(false);
    setName(newName);
    var unavailableLanguages = inUseLanguages;
    Object.keys(unavailableLanguages).forEach((key) => {
      if (unavailableLanguages[key] === name) {
        delete unavailableLanguages[key];
      }
    });
    unavailableLanguages[lang] = newName;
    updateUnavailableLanguages(unavailableLanguages);
    var localLanguagesUpdated = localLanguages;
    localLanguagesUpdated[index] = lang;
    updateLocalLanguages(localLanguagesUpdated);
  };

  return (
    <div className={classes.dropdownDiv}>
      <Typography className={classes.languageLabel} variant="caption">
        Language
      </Typography>
      <Typography className={classes.languageDesc} variant="body1">
        Select the language you will be using for the content below.
      </Typography>
      <TextField
        fullWidth
        select
        required
        {...register(name)}
        variant="outlined"
        id={name}
        name={name}
        label="Language"
        value={selectedLanguage}
        error={errorStatus}
        helperText={errorStatus && 'Please Select a Language'}
        className={classes.languageField}
        onChange={promptLanguageSelect}
        SelectProps={{
          MenuProps: {
            classes: {
              paper: classes.menu,
            },
          },
        }}
      >
        {Object.keys(LANGUAGE_MAP).map(
          (key) =>
            (!inUseLanguages[key] || inUseLanguages[key] === name) && (
              <MenuItem value={key} key={key}>
                {LANGUAGE_MAP[key]}
              </MenuItem>
            )
        )}
      </TextField>
    </div>
  );
};
