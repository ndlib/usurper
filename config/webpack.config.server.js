'use strict'
var webpack = require('webpack')
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
var WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
var getClientEnvironment = require('./env')
var paths = require('./paths')
var nodeExternals = require('webpack-node-externals')

var publicPath = '/'
var publicUrl = ''
var env = getClientEnvironment(publicUrl)

module.exports = {

  // devtool: 'cheap-module-source-map',

  entry: [
    // We ship a few polyfills by default:
    require.resolve('./polyfills'),
    // Finally, this is your app's code:
    paths.serverIndexJs
  ],
  externals: [nodeExternals()],
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.serverBuild,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'server.js',
    // This is the URL that app is served from. We use "/" in development.
    publicPath: publicPath
  },
  target: 'node',
  resolve: {
    fallback: paths.nodePaths,
    extensions: ['.js', '.json', '.jsx', ''],
    alias: {
      'react-native': 'react-native-web'
    }
  },

  module: {
    // First, run the linter.
    // It's important to do this before Babel processes the JS.
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
        include: paths.serverSrc
      }
    ],
    loaders: [
      // ** ADDING/UPDATING LOADERS **
      // The "url" loader handles all assets unless explicitly excluded.
      // The `exclude` list *must* be updated with every change to loader extensions.
      // When adding a new loader, you must add its `test`
      // as a new entry in the `exclude` list for "url" loader.

      // "url" loader embeds assets smaller than specified size as data URLs to avoid requests.
      // Otherwise, it acts like the "file" loader.
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)(\?.*)?$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/
        ],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      // Process JS with Babel.
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: 'babel_cache',
          presets: ['es2015', 'stage-2', 'react']
        }
      },

      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin(env.stringified),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules)
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    __filename: true,
    __dirname: true
  }
}
