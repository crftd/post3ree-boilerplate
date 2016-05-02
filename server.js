import path from 'path';
import bodyParser from 'body-parser';
import webpack from 'webpack'
import express from 'express';
import expressSession from 'express-session'
import http from 'http';
import socketIO from 'socket.io';
import config from 'config';

import bcrypt from 'bcrypt'
import passport from 'passport'
import Json from 'passport-json'

import * as api from './server/api/http'
import * as userAPI from './server/api/user'
import * as uni from './server/app.js';
import * as db from './server/api/service/db'

import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from './webpack.config'

const app = express();
const httpServer = http.createServer(app);
const port = config.get('express.port') || 3000;

var io = socketIO(httpServer);

app.use(webpackDevMiddleware(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true }
}));

let JsonStrategy = Json.Strategy;

passport.use(new JsonStrategy({
    usernameProp: 'user.username',
    passwordProp: 'user.password'
}, function(username, password, done) {
    process.nextTick(function () {
        var validateUser = function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, {message: 'Unknown user: ' + username})}

            if (bcrypt.compareSync(password, user.password)){
                return done(null, user);
            } else {
                return done(null, false, {message: 'Invalid username or password...'});
            }
        };

        db.findUserByEmail(username, validateUser);
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    db.findUserById(id, done);
});


app.set('views', path.join(__dirname, 'server', 'view'));
app.set('view engine', 'jade');

app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(expressSession({
    secret: 'let me down easy',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/robots.txt', (req, res) => res.sendFile(path.join(__dirname, 'robots.txt')));
app.get('/favicon.ico', (req, res) => res.sendFile(path.join(__dirname, 'images', 'favicon.ico')));
//app.get('/app.css', (req, res) => res.sendFile(path.join(__dirname, 'partials', 'app.css')));

app.post('/api/v1/projects', api.addProject);
app.get('/api/v1/projects', api.listProjects);
app.post('/api/v1/register', userAPI.register);
app.post('/api/v1/login', userAPI.logIn);
app.get('/logout', userAPI.logOut);

/**
 * Universal Application endpoint
 */
app.get('*', uni.handleRender);

httpServer.listen(port);