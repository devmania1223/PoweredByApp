import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { colors } from '../../../theme/palette';
import { typography } from '../../../theme/typography';

export type LiiingoPreviewQrCodeSvgProps = {
  primaryColor?: string;
  secondaryColor?: string;
  customQrLogoUrl?: string;
};
const defaultProps = {
  primaryColor: '#000000',
  secondaryColor: '#000000',
};
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  customQrLogoImage: {
    width: '100%',
    objectFit: 'contain',
    backgroundColor: colors.pureWhite,
  },
  customQrLogoImageWrapper: {
    display: 'flex',
    width: '25%',
    left: '65%',
    marginLeft: '-25%',
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: colors.pureWhite,
  },
  qrCode: {
    width: '100%',
    height: '100%',
  },
  qrImageWithLabel: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  qrImageLabel: {
    fontSize: 45,
    fontFamily: typography?.h3?.fontFamily,
    fill: colors.mediumGray,
  },
});
export const LiiingoPreviewQrCodeSvg = (props: LiiingoPreviewQrCodeSvgProps) => {
  const { primaryColor, secondaryColor, customQrLogoUrl, ...restProps } = {
    ...defaultProps,
    ...props,
  };
  const classes = useStyles();
  const showLiiingoLogo = !customQrLogoUrl;

  return (
    <div className={classes.root}>
      {customQrLogoUrl && (
        <div className={classes.customQrLogoImageWrapper}>
          <img
            src={customQrLogoUrl}
            alt="A sample QR code with your custom color scheme applied"
            className={classes.customQrLogoImage}
          />
        </div>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox={`0 0 615 615`}
        className={classes.qrCode}
        {...restProps}
      >
        <path fill="#FFF" d="M0 0h615v615H0z" />
        <g transform="translate(30 30)">
          <defs>
            <linearGradient gradientTransform="rotate(90)" id="LiiingoDemoQrCode_svg__a">
              <stop offset="5%" stopColor={primaryColor} />
              <stop offset="95%" stopColor={secondaryColor} />
            </linearGradient>
            <mask id="LiiingoDemoQrCode_svg__b">
              <circle cx={50} cy={50} r={30} transform="translate(135) scale(.15)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="translate(195) scale(.15)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="translate(240) scale(.15)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="translate(330) scale(.15)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="translate(375) scale(.15)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="translate(390) scale(.15)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="translate(420) scale(.15)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 180 15)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 195 15)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 225 15)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 330 15)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 345 15)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 420 15)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 135 30)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 165 30)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 195 30)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 210 30)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 225 30)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 240 30)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 330 30)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 360 30)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 375 30)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 390 30)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 135 45)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 150 45)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 180 45)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 210 45)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 240 45)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 255 45)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 285 45)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 300 45)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 315 45)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 360 45)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 375 45)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 405 45)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 120 60)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 165 60)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 180 60)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 240 60)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 255 60)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 270 60)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 285 60)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 360 60)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 390 60)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 180 75)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 195 75)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 210 75)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 225 75)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 315 75)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 345 75)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 360 75)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 120 90)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 150 90)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 180 90)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 210 90)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 240 90)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 270 90)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 300 90)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 330 90)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 360 90)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 390 90)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 420 90)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 120 105)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 135 105)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 165 105)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 180 105)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 210 105)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 225 105)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 240 105)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 255 105)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 315 105)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 360 105)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 390 105)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 405 105)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 420 105)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 30 120)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 45 120)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 90 120)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 105 120)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 120 120)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 135 120)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 195 120)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 225 120)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 330 120)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 345 120)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 375 120)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 405 120)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 420 120)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 435 120)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 450 120)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 480 120)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 45 135)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 75 135)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 105 135)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 195 135)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 225 135)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 270 135)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 315 135)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 375 135)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 420 135)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 435 135)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 465 135)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 495 135)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 525 135)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 0 150)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 60 150)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 90 150)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 120 150)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 135 150)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 150 150)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 180 150)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 195 150)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 300 150)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 375 150)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 435 150)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 480 150)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 15 165)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 45 165)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 120 165)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 150 165)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 165 165)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 195 165)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 240 165)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 255 165)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 285 165)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 300 165)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 345 165)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 360 165)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 375 165)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 390 165)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 15 180)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 30 180)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 45 180)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 60 180)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 90 180)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 150 180)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 270 180)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 330 180)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 345 180)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 360 180)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 375 180)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 390 180)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 405 180)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 435 180)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 450 180)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 480 180)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 510 180)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 540 180)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 15 195)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 105 195)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 135 195)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 180 195)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 255 195)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 270 195)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 300 195)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 315 195)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 330 195)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 390 195)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 405 195)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 420 195)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 450 195)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 465 195)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 480 195)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 510 195)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 525 195)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 540 195)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 0 210)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 15 210)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 75 210)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 90 210)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 120 210)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 135 210)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 180 210)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 315 210)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 360 210)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 420 210)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 435 210)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 450 210)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 465 210)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 480 210)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 510 210)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 525 210)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 105 225)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 120 225)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 165 225)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 180 225)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 195 225)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 255 225)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 300 225)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 330 225)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 345 225)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 390 225)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 420 225)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 435 225)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 465 225)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 480 225)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 525 225)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 540 225)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 15 240)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 30 240)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 60 240)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 75 240)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 90 240)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 105 240)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 120 240)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 180 240)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 240 240)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 255 240)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 270 240)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 300 240)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 330 240)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 345 240)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 375 240)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 405 240)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 435 240)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 495 240)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 510 240)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 525 240)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 540 240)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 30 255)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 45 255)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 60 255)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 240 255)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 255 255)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 315 255)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 330 255)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 390 255)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 405 255)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 450 255)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 540 255)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 0 270)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 30 270)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 75 270)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 90 270)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 120 270)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 135 270)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 150 270)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 165 270)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 195 270)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 210 270)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 255 270)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 285 270)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 345 270)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 375 270)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 390 270)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 405 270)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 435 270)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 465 270)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 480 270)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 525 270)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 540 270)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 0 285)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 30 285)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 60 285)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 75 285)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 180 285)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 240 285)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 270 285)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 285 285)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 315 285)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 330 285)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 360 285)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 420 285)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 435 285)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 465 285)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 480 285)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 495 285)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 30 300)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 45 300)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 75 300)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 195 300)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 270 300)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 285 300)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 300 300)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 315 300)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 330 300)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 345 300)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 390 300)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 420 300)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 435 300)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 480 300)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 540 300)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 0 315)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 45 315)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 60 315)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 75 315)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 105 315)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 120 315)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 150 315)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 195 315)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 210 315)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 225 315)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 240 315)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 270 315)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 345 315)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 360 315)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 375 315)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 465 315)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 495 315)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 525 315)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 540 315)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 60 330)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 75 330)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 90 330)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 135 330)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 150 330)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 165 330)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 180 330)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 225 330)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 240 330)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 270 330)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 300 330)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 315 330)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 330 330)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 375 330)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 480 330)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 0 345)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 30 345)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 45 345)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 75 345)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 105 345)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 135 345)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 165 345)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 300 345)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 315 345)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 330 345)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 360 345)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 405 345)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 420 345)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 495 345)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 510 345)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 540 345)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 0 360)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 30 360)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 45 360)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 90 360)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 120 360)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 135 360)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 165 360)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 180 360)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 210 360)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 225 360)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 255 360)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 285 360)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 330 360)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 360 360)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 390 360)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 435 360)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 450 360)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 465 360)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 480 360)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 510 360)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 30 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 45 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 75 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 105 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 120 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 150 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 165 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 180 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 210 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 225 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 270 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 300 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 345 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 360 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 375 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 390 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 405 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 420 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 435 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 450 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 480 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 510 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 525 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 540 375)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 15 390)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 30 390)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 75 390)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 90 390)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 120 390)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 135 390)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 150 390)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 165 390)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 210 390)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 225 390)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 255 390)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 300 390)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 315 390)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 345 390)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 375 390)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 390 390)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 480 390)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 510 390)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 525 390)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 0 405)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 105 405)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 120 405)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 135 405)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 495 405)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 525 405)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 540 405)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 180 420)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 195 420)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 210 420)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 270 420)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 285 420)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 300 420)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 330 420)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 375 420)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 420 420)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 435 420)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 465 420)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 480 420)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 495 420)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 510 420)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 540 420)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 120 435)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 210 435)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 225 435)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 240 435)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 255 435)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 270 435)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 285 435)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 300 435)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 315 435)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 330 435)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 345 435)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 360 435)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 375 435)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 420 435)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 480 435)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 495 435)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 510 435)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 540 435)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 120 450)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 165 450)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 180 450)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 195 450)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 225 450)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 255 450)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 270 450)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 315 450)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 390 450)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 420 450)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 450 450)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 480 450)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 495 450)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 525 450)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 540 450)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 180 465)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 210 465)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 255 465)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 300 465)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 330 465)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 390 465)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 405 465)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 420 465)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 480 465)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 495 465)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 135 480)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 150 480)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 210 480)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 225 480)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 240 480)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 255 480)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 360 480)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 420 480)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 435 480)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 450 480)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 465 480)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 480 480)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 495 480)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 540 480)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 120 495)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 150 495)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 210 495)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 225 495)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 270 495)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 285 495)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 300 495)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 315 495)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 360 495)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 450 495)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 480 495)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 510 495)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 120 510)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 150 510)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 180 510)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 195 510)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 270 510)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 330 510)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 345 510)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 360 510)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 480 510)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 510 510)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 525 510)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 150 525)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 165 525)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 180 525)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 210 525)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 240 525)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 255 525)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 285 525)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 375 525)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 390 525)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 405 525)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 435 525)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 450 525)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 465 525)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 495 525)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 510 525)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 135 540)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 165 540)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 195 540)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 225 540)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 255 540)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 300 540)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 315 540)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 360 540)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 390 540)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 495 540)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 510 540)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 525 540)" fill="#fff" />
              <circle cx={50} cy={50} r={30} transform="matrix(.15 0 0 .15 540 540)" fill="#fff" />
            </mask>
          </defs>
          <path fill="url(#LiiingoDemoQrCode_svg__a)" mask="url(#LiiingoDemoQrCode_svg__b)" d="M0 0h555v555H0z" />
          <g fill={primaryColor}>
            <path
              fill="none"
              d="M15.771 69.148l-.017-53.398h53.809c10.855 0 19.687 9.015 19.687 20.097V89.25H35.469c-10.861 0-19.698-9.015-19.698-20.102z"
            />
            <path d="M69.563 105H35.468C15.918 105 .021 88.914.021 69.153L0 0h69.563C89.102 0 105 16.086 105 35.847V105H69.562zM89.25 35.847c0-11.082-8.832-20.097-19.688-20.097H15.755l.017 53.398c0 11.087 8.837 20.102 19.698 20.102H89.25V35.847z" />
          </g>
          <g fill={primaryColor}>
            <path
              fill="none"
              d="M465.771 35.852l-.017 53.398h53.809c10.855 0 19.687-9.015 19.687-20.097V15.75h-53.781c-10.861 0-19.698 9.015-19.698 20.102z"
            />
            <path d="M519.563 0h-34.094c-19.551 0-35.448 16.086-35.448 35.847L450 105h69.563C539.102 105 555 88.914 555 69.153V0h-35.438zm19.687 69.153c0 11.082-8.832 20.097-19.688 20.097h-53.808l.017-53.398c0-11.087 8.837-20.102 19.698-20.102h53.781v53.403z" />
          </g>
          <g fill={primaryColor}>
            <path
              fill="none"
              d="M15.771 485.852l-.017 53.398h53.809c10.855 0 19.687-9.015 19.687-20.097V465.75H35.469c-10.861 0-19.698 9.015-19.698 20.102z"
            />
            <path d="M69.563 450H35.468C15.918 450 .021 466.086.021 485.847L0 555h69.563C89.102 555 105 538.914 105 519.153V450H69.562zm19.687 69.153c0 11.082-8.832 20.097-19.688 20.097H15.755l.017-53.398c0-11.087 8.837-20.102 19.698-20.102H89.25v53.403z" />
          </g>
          <g fill={secondaryColor}>
            <path d="M62.735 75.01H42.254c-1.054 0-2.076-.134-3.047-.394a12.162 12.162 0 01-5.589-3.256 12.485 12.485 0 01-3.583-8.784l-.013-32.567h32.713c6.737 0 12.212 5.58 12.212 12.434v20.132l.075 12.428s-8.074.006-12.287.006z" />
          </g>
          <g fill={secondaryColor}>
            <path d="M512.735 29.99h-20.482c-1.053 0-2.075.134-3.046.394a12.162 12.162 0 00-5.589 3.256 12.485 12.485 0 00-3.583 8.784l-.013 32.567h32.713c6.737 0 12.212-5.58 12.212-12.434V42.425l.075-12.428s-8.074-.006-12.287-.006z" />
          </g>
          <g fill={secondaryColor}>
            <path d="M62.735 479.99H42.254c-1.054 0-2.076.134-3.047.394a12.162 12.162 0 00-5.589 3.256 12.485 12.485 0 00-3.583 8.784l-.013 32.567h32.713c6.737 0 12.212-5.58 12.212-12.434v-20.132l.075-12.428s-8.074-.006-12.287-.006z" />
          </g>
          {showLiiingoLogo && (
            <image
              transform="translate(195 195)"
              width={165}
              height={165}
              xlinkHref="data:image/png;base64,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"
            />
          )}
        </g>
      </svg>
    </div>
  );
};
