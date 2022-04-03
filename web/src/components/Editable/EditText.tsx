import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FileLanguage } from '../../store/models';
import { contentChanged } from '../../store/slices/contentSlice';
import { makeChange } from '../../store/slices/editorSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    focus: {
      cursor: 'text',
    },
  })
);

export const EditText = (props: FileLanguage) => {
  const { content, language, isFocused, newElement } = props;
  const editorRef = useRef(null);
  const classes = useStyles();

  const dispatch = useDispatch();
  const onContentChanged = bindActionCreators(contentChanged, dispatch);
  const makeChangeAction = bindActionCreators(makeChange, dispatch);

  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    if (isFocused) {
      setIsEdit(false);
      makeChangeAction(true);
      onContentChanged({
        content: {
          language: language,
          content: editorRef.current.getContent(),
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
    toolbar: [
      'code link',
      'bold italic underline strikethrough',
      'formatselect fontselect fontsizeselect',
      'alignleft aligncenter alignright alignjustify',
      'bullist numlist outdent indent',
      'forecolor backcolor',
      'removeformat',
    ],
    content_style: '.mce-edit-focus { outline: none; } ,  ',
    default_link_target: '_blank',
    target_list: false,
    link_title: false,
  };

  const setEditorDesign = () => {
    editorRef.current.mode.set('design');
    setIsEdit(true);
  };

  const setEditorReadonly = () => {
    if (!isEdit) editorRef.current.mode.set('readonly');
  };

  return (
    <div
      className={isFocused && isEdit ? classes.focus : null}
      onDoubleClick={setEditorDesign}
      onClick={setEditorReadonly}
    >
      <Editor
        onInit={(evt, editor) => {
          editorRef.current = editor;
          if (newElement) {
            setTimeout(() => {
              editorRef.current.focus();
              editorRef.current.selection.select(editorRef.current.getBody(), true);
            }, 1);
          }
        }}
        initialValue={content}
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        init={tinyInit}
        onBlur={handleChange}
      />
    </div>
  );
};
