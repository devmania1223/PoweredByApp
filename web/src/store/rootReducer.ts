import { combineReducers } from '@reduxjs/toolkit';
import editorReducer from './slices/editorSlice';
import locationReducer from './slices/locationSlice';
import sectionReducer from './slices/sectionSlice';
import topicReducer from './slices/topicSlice';
import contentReducer from './slices/contentSlice';
import analyticsReducer from './slices/analyticsSlice';
// bring these in as needed
// import authReducer
// import organizationReducer
// import parentTopicReducer
// import userReducer
import { connectRouter } from 'connected-react-router';

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    editor: editorReducer,
    analytics: analyticsReducer,
    location: locationReducer,
    section: sectionReducer,
    topic: topicReducer,
    content: contentReducer,
    // app: appReducer,
    // auth: authReducer,
    // organization: organizationReducer,
    // user: userReducer,
    // parentTopics: parentTopicReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
