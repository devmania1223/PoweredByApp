const ID_TOKEN = 'id-token';
const ACCESS_TOKEN = 'access-token';
const IS_CLOSED = 'closed';
const IS_CLOSED_UPGRADED = 'closed-upgraded';
const IS_DISMISSED_DELETE = 'dismissed-delete';
const IS_DISMISSED_ML_DELETE = 'dismissed-ml-delete';
const ROUTE = 'route';
const CLOSED_BEST_PRACTICES = 'closed-best-practices';
const CLOSED_NOT_SCANNABLE = 'closed-not-scannable';
const CLOSED_QR_DIALOG = 'closed-qr-dialog';

const DISMISSED_PAGE_DELETE = 'dismissed_page_delete';
const DISMISSED_LANGUAGE_DELETE = 'dismissed_language_delete';
const DISMISSED_SECTION_DELETE = 'dismissed_section_delete';

const PAGE_HIDDEN_TIP = 'page_hidden_tip';
const PAGE_INCOGNITO_TIP = 'page_incognito_tip';
const NEW_LANGUAGE_CONTENT_TIP = 'new_language_content_tip';

const IMAGE_ACCEPTABLE_TYPE = '.jpg,.png';

const LIIINGO_HELP_URL = 'https://support.liiingo.com/helpdocs';

const LANGUAGE_MAP = {
  en: 'English',
  es: 'Spanish',
  'zh-Hans': 'Simplified Chinese',
  //ar: 'Arabic', //temporarily hiding Arabic, causes spacing issues
  fr: 'French',
  de: 'German',
  it: 'Italian',
  ru: 'Russian',
  pt: 'Portuguese',
  ja: 'Japanese',
  ko: 'Korean',
  no: 'Norwegian',
  sw: 'Swahili',
  vi: 'Vietnamese',
  el: 'Greek',
  tr: 'Turkish',
};

const TITLE_MAP = {
  one: 'One',
  essentials: 'Liiingo Essentials',
  myhomegroup: 'My Home Group',
  'sign-in': 'Sign In',
  'sign-out': 'Sign Out',
  'sign-up': 'Sign Up',
  organization: 'App Editor',
  billing: 'Account',
  engagement: 'My App',
  profile: '', // removing this from page title for now
  checkout: 'checkout',
  'payment-confirmation': 'Payment Confirmation',
  'payment-canceled': 'Payment Canceled',
  'forgot-password': 'Forgot Password',
};

export {
  ACCESS_TOKEN,
  ID_TOKEN,
  CLOSED_BEST_PRACTICES,
  CLOSED_NOT_SCANNABLE,
  CLOSED_QR_DIALOG,
  NEW_LANGUAGE_CONTENT_TIP,
  IS_CLOSED,
  IS_CLOSED_UPGRADED,
  IS_DISMISSED_DELETE,
  IS_DISMISSED_ML_DELETE,
  LANGUAGE_MAP,
  ROUTE,
  TITLE_MAP,
  DISMISSED_PAGE_DELETE,
  DISMISSED_LANGUAGE_DELETE,
  DISMISSED_SECTION_DELETE,
  PAGE_HIDDEN_TIP,
  PAGE_INCOGNITO_TIP,
  IMAGE_ACCEPTABLE_TYPE,
  LIIINGO_HELP_URL,
};
