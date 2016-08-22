import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import webpack from 'webpack';
import express from 'express';
import expressSession from 'express-session';
import http from 'http';
// import socketIO from 'socket.io';
import config from 'config';

import bcrypt from 'bcrypt';
import passport from 'passport';
import Json from 'passport-json';
import RememberMe from 'passport-remember-me';
import webpackDevMiddleware from 'webpack-dev-middleware';

import * as api from './server/api/http';
import * as userAPI from './server/api/user';
import * as uni from './server/app.js';
import * as db from './server/api/service/db';
import webpackConfig from './webpack.config';

const app = express();
const httpServer = http.createServer(app);
const port = config.get('express.port') || 3000;

// const io = socketIO(httpServer);

const Chance = require('chance');

const chance = new Chance();

app.use(webpackDevMiddleware(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
}));

const JsonStrategy = Json.Strategy;
const RememberMeStrategy = RememberMe.Strategy;

passport.use(new JsonStrategy({
    usernameProp: 'user.username',
    passwordProp: 'user.password',
}, (username, password, done) => {
    process.nextTick(() => {
        const validateUser = (err, user) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: `Unknown user: ${username}` }); }

            if (bcrypt.compareSync(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Invalid username or password...' });
            }
        };

        db.findUserByEmail(username, validateUser);
    });
}));

passport.use(new RememberMeStrategy(
    (token, done) => {
        db.consumeToken(token, (err, uid) => {
            if (err) { return done(err); }
            if (!uid) { return done(null, false); }

            const validateUser = (err, user) => {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                return done(null, user);
            };

            db.findUserById(uid, validateUser);
        });
    },
    (user, done) => {
        const token = chance.string({ length: 64 });
        db.saveToken({ token }, user.id, (err) => {
            if (err) { return done(err); }
            return done(null, token);
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.findUserById(id, done);
});


app.set('views', path.join(__dirname, 'server', 'view'));
app.set('view engine', 'pug');

app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(cookieParser());
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
app.use(passport.authenticate('remember-me'));

app.get('/robots.txt', (req, res) => res.sendFile(path.join(__dirname, 'robots.txt')));
app.get('/favicon.ico', (req, res) => res.sendFile(path.join(__dirname, 'images', 'favicon.ico')));
// app.get('/app.css', (req, res) => res.sendFile(path.join(__dirname, 'partials', 'app.css')));

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