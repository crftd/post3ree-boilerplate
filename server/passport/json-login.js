import bcrypt from 'bcrypt';
import Json from 'passport-json';

import jwt from 'jsonwebtoken';

import { getUser } from '../api/service/db';

export default function (config) {
    const JsonStrategy = Json.Strategy;

    return new JsonStrategy({
        usernameProp: 'id',
        passwordProp: 'password',
    }, (username, password, done) => {
        process.nextTick(async () => {
            try {
                const user = await getUser(username);
                console.log(user);
                if (bcrypt.compareSync(password, user.password)) {
                    const payload = {
                        id: user.id,
                    };

                    const token = jwt.sign(payload, config.jwtSecret);

                    return done(null, token, user);
                }
                return done(null, null, false, { message: 'Invalid username or password...' });
            } catch (error) {
                console.log(error);
                return done(error);
            }
        });
    });
}