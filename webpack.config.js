// Modules
const autoprefixer = require('autoprefixer');
const friendly = require('eslint-friendly-formatter');
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

// Plugins
const Clean = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');

// Configs
const MODERNIZR_CONFIG = require('./modernizr.config.js');
const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app', 'App.js'),
  build: path.join(__dirname, 'public')
};
const JQUERY = { $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery' };

// Set the environment variable for .babelrc
process.env.BABEL_ENV = TARGET;

// Exports
const common = {
  entry: [
    'babel-polyfill',
    'bootstrap-loader',
    PATHS.app
  ],
  output: {
    filename: 'bundle.js',
    path: PATHS.build,
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [
      'node_modules'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.(woff2?|svg)$/,
        exclude: /images/,
        loader: 'url?limit=10000&name=fonts/[name].[ext]'
      },
      {
        test: /\.(ttf|eot)$/,
        loader: 'file?name=fonts/[name].[ext]'
      }
    ]
  },
  sasslint: {
    configFile: path.join(__dirname, '.scss-lint.yml')
  },
  eslint: {
    configFile: '.eslintrc',
    formatter: friendly
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] })
  ],
  sassLoader: {
    includePaths: [path.resolve(__dirname, './node_modules/bootstrap-sass/assets/stylesheets')],
    precision: 10
  }
};
if (TARGET.match(/(start|build)$/)) {
  module.exports = merge.smart(common, {
    plugins: [
      new ModernizrWebpackPlugin(MODERNIZR_CONFIG),
      new Clean(['public']),
      // http://stackoverflow.com/questions/30030031/passing-environment-dependent-variables-in-webpack
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
      new webpack.ProvidePlugin({ d3: 'd3', ...JQUERY}),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
      new CompressionPlugin({
        asset: '[file].gz',
        algorithm: 'gzip',
        regExp: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/i,
          exclude: /node_modules/,
          loaders: ['babel', 'eslint']
        },
        {
          test: /\.scss$/i,
          exclude: /node_modules/,
          loaders: ['style', 'css', 'postcss', 'resolve-url', 'sass', 'sasslint']
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          exclude: /node_modules/,
          loaders: [
            'url?limit=1&name=[hash].[ext]',
            'image-webpack?optimizationLevel=7&interlaced=false'
          ]
        }
      ]
    }
  });
}

if (TARGET.match(/dev$/)) {
  module.exports = merge.smart(common, {
    devtool: 'eval-source-map',
    entry: [
      'bootstrap-loader',
      PATHS.app,
      'webpack-hot-middleware/client?reload=true'
    ],
    plugins: [
      new ModernizrWebpackPlugin(MODERNIZR_CONFIG),
      new Clean(['public']),
      new webpack.ProvidePlugin(JQUERY),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/i,
          exclude: /node_modules/,
          loaders: ['babel?cacheDirectory', 'eslint']
        },
        {
          test: /\.scss$/i,
          exclude: /node_modules/,
          loaders: ['style', 'css?sourceMap', 'postcss', 'resolve-url', 'sass?sourceMap', 'sasslint']
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          exclude: /(node_modules|apple-touch.*\.png)$/i,
          loaders: ['url', 'image-webpack?bypassOnDebug']
        }
      ]
    }
  });
}
