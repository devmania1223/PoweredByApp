import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { createTheme, MuiThemeProvider } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FileLanguage } from '../../store/models';
import { contentChanged } from '../../store/slices/contentSlice';
import { makeChange } from '../../store/slices/editorSlice';
import React, { useRef, useState } from 'react';
import { colors } from '../../theme/palette';
import { LiiingoTooltip } from '../LiiingoTooltip';
import InputBase from '@material-ui/core/InputBase';

const theme = createTheme({
  props: {
    // Name of the component
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application!
    },
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonArea: {
      '&:hover': {
        border: '1px solid #D4DEFE',
      },

      '&.Mui-focused': {
        border: '1px solid #4C6CDC',
      },
    },
    button: {
      fontSize: 16,
      fontWeight: 'bold',
      backgroundColor: colors.btnBack,
      color: colors.grayDark,
      padding: 10,
      textAlign: 'left',
      width: '100%',
      height: '100%',
      borderRadius: 10,
      textTransform: 'none',
    },
    textArea: {
      color: colors.grayDark,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      width: '100%',
    },
  })
);

export const EditButton = (props: FileLanguage) => {
  const { content, language, isFocused, title } = props;

  const classes = useStyles();
  const editorRef = useRef(null);
  const btnRef = useRef(null);

  const [isTextFocus, setIsTextFocus] = useState(false);
  const [isTextOver, setIsTextOver] = useState(false);

  const dispatch = useDispatch();
  const onContentChanged = bindActionCreators(contentChanged, dispatch);
  const makeChangeAction = bindActionCreators(makeChange, dispatch);

  const handleChange = (e) => {
    if (isFocused) {
      makeChangeAction(true);
      onContentChanged({
        content: {
          language: language,
          content: e.target.value,
          title: e.target.value,
        },
      });
    }
  };

  const handleEditorFocus = () => {
    if (isFocused) {
      editorRef.current.readOnly = false;
      editorRef.current.select();
      setIsTextFocus(true);
    }
  };

  const handleEditorFocusOut = () => {
    if (editorRef.current.value === '') editorRef.current.value = content;
    setIsTextFocus(false);
    editorRef.current.readOnly = true;
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.buttonArea}>
        <LiiingoTooltip
          placement="top"
          message={
            isFocused
              ? isTextOver
                ? 'Click to edit button text.'
                : 'Double-click to edit button text.'
              : 'Double-click to edit button text'
          }
          delay={2000}
        >
          <Button
            fullWidth
            variant="contained"
            ref={btnRef}
            className={classes.button}
            onDoubleClick={handleEditorFocus}
          >
            <InputBase
              inputProps={{
                className: classes.textArea,
                style: {
                  cursor: isTextFocus || isTextOver ? 'text' : 'pointer',
                  border: isTextFocus ? '1px solid #4C6CDC' : isTextOver ? '1px solid #D4DEFE' : null,
                },
              }}
              defaultValue={title === null || title === '' ? content : title}
              inputRef={editorRef}
              fullWidth
              readOnly
              onMouseOver={(e) => {
                if (isFocused) setIsTextOver(true);
              }}
              onMouseOut={(e) => {
                setIsTextOver(false);
              }}
              onClick={(e) => {
                handleEditorFocus();
              }}
              onFocus={handleEditorFocus}
              onBlur={(e) => {
                handleChange(e);
                handleEditorFocusOut();
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  editorRef.current.blur();
                  setIsTextFocus(false);
                  setIsTextOver(false);
                }
              }}
            />
          </Button>
        </LiiingoTooltip>
      </div>
    </MuiThemeProvider>
  );
};
