import jwt from 'jsonwebtoken';

export default function (config) {
    return (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).end();
        }

        const token = req.headers.authorization;

        // decode the token using a secret key-phrase
        return jwt.verify(token, config.jwtSecret, (err, decoded) => {
            // the 401 code is for unauthorized status
            if (err) { return res.status(401).end(); }

            if (decoded.role !== 'admin') {
                return res.status(401).end();
            }

            return next();
        });
    };
}