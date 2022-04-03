import { UIEventHandler } from 'react';

export const withoutDefault: (wrappedEventHandler: UIEventHandler) => UIEventHandler = (wrappedEventHandler) => {
  return (event) => {
    event.preventDefault();
    wrappedEventHandler(event);
  };
};
