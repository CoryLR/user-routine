const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './demo/src/script.js',
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
      template: './demo/src/index.html'
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'demo/dist/'),
    filename: 'main.js',
  },
};