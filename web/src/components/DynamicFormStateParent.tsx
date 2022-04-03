import {
  Accordion,
  AccordionSummary,
  CircularProgress,
  createStyles,
  Grid,
  Link,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Collapse from '@material-ui/core/Collapse';
import { Delete, ExpandMore } from '@material-ui/icons';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Alert from '@material-ui/lab/Alert';
import React, { cloneElement, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useOnExhibitSubmit } from '../hooks/useOnExhibitSubmit';
import { ContentMap } from '../onboardingTemplates/templateTypes';
import {
  Location_location_exhibit_templatedContent,
  Location_location_exhibit_templatedContent_languages,
} from '../types/Location_location_exhibit';
import { LANGUAGE_MAP } from '../util/constants';
import { withoutDefault } from '../util/withoutDefault';
import { FlatButton } from './Buttons';
import { LanguageDropdown } from './LanguageDropdown';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionsContainer: {
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'flex-start',
      paddingTop: theme.spacing(1),
    },
    formActionButton: {
      width: 125,
      marginLeft: theme.spacing(1),
    },
    hiddenField: {
      display: 'none',
    },
    accordionSummary: {
      transform: 'none !important',
    },
    errorAlert: {
      marginTop: '5px',
    },
  })
);

type DynamicFormStateParentProps = {
  templatedContent: Location_location_exhibit_templatedContent[];
  locationId: string;
  contentMap: ContentMap;
  children: JSX.Element;
};

const validateMultilanguage = (data, localLanguages): boolean => {
  var valid = true;
  localLanguages.forEach((value) => {
    if (!value) {
      valid = false;
    }
  });
  return valid;
};

export const DynamicFormStateParent: React.FC<DynamicFormStateParentProps> = (props) => {
  const classes = useStyles();
  const methods = useForm({
    criteriaMode: 'all',
    mode: 'onBlur',
  });

  const { locationId, templatedContent, children, contentMap } = props;

  const deduplicateArray = (array): any[] => {
    return Array.from(new Set([].concat(...array)));
  };

  const prunedContent = templatedContent.map((content) => {
    const newContent: Location_location_exhibit_templatedContent = {
      ...content,
    };
    if (content.languages) {
      newContent.languages = Object.fromEntries(
        Object.entries(content.languages).filter(([, languageValue]) => languageValue != null)
      ) as Location_location_exhibit_templatedContent_languages;
    }
    return newContent;
  });

  const prunedLanguages = Array.isArray(prunedContent)
    ? deduplicateArray(
        prunedContent
          ?.reduce((accumulator, content) => accumulator.concat(Object.keys(content.languages || [])), [] as string[])
          .filter((value) => value !== '__typename')
      )
    : ['en'];
  const [localLanguages, setLocalLanguages] = useState(prunedLanguages.length === 0 ? ['en'] : prunedLanguages);
  const [openness, setOpenness] = useState<boolean[]>(new Array(localLanguages.length).fill(false));
  const [openError, setOpenError] = useState(false);
  const { formState, handleSubmit } = methods;

  const prepareRawData = (data) => {
    var preparedData = {};
    localLanguages.forEach((key) => {
      preparedData[key] = data[key];
    });
    return preparedData;
  };

  const onFormSubmit = (data) => {
    const valid = validateMultilanguage(data, localLanguages);
    if (valid) {
      setOpenError(false);
      const preparedData = prepareRawData(data);
      onSubmit(preparedData);
    } else {
      setOpenError(true);
    }
  };

  const toggleAccordionVisibility = (index, expanded) => {
    openness[index] = expanded;
    setOpenness([...openness]);
  };

  const [unavailableLanguages, setUnavailableLanguages] = useState(
    localLanguages.reduce((accumulator, language) => {
      accumulator[language] = `${language}.language`;
      return accumulator;
    }, {})
  );

  const addLanguage = () => {
    openness.push(false);
    setLocalLanguages(localLanguages.concat(['']));
  };

  const removeLanguage = (languageCode, index) => {
    setOpenness(openness.filter((item, i) => i !== index));
    setLocalLanguages(localLanguages.filter((item, i) => i !== index));
    var updateUnavailable = unavailableLanguages;
    delete updateUnavailable[languageCode];
    setUnavailableLanguages(updateUnavailable);
  };

  const [onSubmit, { loading: saving }] = useOnExhibitSubmit<any>(locationId, contentMap);

  if (!children) {
    return null;
  }

  return (
    <FormProvider {...methods}>
      <Grid container spacing={2}>
        <Grid item>
          {localLanguages.map((languageCode, index) => (
            <Accordion
              key={`${languageCode}${index}`}
              expanded={openness[index]}
              onChange={() => toggleAccordionVisibility(index, !openness[index])}
            >
              <AccordionSummary
                classes={{
                  expandIcon: classes.accordionSummary,
                }}
                expandIcon={
                  <>
                    {openness[index] ? <KeyboardArrowUpIcon /> : <ExpandMore />}
                    {localLanguages.length > 1 && (
                      <Delete
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeLanguage(languageCode, index);
                        }}
                        onFocus={(e) => {
                          e.stopPropagation();
                        }}
                        aria-label="Remove Language"
                      />
                    )}
                  </>
                }
              >
                {' '}
                <Typography variant="subtitle1">{LANGUAGE_MAP[languageCode] || 'New'} Content</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item>
                    <LanguageDropdown
                      index={index}
                      language={languageCode}
                      localLanguages={localLanguages}
                      updateLocalLanguages={setLocalLanguages}
                      unavailable={unavailableLanguages}
                      updateUnavailableLanguages={setUnavailableLanguages}
                    />
                  </Grid>
                  <Grid item>{cloneElement(props.children, { index: languageCode })}</Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
        <Grid item container alignItems="center" alignContent="center" justifyContent="space-between">
          <Grid item>
            <Link onClick={addLanguage}>
              <Typography variant="body1">+ Add Language</Typography>
            </Link>
          </Grid>
          <Grid item>
            {localLanguages.length !== 0 && (
              <FlatButton
                variant="contained"
                onClick={withoutDefault(handleSubmit(onFormSubmit))}
                color="primary"
                className={classes.formActionButton}
                disabled={formState.isSubmitting}
              >
                {formState.isSubmitting || saving ? <CircularProgress color="secondary" size={20} /> : 'Save'}
              </FlatButton>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Collapse in={openError}>
        <Alert className={classes.errorAlert} severity={'error'}>
          <strong>All forms must have a selected language</strong>
        </Alert>
      </Collapse>
    </FormProvider>
  );
};

// const SaveButton = ({ onClick }) => <Button onClick={onClick}>SAVE BUTTON HERE</Button>;
