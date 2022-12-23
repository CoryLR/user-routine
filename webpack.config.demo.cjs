const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './demo/script.js',
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.css$/i, // filename match
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './demo/index.html'
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'docs/'),
    filename: 'main.js',
  },
};