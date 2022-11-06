const path = require('path');

module.exports = {
  mode: 'production',
  entry: './lib/spa-check.ts',
  module: {
    rules: [
      {
        use: {
          loader: 'ts-loader',
          options: {
            configFile: "tsconfig.json"
          }
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'spa-check.min.js',
    library: {
      type: 'commonjs-static',
    },
  },
};