/**
 * Created by invader on 18.10.16.
 */

import jest from 'jest'
import jwt from 'jsonwebtoken'
import config from 'config'
import Auth from '../Auth'

const PAYLOAD = {
    uuid: 'jest@example.com',
    role: 'user'
};
const TOKEN = jwt.sign(PAYLOAD, config.jwtSecret);

describe('Auth module', () => {
    describe('getPayload', () => {
        it('Should return payload object', () => {
            let truePayload = Auth.getPayload(TOKEN);
            delete truePayload.iat;
            expect(truePayload).toEqual(PAYLOAD);
        })
    })
});