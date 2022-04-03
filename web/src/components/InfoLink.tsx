import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link as InternalLink, LinkProps } from 'react-router-dom';
import { Link as ExternalLink } from '@material-ui/core';
import { colors } from '../theme/palette';

const useStyles = makeStyles({
  linkText: {
    color: colors.tealAccent,
    fontWeight: 'bold',
  },
  anchorTag: {
    textDecoration: 'none',
  },
});

export type InfoLinkProps = Pick<LinkProps, 'to'>;
export const InfoLink: React.FC<InfoLinkProps> = ({ to, children }) => {
  const classes = useStyles();
  const isExternal = to.toString().match(/^(https?|mailto):\/\//);

  const linkContent = (
    <Typography variant="body2" className={classes.linkText} component="span">
      {children}
    </Typography>
  );

  if (isExternal) {
    return (
      <ExternalLink href={to.toString()} target="_blank" className={classes.anchorTag}>
        {linkContent}
      </ExternalLink>
    );
  } else {
    return (
      <InternalLink to={to} className={classes.anchorTag}>
        {linkContent}
      </InternalLink>
    );
  }
};
