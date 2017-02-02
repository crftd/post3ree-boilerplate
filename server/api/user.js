/**
 * Created by hex22a on 31.03.16.
 * user api
 */
import passport from 'passport';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import config from 'config';

import { getUser, saveUser } from './service/db';

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/**
 * @param req
 * @param res
 * @param next
 */
export function logIn(req, res, next) {
    // noinspection JSUnresolvedFunction
    passport.authenticate('json-login', (err, token, user) => {
        if (err) {
            res.status(400);
            res.json({ error: err });
        } else if (user) {
            req.logIn(user, logInError => {
                if (logInError) {
                    res.status(400);
                    res.json({ error: logInError });
                } else {
                    res.json({ token });
                    return next();
                }
                return logInError;
            });
        } else {
            res.status(400);
            res.json({ error: 'No user' });
        }
        return err;
    })(req, res, next);
}

export async function register(req, res) {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        res.status(400);
        res.json({ error: 'Bad request' });
    }
    if (!validateEmail(username)) {
        // Probably not a good email address.
        res.status(400);
        res.json({ error: 'Not a valid email address!' });
        return;
    }

    const existing = await getUser(username);
    if (existing) {
        res.status(400);
        res.json({ error: 'A user with this email address already exists.' });
    } else {
        const user = { id: username, password, role };

        user.password = bcrypt.hashSync(password, 8);
        try {
            const result = await saveUser(user);
            res.json(result);
        } catch (e) {
            res.status(500);
            res.json({ error: e });
        }
    }
}

export function fetchUser(req, res) {
    if (!req.query.id && !req.headers.authorization) {
        res.status(400);
        res.json({ error: 'Bad request' });
    }

    const fetchUserMagic = async userId => {
        try {
            const user = await getUser(userId);
            delete user.password;
            res.json({ user });
        } catch (err) {
            res.status(500);
            res.json({ err });
        }
    };

    if (req.query.id) {
        fetchUserMagic(req.query.id)
    } else if (req.headers.authorization) {
        const token = req.headers.authorization;
        jwt.verify(token, config.jwtSecret, async (err, decoded) => {
            if (err) {
                res.status(401);
                res.json(null);
            } else {
                fetchUserMagic(decoded.id);
            }
        });
    }
}

export function logOut(req, res) {
    req.logout();
    res.json({ logout: true });
}