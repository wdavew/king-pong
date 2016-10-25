module.exports = {
  entry: './src/app.js',
  output: {
    path: 'build',
    filename: 'webpack-bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  devServer: {
    proxy: {
      '/api/**': 'http://localhost:3000',
    }
  },
}