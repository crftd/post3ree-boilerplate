import bcrypt from 'bcrypt';
import Json from 'passport-json';

import jwt from 'jsonwebtoken';

import { getUser } from '../api/service/db';

export default function (config) {
  const JsonStrategy = Json.Strategy;

  return new JsonStrategy({
    usernameProp: 'username',
    passwordProp: 'password',
  }, (username, password, done) => {
    process.nextTick(async () => {
      try {
        const user = await getUser(username);
        if (bcrypt.compareSync(password, user.password)) {
                    // sub - subject
                    // exp - expiresIn
                    // iss - issuer
                    // iat - issued at
          const accessTokenPayload = {
            sub: user.id,
          };

          const refreshTokenPayload = {
            sub: user.id,
          };

          const accessToken = jwt.sign(accessTokenPayload, config.jwt.accessToken.secret, { expiresIn: config.jwt.accessToken.expiresIn });
          const refreshToken = jwt.sign(refreshTokenPayload, config.jwt.refreshToken.secret, { expiresIn: config.jwt.refreshToken.expiresIn });

          return done(null, { accessToken, refreshToken }, user);
        }
        return done(null, null, false, { message: 'Invalid username or password...' });
      } catch (error) {
        console.log(error);
        return done(error);
      }
    });
  });
}
