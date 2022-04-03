import { Popover, PopoverProps, Typography } from '@material-ui/core';
import React, { MouseEvent, useState } from 'react';

export type UsePopoverOptions = {
  anchorElement?: HTMLElement; // Optional: When the Popover opens, it can be attached to an element other than the element that fires the event (it can open elsewhere on the page)
  isInitiallyOpen?: boolean;
  closeOnClickaway?: boolean;
};
const defaultOptions = {
  isInitiallyOpen: false,
  closeOnClickaway: true,
};

/**
 *
 * @param name The HTML element ID that will be used to reference this particular popover. Must be unique and conform to HTML element ID naming rules.
 * @param options
 * @returns
 */
export const usePopover = (name: string, options: UsePopoverOptions) => {
  const { anchorElement, isInitiallyOpen, closeOnClickaway } = { ...defaultOptions, ...options };

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(isInitiallyOpen);
  const [popoverAnchorElement, setPopoverAnchorElement] = useState<HTMLElement | null>(null);

  const togglePopover = (e: MouseEvent<HTMLElement>) => {
    isPopoverOpen ? closePopover() : openPopover(e);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
    setPopoverAnchorElement(null);
  };

  const openPopover = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setPopoverAnchorElement(anchorElement ?? e.currentTarget);
    setIsPopoverOpen(true);
  };

  /**
   * These props are meant to be spread onto a MUI <Popover> component
   *
   *   <Popover {...popoverProps}><Typography>This is a Popover</Typography></Popover>
   */
  const popoverProps: PopoverProps = {
    id: name,
    open: isPopoverOpen,
    anchorEl: popoverAnchorElement,
    onClose: closePopover,
    ...(!closeOnClickaway && {
      disableBackdropClick: true,
      style: { zIndex: -1 },
    }),
  };

  const StyledPopover = (props: Partial<PopoverProps>) => {
    const { children, ...rest } = props;
    const composedProps = { ...popoverProps, ...rest };
    return (
      <Popover {...composedProps}>
        <Typography variant="body2" color="inherit">
          {children}
        </Typography>
      </Popover>
    );
  };

  return { openPopover, togglePopover, popoverProps, PopoverComponent: StyledPopover };
};
