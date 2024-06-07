const { DefinePlugin } = require('webpack');
const path = require('path');
const packageJson = require('./package.json');

module.exports = function override(config, env) {
  // Add REACT_APP_VERSION to environment variables
  config.plugins = (config.plugins || []).concat([
    new DefinePlugin({
      'process.env.REACT_APP_VERSION': JSON.stringify(packageJson.version),
    }),
  ]);

  // Override Webpack Dev Server options to handle deprecations
  if (config.devServer) {
    config.devServer.setupMiddlewares = (middlewares, devServer) => {
      if (typeof config.devServer.onBeforeSetupMiddleware === 'function') {
        config.devServer.onBeforeSetupMiddleware(devServer);
      }
      if (typeof config.devServer.onAfterSetupMiddleware === 'function') {
        config.devServer.onAfterSetupMiddleware(devServer);
      }
      return middlewares;
    };
  }

  return config;
};
