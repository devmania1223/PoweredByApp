import React, { FunctionComponent } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const useStyles = (styles: CSSProperties) =>
  makeStyles({
    FlatButton: {
      // '&:hover': {
      //   boxShadow: `2px 2px ${colors.lime}`,
      // },
      ...styles,
    },
  });

export type FlatButtonProps = {
  styles?: CSSProperties;
} & ButtonProps;
export const FlatButton: FunctionComponent<FlatButtonProps> = (props: FlatButtonProps) => {
  const classes = useStyles({ ...props.styles })();

  // Remove the 'styles' and 'className' objects from props so that we can merge them
  // with the FlatButton styling and then spread the remaining props onto the underlying Button
  const { styles: inputStyles, className: inputClassName, ...propsWithoutStyles } = props;

  return <Button className={`${classes.FlatButton} ${inputClassName}`} disableElevation {...propsWithoutStyles} />;
};
