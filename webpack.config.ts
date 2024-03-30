const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  // ... other webpack config options...
  plugins: [
		new NodePolyfillPlugin()
	],
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "crypto": require.resolve("crypto-browserify")
    }
  }
};

