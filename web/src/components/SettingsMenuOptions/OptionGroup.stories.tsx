import Dashboard from '@material-ui/icons/Dashboard';
import React from 'react';
import { RightDrawer } from '../AppEditor/RightDrawer';
import { Option } from './Option';
import { OptionGroup, OptionGroupProps } from './OptionGroup';

export default {
  component: OptionGroup,
  title: 'Option Group',
  excludeStories: [],
  decorators: [],
};

const OptionsTemplate = (args: OptionGroupProps) => (
  <RightDrawer
    isExpanded={true}
    component={
      <OptionGroup {...args} title="Test">
        <Option label="Basic Label" />
        <Option label="Label" subtitle="Subtitle" />
        <Option label="Icon" icon={Dashboard} /> <Option label="Clickable" clickable={true} />
      </OptionGroup>
    }
  />
);
export const Options = OptionsTemplate.bind({});
Options.args = {
  title: 'Options',
};

/*
const ImageTemplate = (args: OptionGroupProps) => {
  const [imageUrl, setImageUrl] = useState(
    'https://poweredby-dev-public.s3.us-west-2.amazonaws.com/6092d84fb9e6a40212e4402e/Spotlight%20Image-en.png?hash=48229680-ba6d-11eb-a09c-4d860903b5e6'
  );
  return (
    <OptionGroup {...args}>
      <ImageOption setImagePreview={setImageUrl} imageUrl={imageUrl} />
    </OptionGroup>
  );
};
export const Image = ImageTemplate.bind({});
Image.args = {
  title: 'Image',
};
*/
