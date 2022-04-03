import React from 'react';
import { DeleteDialog, DeleteDialogProps } from './DeleteDialog';
import { LinkDialog, LinkDialogProps, LinkOption } from './LinkDialog';

const mockOptions: LinkOption[] = [
  {
    value: 'web',
    label: 'Web Address',
  },
  {
    value: 'page',
    label: 'Page',
  },
  {
    value: 'file',
    label: 'File',
  },
  {
    value: 'phone',
    label: 'Phone',
  },
];

export default {
  component: LinkDialog,
  title: 'Setting Dialogs',
  excludeStories: [],
  decorators: [],
};

const LinkTemplate = (args: LinkDialogProps) => <LinkDialog {...args} />;
export const Link = LinkTemplate.bind({});
Link.args = {
  open: true,
  options: mockOptions,
  handleClose: () => {},
};

const DeleteTemplate = (args: DeleteDialogProps) => <DeleteDialog {...args} />;
export const Delete = DeleteTemplate.bind({});
Delete.args = {
  index: 0,
  open: true,
  handleClose: () => {},
  onDeleteContent: (index: number) => {},
};
