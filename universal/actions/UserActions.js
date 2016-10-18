import request from 'superagent'
import { browserHistory } from 'react-router'
import Auth from '../modules/Auth'

import { registerUrl, loginUrl,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    LOGOUT_REQUEST, LOGOUT_SUCCESS } from './constants'

export function register(user) {
    return dispatch => {
        dispatch(registerRequest());

        return request
            .post(registerUrl)
            .send({ user })
            .set('Accept', 'application/json')
            .end(err => {
                if (err) {
                    dispatch(registerFailure());
                } else {
                    dispatch(registerSuccess());
                    browserHistory.push('/sign-in');
                }
            })
    }
}

function registerRequest() {
    return { type: REGISTER_REQUEST }
}

function registerSuccess() {
    return { type: REGISTER_SUCCESS }
}

function registerFailure() {
    return { type: REGISTER_FAILURE }
}


export function login(user) {
    return dispatch => {
        dispatch(loginRequest());

        return request
            .post(loginUrl)
            .send({ user })
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    dispatch(loginFailure());
                } else {
                    Auth.authenticateUser(res.body.token);
                    dispatch(loginSuccess(Auth.getPayload(res.body.token)));
                    browserHistory.push('/');
                }
            })
    }
}

function loginRequest() {
    return { type: LOGIN_REQUEST }
}

export function loginSuccess(payload) {
    return { type: LOGIN_SUCCESS, payload }
}

function loginFailure() {
    return { type: LOGIN_FAILURE }
}


export function logout() {
    return dispatch => {
        dispatch(logoutRequest());
        Auth.deauthenticateUser();
        dispatch(logoutSuccess());
        browserHistory.push('/');
    }
}

function logoutRequest() {
    return { type: LOGOUT_REQUEST }
}

function logoutSuccess() {
    return { type: LOGOUT_SUCCESS }
}