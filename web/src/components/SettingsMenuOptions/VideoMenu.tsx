import React from 'react';
import { LANGUAGE_MAP } from '../../util/constants';
import { Option } from './Option';
import { OptionGroup } from './OptionGroup';
import { VideoOption } from './VideoOption';

export type VideoMenuProps = {
  setVideo: (file: File) => void;
  videoUrl?: string;
  name?: string;
  languageCode?: string;
  type?: string;
  size?: string;
};

export const VideoMenu = (props: VideoMenuProps) => {
  const { setVideo, videoUrl, name, languageCode, type, size } = { ...props };

  return (
    <div>
      <OptionGroup title="Preview">
        <VideoOption videoUrl={videoUrl} setVideo={setVideo} />
      </OptionGroup>
      {(name || languageCode || type || size) && (
        <OptionGroup title="File Details">
          {name && <Option subtitle="Name" label={name.substring(name.indexOf('_') + 1)} />}
          {languageCode && <Option subtitle="Language" label={LANGUAGE_MAP[languageCode]} />}
          {type && <Option subtitle="Type" label={type} />}
          {size && <Option subtitle="Size" label={size} />}
        </OptionGroup>
      )}
    </div>
  );
};
