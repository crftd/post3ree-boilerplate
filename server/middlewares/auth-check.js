import jwt from 'jsonwebtoken';
import { getUser } from '../api/service/db';

export default function (config) {
    return (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).end();
        }

        const token = req.headers.authorization;
        console.log(token);
        // decode the token using a secret key-phrase
        return jwt.verify(token, config.jwt.accessToken.secret, async (err, decoded) => {
            // the 401 code is for unauthorized status
            if (err) { return res.status(401).end(); }

            console.log(decoded.sub);
            const userId = decoded.sub;

            // check if a user exists
            try {
                await getUser(userId);
                return next();
            } catch (e) {
                return res.status(401).end();
            }
        });
    };
}
