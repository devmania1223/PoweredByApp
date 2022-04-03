/**
 * Calculate brightness value by RGB or HEX color.
 * https://gist.github.com/w3core/e3d9b5b6d69a3ba8671cc84714cca8a4
 *
 * @param color (String) The color value in RGB or HEX (for example: #000000 || #000 || rgb(0,0,0) || rgba(0,0,0,0))
 * @returns (Number) The brightness value (dark) 0 ... 255 (light)
 */
export const brightnessByColor = (color: string) => {
  let r: number;
  let b: number;
  let g: number;

  const isHEX = color.indexOf('#') === 0;
  const isRGB = color.indexOf('rgb') === 0;

  if (isHEX) {
    const hasFullSpec = color.length === 7;
    const m = color.substr(1).match(hasFullSpec ? /(\S{2})/g : /(\S{1})/g);
    if (m) r = parseInt(m[0] + (hasFullSpec ? '' : m[0]), 16);
    g = parseInt(m[1] + (hasFullSpec ? '' : m[1]), 16);
    b = parseInt(m[2] + (hasFullSpec ? '' : m[2]), 16);
  }
  if (isRGB) {
    const m = color.match(/(\d+){3}/g);
    if (m) r = parseInt(m[0], 10);
    g = parseInt(m[1], 10);
    b = parseInt(m[2], 10);
  }
  if (typeof r != 'undefined') return (r * 299 + g * 587 + b * 114) / 1000;
};

/**
 * This will return true if the color is below the lightness threshold (dark colors are valid, light colors are invalid)
 * If no color is passed in, this function will return undefined.
 *
 * @param color The color value as either a hex string (including the #, i.e. "#00aaff") or an RGB string (i.e. "rgb(0, 128, 255)")
 */
export const colorHasValidLightness = (color?: string) => {
  if (!color) {
    return undefined;
  }
  // Lightness is measured on a scale between 0 - 255 (inclusive)
  // This value should match the server-side validation.
  const maxLightness = 170;
  return brightnessByColor(color) <= maxLightness;
};
