/**
 * Created by hex22a on 31.03.16.
 */
import passport from 'passport'

import * as db from './service/db'

import bcrypt from 'bcrypt'

var Chance = require('chance');
var chance = new Chance();

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function logIn(req, res, next) {
    passport.authenticate('json', function(err, user, info) {
        if (err) {
            res.status(400);
            res.json({error: err});
        } else {
            if (user) {
                req.logIn(user, function(err) {
                    if (err) {
                        res.status(400);
                        res.json({error: err});
                    } else {
                        var token = chance.string({length: 64});
                        db.saveToken({token}, req.user.id, function(err) {
                            if (err) { return done(err); }
                            res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days
                            res.json({user});
                            return next();
                        });
                    }
                    return err;
                })
            } else {
                res.status(400);
                res.json({error: 'No user'});
            }
            return err;
        }
    })(req, res, next);
}

export function register(req, res, next) {

    if (!validateEmail(req.body.user.username)) {
        // Probably not a good email address.
        res.status(400);
        res.json({error: 'Not a valid email address!'});
        return;
    }

    db.findUserByEmail(req.body.user.username,
        function(err, row) {
            if (err) {
                res.status(400);
                res.json({error: 'Oops'});
                return;
            }

            if (row) {
                res.status(400);
                res.json({error: 'Email is already in Database'});
            } else {
                //salt hash password
                let user = req.body.user;

                user.password = bcrypt.hashSync(user.password, 8);

                // Saving the new user to DB
                db.saveUser(user,
                    function(err, saved) {
                        console.log("[DEBUG][saveUser] %s", saved);
                        if((err) || (!saved)) {
                            res.status(400);
                            res.json({error: 'Some error'});
                        } else {
                            res.json({user});
                        }
                    }
                );
            }
        });
}

export function logOut(req, res) {
    res.clearCookie('remember_me');
    req.logout();
    res.redirect('/');
}