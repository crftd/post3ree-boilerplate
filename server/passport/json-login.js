import bcrypt from 'bcrypt';
import Json from 'passport-json';

import jwt from 'jsonwebtoken';

import * as db from '../api/service/db';

export default function(config) {
    const JsonStrategy = Json.Strategy;

    return new JsonStrategy({
        usernameProp: 'user.username',
        passwordProp: 'user.password',
    }, (username, password, done) => {
        process.nextTick(() => {
            const validateUser = (err, user) => {
                if (err) { return done(err); }
                if (!user) { return done(null, null, false, { message: `Unknown user: ${username}` }); }

                if (bcrypt.compareSync(password, user.password)) {
                    let payload = {
                        sub: user.id,
                        role: user.role
                    };
                    
                    let token = jwt.sign(payload, config.jwtSecret);

                    let userData = {
                        name: user.name
                    };

                    return done(null, token, user);
                } else {
                    return done(null, null, false, { message: 'Invalid username or password...' });
                }
            };

            db.findUserByEmail(username, validateUser);
        });
    });
}