import { GTMProvider } from '@elgorditosalsero/react-gtm-hook';
import React, { ReactNode } from 'react';

export type GoogleTagManagerProviderProps = {
  children: ReactNode;
  gtmId: string;
  gtmAuth: string;
  gtmPreview: string;
};
/**
 * This Provider should be the first (outer-most) Provider wrapping the rest of the React App.
 * It places the Google Tag Manager tracking code onto the page during the init() call, which
 * should happen as early as possible.
 */
export const GoogleTagManagerProvider = ({ children, gtmId, gtmAuth, gtmPreview }: GoogleTagManagerProviderProps) => {
  const gtmParams = {
    id: gtmId,
    environment: {
      gtm_auth: gtmAuth,
      gtm_preview: gtmPreview,
    },
  };

  return <GTMProvider state={gtmParams}>{children}</GTMProvider>;
};
