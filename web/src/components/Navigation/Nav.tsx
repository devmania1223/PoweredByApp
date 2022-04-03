import React from 'react';
import { LeftNavProps } from './LeftNav';
import { AppBar } from './AppBar';
import { LIIINGO_HELP_URL } from '../../util/constants';

export const Nav = (props: LeftNavProps) => {
  const { isHidden } = props;
  if (isHidden) {
    return null;
  }
  return (
    <div>
      <AppBar
        isHidden={isHidden}
        appBarItems={[
          {
            route: 'engagement',
            displayName: 'Dashboard',
          },
          {
            route: LIIINGO_HELP_URL,
            displayName: 'Help',
          },
        ]}
      />
    </div>
  );
};
