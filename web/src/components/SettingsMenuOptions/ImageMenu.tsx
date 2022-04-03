import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LANGUAGE_MAP } from '../../util/constants';
import { ImageOption } from './ImageOption';
import { Option } from './Option';
import { OptionGroup } from './OptionGroup';
import Crop from '@material-ui/icons/Crop';
import Replace from '@material-ui/icons/FindReplace';
import CropModel from '../AppEditor/CropModel';
import { _cropImageUrl, setCropImageUrl } from '../../store/slices/editorSlice';
import { bindActionCreators } from 'redux';

export type ImageMenuProps = {
  setImagePreview: (file: File) => void;
  imageUrl?: string;
  name?: string;
  languageCode?: string;
  type?: string;
  size?: string;
  toCropData: (imageUrl: string, fileName: string) => void;
};

export const ImageMenu = (props: ImageMenuProps) => {
  const { setImagePreview, imageUrl, name, languageCode, type, size, toCropData } = { ...props };
  const [openDrawer, setOpenDrawer] = useState(false);
  const [image, setImage] = useState(imageUrl);
  const cropImageUrl = useSelector(_cropImageUrl);
  const dispatch = useDispatch();
  const onSetCropImageUrl = bindActionCreators(setCropImageUrl, dispatch);

  useEffect(() => {
    if (imageUrl === undefined || imageUrl === null) {
      setImage(null);
      onSetCropImageUrl(null);
    } else if (imageUrl) setImage(imageUrl);
  }, [imageUrl, image, setImage, onSetCropImageUrl]);

  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
      onSetCropImageUrl(reader.result as any);
      setOpenDrawer(true);
    };
    reader.readAsDataURL(files[0]);
  };

  const setCropImage = (url, fileName) => {
    toCropData(url, fileName);
  };

  return (
    <div>
      <OptionGroup title="Preview">
        <ImageOption imageUrl={imageUrl} setImagePreview={setImagePreview} />
      </OptionGroup>
      <CropModel open={openDrawer} setOpen={setOpenDrawer} imageUrl={cropImageUrl} sendCropData={setCropImage} />
      <OptionGroup title="Edit">
        <Option icon={Crop} label="Crop" clickable={true} onClick={() => setOpenDrawer(true)} />
        <label htmlFor="upload-file">
          <Option icon={Replace} label="Replace" clickable={true} />
        </label>
        <input type="file" onChange={onChange} id="upload-file" style={{ display: 'none' }} />
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
