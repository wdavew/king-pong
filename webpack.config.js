module.exports = {
  entry: './src/app.js',
  output: {
    path: 'build',
    filename: 'webpack-bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  },
  devServer: {
    proxy: {
      '/data': 'http://localhost:3000',
    }
  },
}