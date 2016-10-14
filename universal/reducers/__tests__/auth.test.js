import reducer from '../auth'
import * as constants from '../../actions/constants'

describe('Auth reducers', () => {
    describe('Auth', () => {
        it('Should return the initial state', () => {
            expect(reducer.auth(undefined, {})).toEqual({
                isAuthenticated: false,
                role: ''
            });
        });

        it('Should handle LOGIN_SUCCESS from user', () => {
            expect(reducer.auth({}, {
                type: constants.LOGIN_SUCCESS,
                role: 'user'
            })).toEqual({
                isAuthenticated: true,
                role: 'user'
            });
        });

        it('Should handle LOGIN_SUCCESS from admin', () => {
            expect(reducer.auth({}, {
                type: constants.LOGIN_SUCCESS,
                role: 'admin'
            })).toEqual({
                isAuthenticated: true,
                role: 'admin'
            })
        });

        it('Should handle LOGOUT_SUCCESS from any user', () => {
            expect(reducer.auth({}, {
                type: constants.LOGOUT_SUCCESS
            })).toEqual({
                isAuthenticated: false,
                role: ''
            })
        })
    });
});