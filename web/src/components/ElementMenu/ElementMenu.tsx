import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { colors } from '../../theme/palette';
import { drawerCollapsedWidth } from '../AppEditor/LiiingoDrawer';
import { ContentMenu } from './ContentMenu';
import { InsertButtonOption, InsertButtonOptionProps } from './InsertButtonOption';
import { InsertMediaOption, InsertMediaOptionProps } from './InsertMediaOption';
import { InsertTypographyOption, InsertTypographyOptionProps } from './InsertTypographyOption';
import { MediaContentMenu } from './MediaContentMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      backgroundColor: colors.grayLight20,
    },
    list: {
      paddingLeft: drawerCollapsedWidth,
    },
  })
);

export type MediaOption = Omit<InsertMediaOptionProps, 'index'>;
export type TypographyOption = Omit<InsertTypographyOptionProps, 'index'>;
export type ButtonOption = Omit<InsertButtonOptionProps, 'index'>;

export type ElementMenuProps = {
  mediaOptions?: MediaOption[];
  typographyOptions?: TypographyOption[];
  buttonOptions?: ButtonOption[];
};

export const ElementMenu = (props: ElementMenuProps) => {
  const { mediaOptions, typographyOptions, buttonOptions } = { ...props };
  const classes = useStyles();

  return (
    <List className={classes.list}>
      <ListItem className={classes.title}>
        <Typography>Add Elements</Typography>
      </ListItem>
      <MediaContentMenu name="Media">
        {mediaOptions.map((mediaOption, index) => {
          return (
            <InsertMediaOption
              key={index}
              contentType={mediaOption.contentType}
              index={index}
              icon={mediaOption.icon}
              hoverText={mediaOption?.hoverText}
            />
          );
        })}
      </MediaContentMenu>
      <ContentMenu name="Buttons">
        {buttonOptions.map((buttonOption, index) => {
          return (
            <InsertButtonOption
              key={index}
              contentType={buttonOption.contentType}
              index={index}
              buttonText={buttonOption.buttonText}
              hoverText={buttonOption?.hoverText}
            />
          );
        })}
      </ContentMenu>
      <ContentMenu name="Typography">
        {typographyOptions.map((typographyOption, index) => {
          return (
            <InsertTypographyOption
              key={index}
              index={index}
              displayName={typographyOption.displayName}
              desc={typographyOption.desc}
              displayVariant={typographyOption.displayVariant}
              tag={typographyOption.tag}
            />
          );
        })}
      </ContentMenu>
    </List>
  );
};
