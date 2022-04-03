import { reduxBatch } from '@manaflair/redux-batch';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory({
  getUserConfirmation() {},
});

const store = configureStore({
  reducer: rootReducer(history),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware(history)), //integrate routing functionality into redux
  devTools: process.env.NODE_ENV !== 'production', //no dev-tools in prod
  enhancers: [reduxBatch], // combine multiple dispatches to prevent unnecessary re-renders, not using this yet but want to
});

// for debugging, in console you can
// window.store.dispatch({type:"editor/saveSuccessfully", payload:false})
// or
// window.store.getState()
window.store = store;

// hot reload reducers while developing, recommended approach
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

// Infer the `AppState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export default store;
