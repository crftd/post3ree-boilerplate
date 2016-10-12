import passport from 'passport';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import config from 'config';

import * as db from './service/db';

const Chance = require('chance');
const chance = new Chance();

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function logIn(req, res, next) {
    passport.authenticate('json-login', (err, token, user) => { //
        if (err) {
            res.status(400);
            res.json({ error: err });
        } else {
            if (user) {
                req.logIn(user, (err) => {
                    if (err) {
                        res.status(400);
                        res.json({ error: err });
                    } else {
                        res.json({ token });
                        return next();
                    }
                    return err;
                });
            } else {
                res.status(400);
                res.json({ error: 'No user' });
            }
            return err;
        }
    })(req, res, next);
}

export function register(req, res) {
    if (req.body.user == null) {
        res.status(400);
        res.json({ error: 'Bad request' });
    }
    if (!validateEmail(req.body.user.username)) {
        // Probably not a good email address.
        res.status(400);
        res.json({ error: 'Not a valid email address!' });
        return;
    }

    db.findUserByEmail(req.body.user.username,
        (err, row) => {
            if (err) {
                res.status(400);
                res.json({ error: 'Oops' });
                return;
            }

            if (row) {
                res.status(400);
                res.json({ error: 'Email is already in Database' });
            } else {
                // salt hash password
                const user = req.body.user;

                user.password = bcrypt.hashSync(user.password, 8);

                // Saving the new user to DB
                db.saveUser(user,
                    (err, saved, id) => {
                        if ((err) || (!saved)) {
                            res.status(400);
                            res.json({ err });
                        } else {
                            res.json({ id });
                        }
                    }
                );
            }
        });
}

export function getUser(req, res) {
    if (req.query.uuid == null && req.query.email == null && req.headers.authorization == null) {
        res.status(400);
        res.json({ error: 'Bad request' });
    }

    let sendResponse = (err, user) => {
        if (err) {
            res.status(400);
            res.json({ err });
        } else {
            delete user.password;
            res.json({ user });
        }
    };

    if (req.query.uuid) {
        db.findUserById(req.query.uuid, sendResponse)
    } else if (req.query.email) {
        db.findUserByEmail(req.query.email, sendResponse)
    } else if (req.headers.authorization) {
        let token = req.headers.authorization;
        jwt.verify(token, config.jwtSecret, function(err, decoded) {
            if (err) {
                res.status(401);
                res.json(null);
            } else {
                db.findUserById(decoded.sub, sendResponse);
            }
        });
    }
}

export function logOut(req, res) {
    req.logout();
    res.json({ logout: true });
}