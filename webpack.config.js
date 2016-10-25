module.exports = {
  entry: './src/index.js',
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
      '/**': 'http://localhost:3000',
    }
  },
}