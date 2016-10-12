import passport from 'passport';
import jsonLoginStrategy from './json-login';

export default function (config) {
    passport.use('json-login', jsonLoginStrategy(config));
}