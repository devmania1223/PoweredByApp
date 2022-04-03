import { useCallback, useState } from 'react';
import { LeftNavMenuItem, LeftNavProps } from '../components/Navigation/LeftNav';
import { Nav } from '../components/Navigation/Nav';

export type useNavProps = {
  menuItems: LeftNavMenuItem[];
  bottomMenuItems: LeftNavMenuItem[];
  isOpenInitially?: boolean;
  isHidden?: boolean;
};

const defaultProps = {
  isOpenInitially: false,
  isHidden: false,
};
/**
 * When the LeftNav is "open" and "not hidden": it's visible as a drawer.
 * When the LeftNav is "not open" and "not hidden": it's collapsed and a button
 *  is visible that can be clicked to expand the drawer.
 * When the LeftNav is "hidden": the drawer is not visible and there is no button to open it.
 *  From a user perspective, this is equivalent to rendering null for the LeftNav component.
 */
export const useNav = (props: useNavProps) => {
  const { menuItems, bottomMenuItems, isOpenInitially, isHidden: leftNavIsHidden } = { ...defaultProps, ...props };
  const [leftNavIsOpen, setLeftNavIsOpen] = useState(isOpenInitially);

  const toggleIsOpen = useCallback(() => {
    setLeftNavIsOpen(!leftNavIsOpen);
  }, [leftNavIsOpen, setLeftNavIsOpen]);

  const leftNavProps: LeftNavProps = {
    isOpen: leftNavIsOpen,
    onClose: () => setLeftNavIsOpen(false),
    toggleIsOpen,
    isHidden: leftNavIsHidden,
    menuItems: menuItems,
    bottomMenuItems: bottomMenuItems,
  };

  return {
    leftNavIsOpen,
    setLeftNavIsOpen,
    toggleIsOpen,
    leftNavIsHidden,
    leftNavProps,
    Nav: leftNavIsHidden ? () => null : Nav,
  };
};
