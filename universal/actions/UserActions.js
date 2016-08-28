/**
 * Created by hex22a on 01.04.16.
 */
import request from 'superagent';

import { routerActions } from 'react-router-redux';

import { registerUrl, loginUrl,
    REGISTER_USER, REGISTER_USER_FAIL, REGISTER_USER_SUCCESS,
    LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL } from './constants';

export function registerUser(user) {
    return dispatch => {
        dispatch(registerUserRequest(user));

        return request
            .post(registerUrl)
            .send({ user })
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    dispatch(registerUserFail(user, res.body));
                } else {
                    dispatch(registerUserSuccess(res.body));
                }
            });
    };
}

function registerUserRequest(user) {
    return { type: REGISTER_USER, user };
}

function registerUserSuccess(user) {
    return { type: REGISTER_USER_SUCCESS, user };
}

function registerUserFail(user, error) {
    return { type: REGISTER_USER_FAIL, user, error };
}

export function loginUser(user) {
    return dispatch => {
        dispatch(loginUserRequest(user));

        return request
            .post(loginUrl)
            .send({ user })
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    dispatch(loginUserFail(res.body));
                } else {
                    console.log(res.body.user.role);
                    switch (res.body.user.role) {
                    case 'sales':
                        dispatch(routerActions.push('/dashboard-manager'));
                        break;
                    case 'rop':
                        dispatch(routerActions.push('/dashboard-rop'));
                        break;
                    case 'superuser':
                        dispatch(routerActions.push('/superuser'));
                        break;
                    case 'project-manager':
                        dispatch(routerActions.push('/dashboard-project-manager'));
                        break;
                    case 'customer':
                        dispatch(routerActions.push('/dashboard'));
                        break;
                    }
                    dispatch(loginUserSuccess(res.body));
                }
            });
    };
}

function loginUserRequest(user) {
    return { type: LOGIN_USER, user };
}

function loginUserSuccess(user) {
    return { type: LOGIN_USER_SUCCESS, user };
}

function loginUserFail(user, error) {
    return { type: LOGIN_USER_FAIL, user, error };
}