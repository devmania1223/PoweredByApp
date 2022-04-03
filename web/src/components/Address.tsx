import Box, { BoxProps } from '@material-ui/core/Box';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import React from 'react';
import { Organization_organization_address } from '../types/Organization_organization';

export type AddressProps = {
  address: Organization_organization_address;
  rootProps?: BoxProps;
  typographyProps?: TypographyProps;
};
export const Address = ({ address, rootProps = {}, typographyProps = {} }: AddressProps) => {
  const line1 = address.thoroughfare; // Street address
  const line2 = address.premise; // apt, suite, etc
  const line3 = `${address.locality ? `${address.locality}, ` : ''}${address.administrativeArea ?? ''} ${
    address.postalCode ?? ''
  }`;

  return (
    <Box {...rootProps}>
      <Typography {...typographyProps}>{line1}</Typography>
      {line2 && <Typography {...typographyProps}>{line2}</Typography>}
      <Typography {...typographyProps}>{line3}</Typography>
    </Box>
  );
};
