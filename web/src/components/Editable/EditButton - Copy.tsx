import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { createTheme, MuiThemeProvider } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FileLanguage } from '../../store/models';
import { contentChanged } from '../../store/slices/contentSlice';
import { makeChange } from '../../store/slices/editorSlice';
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { colors } from '../../theme/palette';
import { LiiingoTooltip } from '../LiiingoTooltip';

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

      '&:focus': {
        border: '1px solid #4C6CDC',
      },
    },
    button: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.grayDark,
      padding: 10,
      textAlign: 'left',
      width: '100%',
      height: '100%',
      borderRadius: 10,
      textTransform: 'none',
    },
    textAreaHover: {
      border: '1px solid #D4DEFE',
      cursor: 'text',
    },
    textAreaFocused: {
      border: '1px solid #4C6CDC',
      cursor: 'text',
    },
  })
);

export const EditButton = (props: FileLanguage) => {
  const { content, language, isFocused, background, justify, title } = props;

  const classes = useStyles();
  const editorRef = useRef(null);
  const btnRef = useRef(null);

  const [align, setAlign] = useState(justify);
  if (justify === null) setAlign('center');

  const [backgroundColor, setBackground] = useState(background);
  if (backgroundColor === null) setBackground(colors.btnBack);
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
          content: editorRef.current.getContent(),
          background: backgroundColor,
          justify: align,
          title: '',
        },
      });
      return false;
    }
  };

  const tinyInit = {
    menubar: 'false',
    inline: true,
    preformatted: true,
    fixed_toolbar_container: '#tinyToolbarSpot', //use this to place the menu bar inside another element
    plugins: 'code lists advlist link',
    toolbar: ['fontselect fontsizeselect', 'alignleft aligncenter alignright ', 'forecolor backcolor'],
    content_style:
      '.mce-edit-focus { outline: none; }  p { margin-top: 0px !important; margin-bottom: 0px !important; } ',
    default_link_target: '_blank',
    target_list: false,
    link_title: false,
    setup: function (ed) {
      ed.on('keydown', function (e) {
        if (e.keyCode === 13) {
          editorRef.current.mode.set('readonly');
          setIsTextFocus(false);
          setIsTextOver(false);
          handleChange(e);
          e.preventDefault();
        }
      });
    },
  };

  const handleBtnClick = (e) => {
    const target = e.target as HTMLElement;
    if (e.detail === 1) {
      if (isFocused && (target.tagName === 'SPAN' || target.tagName === 'P')) {
        editorRef.current.mode.set('design');
      } else {
        editorRef.current.mode.set('readonly');
        setIsTextFocus(false);
      }
    }
  };

  const setEditorFocus = () => {
    editorRef.current.mode.set('design');
    handleEditorFocus();
  };

  const handleEditor = (e) => {
    let color: any = e.ui;
    if (e.command === 'mceApplyTextcolor') {
      if (color === 'hilitecolor') {
        setBackground(e.value);
        editorRef.current.getBody().style.backgroundColor = e.value;
        btnRef.current.style.backgroundColor = e.value;
      }
    }
    if (e.command === 'JustifyLeft') setAlign('left');
    if (e.command === 'JustifyCenter') setAlign('center');
    if (e.command === 'JustifyRight') setAlign('right');

    return false;
  };

  const handleEditorFocus = () => {
    if (isFocused) {
      editorRef.current.selection.select(editorRef.current.getBody(), true);
      setIsTextFocus(true);
    }
  };

  const handleEditorFocusOut = () => {
    if (editorRef.current.getContent() === '') editorRef.current.setContent(content);
    setIsTextFocus(false);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.buttonArea}>
        {isFocused ? (
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
              className={classes.button}
              style={{ justifyContent: justify, backgroundColor: background }}
              ref={btnRef}
              onDoubleClick={setEditorFocus}
              onClick={handleBtnClick}
            >
              <div
                style={{
                  width: '100%',
                  marginLeft: 10,
                  marginRight: 10,
                  textAlign: justify,
                }}
                className={isTextFocus ? classes.textAreaFocused : isTextOver ? classes.textAreaHover : null}
              >
                <Editor
                  onMouseOver={(e) => {
                    if (isFocused) setIsTextOver(true);
                  }}
                  onMouseOut={(e) => {
                    setIsTextOver(false);
                  }}
                  onFocus={handleEditorFocus}
                  onFocusOut={handleEditorFocusOut}
                  onInit={(evt, editor) => {
                    editorRef.current = editor;
                  }}
                  initialValue={title === null || title === '' ? content : title}
                  apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                  init={tinyInit}
                  onBlur={handleChange}
                  onExecCommand={handleEditor}
                />
              </div>
            </Button>
          </LiiingoTooltip>
        ) : (
          <Button
            fullWidth
            variant="contained"
            className={classes.button}
            style={{ justifyContent: justify, backgroundColor: background }}
            ref={btnRef}
            onDoubleClick={setEditorFocus}
            onClick={handleBtnClick}
          >
            <div
              style={{
                width: '100%',
                marginLeft: 10,
                marginRight: 10,
                textAlign: justify,
              }}
              className={isTextFocus ? classes.textAreaFocused : isTextOver ? classes.textAreaHover : null}
            >
              <Editor
                onMouseOver={(e) => {
                  if (isFocused) setIsTextOver(true);
                }}
                onMouseOut={(e) => {
                  setIsTextOver(false);
                }}
                onFocus={handleEditorFocus}
                onFocusOut={handleEditorFocusOut}
                onInit={(evt, editor) => {
                  editorRef.current = editor;
                }}
                initialValue={title === null || title === '' ? content : title}
                apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                init={tinyInit}
                onBlur={handleChange}
                onExecCommand={handleEditor}
              />
            </div>
          </Button>
        )}
      </div>
    </MuiThemeProvider>
  );
};
