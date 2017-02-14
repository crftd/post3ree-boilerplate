/* global define, it, describe, expect */

/**
 * Crafted by invader on 18.10.16.
 */

import jwt from 'jsonwebtoken'
import config from 'config'
import Auth from '../Auth'

const PAYLOAD = {
    uuid: 'jest@example.com',
    role: 'user'
};
const TOKEN = jwt.sign(PAYLOAD, config.jwt.accessToken.secret);

describe('Auth module', () => {
    describe('getPayload', () => {
        it('Should return payload object', () => {
            const truePayload = Auth.getPayload(TOKEN);
            delete truePayload.iat;
            expect(truePayload).toEqual(PAYLOAD);
        })
    })
});
