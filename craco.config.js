const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        path: require.resolve('path-browserify'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        process: require.resolve('@pmmmwh/react-refresh-webpack-plugin/lib/ReactRefreshEntry'),
      };

      // Add the ReactRefreshWebpackPlugin plugin
      webpackConfig.plugins.push(new ReactRefreshWebpackPlugin());

      return webpackConfig;
    },
  },
};