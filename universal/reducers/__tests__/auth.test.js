import reducer from '../auth'
import * as constants from '../../actions/constants'

const PAYLOAD = {
    uuid: 'jest@example.com',
    role: 'user'
};

describe('Auth reducers', () => {
    describe('Auth', () => {
        it('Should return the initial state', () => {
            expect(reducer.auth(undefined, {})).toEqual({
                isAuthenticated: false,
                payload: {
                    sub: '',
                    role: ''
                }
            });
        });

        it('Should handle LOGIN_SUCCESS from user', () => {
            expect(reducer.auth({}, {
                type: constants.LOGIN_SUCCESS,
                payload: PAYLOAD
            })).toEqual({
                isAuthenticated: true,
                payload: {
                    uuid: 'jest@example.com',
                    role: 'user'
                }
            });
        });

        it('Should handle LOGOUT_SUCCESS from any user', () => {
            expect(reducer.auth({}, {
                type: constants.LOGOUT_SUCCESS
            })).toEqual({
                isAuthenticated: false,
                payload: {
                    sub: '',
                    role: ''
                }
            })
        })
    });
});