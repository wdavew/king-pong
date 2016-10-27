module.exports = {
  entry: './src/index.js',
  output: {
    path: 'build',
    filename: 'webpack-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  devServer: {
    proxy: {
      '/data': 'http://192.168.0.105:3000',
    }
  },
}