import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ImageIcon from '@material-ui/icons/Image';
import React from 'react';
import { colors } from '../theme/palette';

export type TemplatePreviewProps = {
  company: string;
  name: string;
  previewUrl: string;
};
const defaultProps = {};

const useStyles = makeStyles<Theme, TemplatePreviewProps>({
  header: (props) => ({
    height: '100%',
    width: '100%',
    backgroundColor: colors.grayMedium,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    backgroundImage: `url("${props.previewUrl}")`,
    boxSizing: 'border-box',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }),
  headerText: {
    display: 'flex',
    color: 'white',
  },
  previewBox: {
    height: '100%',
    width: '100%',
    display: 'flex',
  },
});

export const TemplatePreview = (props: TemplatePreviewProps) => {
  const { company, name, previewUrl } = { ...defaultProps, ...props };
  const classes = useStyles(props);

  return (
    <Box className={classes.previewBox}>
      <Preview companyName={company} appName={name} topicBackgroundImageUrl={previewUrl} classes={classes} />
    </Box>
  );
};

const Preview = ({ companyName, appName, topicBackgroundImageUrl, classes }) => {
  return topicBackgroundImageUrl ? (
    <Box className={classes.header}>
      <Typography variant="body2" className={classes.headerText}>
        {companyName}
      </Typography>
      <Typography variant="caption" className={classes.headerText}>
        {appName}
      </Typography>
    </Box>
  ) : (
    <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
      <ImageIcon fontSize="large" />
    </Box>
  );
};
