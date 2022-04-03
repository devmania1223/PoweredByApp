/**
 * Just in case this isn't immediately obvious from reading the self-documenting regex pattern below:
 * This matches *most* valid URLs and enforces that they begin with either "http" or "https".
 *
 * Matches:
 *  - http://google.com
 *  - https://google.com
 *  - https://app.google.com/my/path
 *  - https://google.com/me?referrer=jaf894f
 *
 * Doesn't Match:
 *  - google.com
 *  - google://https://hi/there
 *  - http:/google.com
 *  - http://google
 *  - htp::/google.com
 */
export const fullyQualifiedUrlPattern =
  /(^https?:\/\/)(?=.{4,253}$)(((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]\.)+[a-zA-Z]{2,63})(.*)/;
export const partialUrlPattern = /(?=.{4,253}$)(((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]\.)+[a-zA-Z]{2,63})(.*)/;

export const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const phoneNumberPattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
/**
 *
 */
export const hyperlinkOrMailto = /(^https?:\/\/)|(^mailto:)/;
