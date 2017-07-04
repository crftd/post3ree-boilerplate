import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';
import expressSession from 'express-session';
import http from 'http';
import config from 'config';

import passport from 'passport';
import authCheckMiddleware from './server/middlewares/auth-check';
import adminCheckMiddleware from './server/middlewares/admin-check';

import * as userAPI from './server/api/user';
import uni from './server/render/client';
import { findToDeserialize } from './server/api/service/db';

import strategies from './server/passport';

const app = express();
const httpServer = http.createServer(app);
const port = config.get('express.port') || 3000;

app.use('/api', authCheckMiddleware(config));
app.use('/api/admin', adminCheckMiddleware(config));

strategies(config);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  findToDeserialize(id, done);
});

app.set('views', path.join(__dirname, 'server', 'view'));
app.set('view engine', 'pug');

app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(expressSession({
  secret: 'let me down easy',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/robots.txt', (req, res) => res.sendFile(path.join(__dirname, 'robots.txt')));
app.get('/favicon.ico', (req, res) => res.sendFile(path.join(__dirname, 'images', 'favicon.ico')));

/* open api */
app.post('/openapi/v1/register', userAPI.register);
app.post('/openapi/v1/login', userAPI.logIn);
app.get('/openapi/v1/user', userAPI.fetchUser);
app.get('/logout', userAPI.logOut);

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { publicPath: '/dist/', stats: { colors: true }, serverSideRender: true }));
  app.use(webpackHotMiddleware(compiler, { log: false, path: '/__webpack_hmr', heartbeat: 1500 }));
} else {
  const stats = require('./dist/stats.json');
  app.use('/dist', express.static(path.join(__dirname, 'dist')));
  app.use('*', (req, res, next) => {
    res.locals.webpackStats = stats;
    res.locals.webpackStats.toJson = () => stats;
    next();
  });
}

app.get('*', uni);

httpServer.listen(port);
