import bodyParser from 'body-parser';
import config from 'config';
import gzipStatic from 'connect-gzip-static';
import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import webpack from 'webpack';
import database from './database';

// Only required in development

const app = express();
const TARGET = process.env.npm_lifecycle_event;
database(config.get('api.mongo'));

// Hot-reload modules with webpack
if (TARGET === 'dev') {
  /* eslint-disable global-require */
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('./webpack.config');
  /* eslint-enable global-require */
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true }));
  app.use(webpackHotMiddleware(compiler));
}

// pretty output HTML
app.locals.pretty = true;

// view engine setup
app.set('views', path.join(__dirname, 'views', 'pages'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.enable('trust proxy');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (TARGET === 'dev') {
  app.use(express.static(path.join(__dirname, 'public')));
}
else {
  app.use(gzipStatic(path.join(__dirname, 'public')));
}

// Default route
import routes from './routes/index';
app.use('/form', require('./routes/form'));
app.use('/news-feed', require('./routes/newsFeed'));
app.use(routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (TARGET === 'dev') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
