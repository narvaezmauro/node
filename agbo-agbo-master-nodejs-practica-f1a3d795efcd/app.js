'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const i18n = require('i18n');

/* jshint ignore:start */
const db = require('./lib/connectMongoose');
/* jshint ignore:end */

// Cargamos las definiciones de todos nuestros modelos
require('./models/Anuncio');
require('./models/Usuario');
require('./models/PushToken');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// registrar lenguajes
i18n.configure({
  directory: __dirname + '/locales',
  defaultLocale: 'en',
  register: global
});
app.use(i18n.init);

// Web
app.use('/', require('./routes/index'));

// API v1
app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
app.use('/apiv1/usuarios', require('./routes/apiv1/usuarios'));
app.use('/apiv1/pushtokens', require('./routes/apiv1/pushtokens'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  /*jshint unused: false*/
  app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || err.code || 500);
    if (isAPI(req)) { // llamada de API, devuelvo JSON
      return res.json({ ok: false,
        error: { code: err.code || err.status || 500, message: err.message, err: err }
      });
    }

    res.render('error', { message: err.message, error: err });
  });
  /*jshint unused: true*/
}

// production error handler
// no stacktraces leaked to user
/*jshint unused: false*/
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || err.code || 500);
  if (isAPI(req)) { // llamada de API, devuelvo JSON
    return res.json({ ok: false,
      error: { code: err.code || err.status || 500, message: err.message, err: {} }
    });
  }

  res.render('error', { message: err.message, error: {} });
});
/*jshint unused: true*/

function isAPI(req) {
  return req.originalUrl.indexOf('/api') === 0;
}

module.exports = app;
