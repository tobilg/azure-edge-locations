const path = require('path');

// See: https://webpack.js.org/guides/author-libraries/

module.exports = {
  entry: './dist/src/index.js',
  mode: 'production',
  output: {
    globalObject: 'this',
    library: 'azureEdgeLocations',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'umd'),
    filename: 'azure-edge-locations.min.js'
  }
};
