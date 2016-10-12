import jwt from 'jsonwebtoken';
import * as db from '../api/service/db';

export default function(config) {

    return function(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).end();
        }

        let token = req.headers.authorization;

        // decode the token using a secret key-phrase
        jwt.verify(token, config.jwtSecret, function(err, decoded) {
            // the 401 code is for unauthorized status
            if (err) { return res.status(401).end(); }

            let userId = decoded.sub;

            // check if a user exists
            db.findUserById(userId, function(err, user) {
                if (err || !user) {
                    return res.status(401).end();
                }

                return next();
            });
        });
    };
};