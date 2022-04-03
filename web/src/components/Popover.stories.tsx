import { Button, Popover, Typography } from '@material-ui/core';
import React from 'react';
import { usePopover } from '../hooks/usePopover';

export default {
  component: Popover,
  title: 'Popover',
  excludeStories: [],
  argTypes: {},
};

export const ThemeOnly = () => <Popover open={true}>This text isn't wrapped in any Typography</Popover>;

export const DefaultPopoverFromHook = () => {
  const { openPopover, PopoverComponent: MyPopover } = usePopover('my-popover', { isInitiallyOpen: true });

  return (
    <div>
      <MyPopover>{wholeFoods}</MyPopover>
      <Button variant="contained" onClick={openPopover}>
        Open The Popover
      </Button>
    </div>
  );
};

export const CustomizedPopover = () => {
  const { openPopover, popoverProps } = usePopover('my-popover', { isInitiallyOpen: true });

  return (
    <div>
      <Popover {...popoverProps}>
        <Typography variant="h4" color="inherit">
          {ipsum}
        </Typography>
      </Popover>
      <Button variant="contained" onClick={openPopover}>
        Open The Popover
      </Button>
    </div>
  );
};

export const MultiplePopoversNotSharingAStore = () => {
  const { togglePopover: togglePopover1, popoverProps: popover1Props } = usePopover('my-popover-1', {
    isInitiallyOpen: true,
    closeOnClickaway: false,
  });
  const { togglePopover: togglePopover2, popoverProps: popover2Props } = usePopover('my-popover-2', {
    isInitiallyOpen: true,
    closeOnClickaway: false,
  });

  return (
    <div>
      <Popover {...popover1Props} anchorReference="anchorPosition" anchorPosition={{ top: 75, left: 0 }}>
        <Typography variant="body2" color="inherit">
          {ipsum}
        </Typography>
      </Popover>
      <Button variant="contained" onClick={togglePopover1}>
        Open Popover #1
      </Button>

      <Popover {...popover2Props} anchorReference="anchorPosition" anchorPosition={{ top: 175, left: 0 }}>
        <Typography variant="h4" color="inherit">
          {wholeFoods}
        </Typography>
      </Popover>
      <Button variant="contained" onClick={togglePopover2}>
        Open Popover #2
      </Button>
    </div>
  );
};

const ipsum =
  'Art party sriracha pok pok taxidermy narwhal direct trade, hella vinyl. Adaptogen godard fashion axe master cleanse pop-up...';

const wholeFoods =
  "This fool's on his iphone, talking to his friends Trying to pick up some cayenne pepper for his master cleanse";
