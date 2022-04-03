import { useLocation } from 'react-router-dom';

/**
 * Extract the query string parameters from the URL using the browser's built-in URLSearchParams API
 * This hook can only be used in components that are wrapped with a <BrowserRouter /> (react-router)
 */
export const useQueryStringParams = () => {
  return new URLSearchParams(useLocation().search);
};
