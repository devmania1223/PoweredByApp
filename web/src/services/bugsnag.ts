import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import React from 'react';

const initialize = () => {
  Bugsnag.start({
    apiKey: process.env.REACT_APP_BUGSNAG_API_KEY,
    plugins: [new BugsnagPluginReact()],
    releaseStage: process.env.REACT_APP_BUGSNAG_RELEASE_STAGE,
    enabledReleaseStages: ['development', 'production'], // Prevent the 'local' environment from reporting to BugSnag
  });
};

initialize();

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

export { ErrorBoundary };
