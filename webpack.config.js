const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')
const CopyPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    app: './src/js/app.js'
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'js/[name].js',
    library: 'app',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkg.version)
    }),
    new webpack.BannerPlugin({
      banner: '@license ' + pkg.license +
      '\n' + pkg.name + ' ' + pkg.version +
      '\n ARV Klerix <klerix.com>' +
      '\n@author ' + pkg.author,
      entryOnly: true
    }),
    new CopyPlugin([
      { from: 'src/index.html', to: '.' },
      { from: 'src/images', to: 'img/' },
      { from: 'src/fonts', to: 'fonts/' }
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && (
          module.context.indexOf('node_modules') !== -1 ||
          module.context.indexOf('~') !== -1
        )
      }
    }),
    new ExtractTextPlugin('css/[name].css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  module: {
    loaders: [{
      test: /\.hbs$/,
      use: [{
        loader: 'handlebars-loader',
        query: {
          helperDirs: [
            path.resolve(__dirname, './src/js/helpers/handlebars')
          ]
        }
      }]
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        publicPath: '/fonts/',
        outputPath: 'fonts/'
      }
    }]
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    inline: true
  }
}
