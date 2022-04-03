import Image from '@material-ui/icons/Image';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { FileType } from '../../store/models';
import { LeftDrawer } from '../AppEditor/LeftDrawer';
import { ButtonOption, ElementMenu, ElementMenuProps, MediaOption, TypographyOption } from './ElementMenu';
import { EnumTags } from './InsertTypographyOption';

const mockButtonOptions: ButtonOption[] = [
  {
    contentType: FileType['WebView'],
    buttonText: 'Button',
    hoverText: 'Button',
  },
];

const mockMediaOptions: MediaOption[] = [
  {
    contentType: FileType['Image'],
    icon: Image,
    hoverText: 'Image',
  },
  {
    contentType: FileType['Video'],
    icon: PlayCircleFilled,
    hoverText: 'Video',
  },
];

const mockTypographyOptions: TypographyOption[] = [
  {
    displayName: 'Heading 1',
    displayVariant: 'h4',
    desc: 'Open Sans, 24px',
    tag: EnumTags['h1'],
  },
  {
    displayName: 'Heading 2',
    displayVariant: 'h5',
    desc: 'Open Sans, 20px',
    tag: EnumTags['h2'],
  },
  {
    displayName: 'Heading 3',
    displayVariant: 'subtitle1',
    desc: 'Open Sans, 16px',
    tag: EnumTags['h3'],
  },
  {
    displayName: 'Heading 4',
    displayVariant: 'subtitle2',
    desc: 'Open Sans, 14px',
    tag: EnumTags['h4'],
  },
  {
    displayName: 'Paragraph 1',
    displayVariant: 'body1',
    desc: 'Roboto, 16px',
    tag: EnumTags['p'],
  },
];

export default {
  component: ElementMenu,
  title: 'Element Menu',
  excludeStories: [],
  decorators: [
    (Story: React.FunctionComponent) => (
      <DragDropContext>
        <Story />
      </DragDropContext>
    ),
  ],
};

const Template = (args: ElementMenuProps) => <LeftDrawer locationId={null} component={<ElementMenu {...args} />} />;
export const Default = Template.bind({});
Default.args = {
  mediaOptions: mockMediaOptions,
  typographyOptions: mockTypographyOptions,
  buttonOptions: mockButtonOptions,
};
