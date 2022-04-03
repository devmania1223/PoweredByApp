import { makeStyles, Theme } from '@material-ui/core';
import createStyles from '@material-ui/styles/createStyles';
import React, { useRef } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      width: '100%',
      objectFit: 'contain',
    },
  })
);

export type EditImageProps = {
  alt?: string;
  src?: string;
};

export const EditImage = (props: EditImageProps) => {
  const { alt, src } = { ...props };
  const classes = useStyles();
  const ref = useRef(null);

  return (
    <img
      className={classes.image}
      alt={alt}
      src={src}
      ref={ref}
      tabIndex={-1}
      onClick={() => {
        ref?.current?.focus();
      }}
    />
  );
};
