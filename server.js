import path from 'path';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import express from 'express';
import expressSession from 'express-session';
import http from 'http';
import config from 'config';

import passport from 'passport';
import webpackDevMiddleware from 'webpack-dev-middleware';
import authCheckMiddleware from './server/middlewares/auth-check'
import adminCheckMiddleware from './server/middlewares/admin-check'

import * as api from './server/api/http';
import * as userAPI from './server/api/user';
import * as uni from './server/app.js';
import * as db from './server/api/service/db';
import webpackConfig from './webpack.config';

import strategies from './server/passport'

const app = express();
const httpServer = http.createServer(app);
const port = config.get('express.port') || 3000;

app.use(webpackDevMiddleware(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
}));
app.use('/api', authCheckMiddleware(config));
app.use('/api/admin', adminCheckMiddleware(config));

strategies(config);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.findUserById(id, done);
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
app.get('/openapi/v1/user', userAPI.getUser);
app.get('/logout', userAPI.logOut);

/* api */

/* admin api */

/* universal app endpoint */
app.get('*', uni.handleRender);

httpServer.listen(port);