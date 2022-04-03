import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Image from '@material-ui/icons/Image';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import React from 'react';
import ReactJWPlayer from 'react-jw-player';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/hooks';
import { Content, Language } from '../../store/models';
import { toString } from '../../store/models/file/FileType';
import { removeNewLanguageIds, _newLanguageIds } from '../../store/slices/editorSlice';
import { EditImage } from './EditImage';
import { EditButton } from './EditButton';
import { EditText } from './EditText';
import { Focusable, FocusableProps } from './Focusable';
import { Placeholder } from './Placeholder';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topicImageImage: {
      width: '100%',
      objectFit: 'contain',
    },
    jwPlayerRoot: {
      display: 'flex',
      marginTop: 10,
      width: '100%',
      objectFit: 'contain',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    videoFieldContent: {
      objectFit: 'contain',
      maxWidth: 267,
      borderRadius: 16,
    },
  })
);

export interface EditorFieldProps {
  item: Content;
  activeLanguageCode: Language;
  isFocused: Boolean;
  newElement?: boolean;
}

export const EditorField = ({ item, activeLanguageCode, isFocused, newElement }: EditorFieldProps) => {
  const classes = useStyles();

  const languageContent = item?.languages.filter((content) => content.language === activeLanguageCode)[0];
  if (item.type === 'text') {
    //onChange={onChange}
    return <EditText {...languageContent} isFocused={isFocused} newElement={newElement} />;
    // } else if (item.liiingoContentType === 'image360') {
    //   const fileUrl = langContent.fileUrl;
    //   return (
    //     <div style={{ margin: '10px 0px' }}>
    //       <Image360 url={fileUrl} />
    //     </div>
    //   );
  } else if (item.type === 'image') {
    return languageContent?.fileUrl ? (
      <EditImage alt="" src={languageContent?.fileUrl ?? undefined} />
    ) : (
      <Placeholder icon={Image} />
    );
  } else if (item.type === 'webview') {
    return languageContent?.fileUrl ? (
      <img className={classes.topicImageImage} alt="" src={languageContent?.fileUrl} />
    ) : (
      <EditButton {...languageContent} isFocused={isFocused} />
    );
  } else if (item.type === 'video') {
    return languageContent?.fileUrl || languageContent?.content !== 'New video' ? (
      <div className={classes.jwPlayerRoot}>
        {languageContent.fileUrl.includes('blob') ? (
          <video controls className={classes.videoFieldContent} key={languageContent.fileUrl}>
            <source src={languageContent.fileUrl} /> :
          </video>
        ) : (
          <ReactJWPlayer
            className={classes.jwPlayerRoot}
            key={languageContent.content}
            playerId={`${item?._id}-jw-player`}
            playerScript="https://cdn.jwplayer.com/libraries/EI5i6PzB.js"
            file={`https://content.jwplatform.com/videos/${languageContent.content}.mp4`}
          />
        )}
      </div>
    ) : (
      <Placeholder icon={PlayCircleFilled} />
    );
  } else {
    return null;
  }
};

export const FocusableEditorField = (props: Omit<FocusableProps, 'label'> & EditorFieldProps) => {
  const { isFocused, newElement, onFocus, ...rest } = props;
  const {
    item: { type, _id },
    activeLanguageCode,
  } = rest;

  const newType = toString(type);
  const newLanguageIds = useSelector(_newLanguageIds);
  const dispatch = useAppDispatch();
  const isNewLanguageContent = newLanguageIds[activeLanguageCode]?.includes(_id);
  return (
    <Focusable
      onFocus={() => {
        dispatch(removeNewLanguageIds({ language: activeLanguageCode, ids: [_id] }));
        onFocus();
      }}
      isFocused={isFocused}
      label={newType}
      dim={isNewLanguageContent}
    >
      <EditorField {...rest} isFocused={isFocused} newElement={newElement} />
    </Focusable>
  );
};
