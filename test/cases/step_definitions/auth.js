/**
 * Created by x22a on 02.10.16.
 * Auth step definition
 */

import XHR from 'xmlhttprequest';
import jwt from 'jsonwebtoken';
import config from 'config';

import Browser from '../../utils/Browser'

const XMLHttpRequest = XHR.XMLHttpRequest;

const myStepDefinitionsWrapper = function stepDefinition() {
    const browser = Browser.instance;

    let error = false;
    let logout = false;


    this.When(/^I send POST request to register with (.*) and (.*)$/, (email, password) => {
        const xhr = new XMLHttpRequest();

        const user = JSON.stringify({
            username: email,
            password,
            role: 'user'
        });

        xhr.open('POST', `http://${config.express.host}:${config.express.port}/openapi/v1/register`, false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(user);

        if (xhr.status === 200) {
            browser.setId(JSON.parse(xhr.responseText).id);
        } else if (xhr.status === 409) {
            error = true;
        } else {
            throw new Error(`[Bad response] Code: ${xhr.status} Res: ${xhr.responseText}`);
        }
    });

    this.Then(/^I get error message and 409 HTTP status code$/, () => {
        if (!error) { throw new Error('See below') }
    });

    this.Then(/^I get uuid of new user and I can access new user by id \(no password, meta-only\)$/, () => {
        const xhr = new XMLHttpRequest();

        const params = `id=${encodeURIComponent(browser.getId())}`;

        xhr.open('GET', `http://${config.express.host}:${config.express.port}/openapi/v1/user?${params}`, false);
        xhr.send();

        if (xhr.status !== 200) {
            throw new Error(`[Bad response] Code: ${xhr.status} Res: ${xhr.responseText}`);
        } else {
            const result = JSON.parse(xhr.responseText);
            if ({}.hasOwnProperty.call(result.user, 'password')) {
                throw new Error('Password transfer detected!')
            }
        }
    });

    this.Then(/^I get error message$/, () => {
        if (!error) { throw new Error('See below') }
    });

    this.When(/^I sent GET request to \/logout$/, () => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', `http://${config.express.host}:${config.express.port}/logout`, false);
        xhr.send();

        if (xhr.status !== 200) {
            throw new Error(`[Bad response] Code: ${xhr.status} Res: ${xhr.responseText}`);
        } else {
            logout = JSON.parse(xhr.responseText).logout;
        }
    });

    this.Then(/^I get response with flag to deauthenticate user$/, () => {
        if (!logout) {
            throw new Error('No logout flag')
        }
    });

    this.When(/^I send POST request to login with username: (.*) and password: (.*)$/, (email, password) => {
        const xhr = new XMLHttpRequest();

        const user = JSON.stringify({
            id: email,
            password
        });

        xhr.open('POST', `http://${config.express.host}:${config.express.port}/openapi/v1/login`, false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(user);

        if (xhr.status !== 200) {
            throw new Error(`[Bad response] Code: ${xhr.status} Res: ${xhr.responseText}`);
        } else {
            browser.setAccessToken(JSON.parse(xhr.responseText).token.accessToken);
            browser.setRefreshToken(JSON.parse(xhr.responseText).token.refreshToken);
        }
    });

    this.Then(/^I get valid JWT token$/, () => {
        /** @namespace config.jwt */
        jwt.verify(browser.getRefreshToken(), config.jwt.refreshToken.secret, err => {
            if (err) {
                throw new Error(`Corrupt refresh token. Error: ${err}`)
            }
        });
        jwt.verify(browser.getAccessToken(), config.jwt.accessToken.secret, err => {
            if (err) {
                throw new Error(`Corrupt access token. Error ${err}`)
            }
        });
    });

    this.Then(/^I can send GET request to get user data by token$/, () => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', `http://${config.express.host}:${config.express.port}/openapi/v1/user`, false);
        xhr.setRequestHeader('Authorization', browser.getAccessToken());
        xhr.send();

        if (xhr.status !== 200) {
            throw new Error(`[Bad response] Code: ${xhr.status} Res: ${xhr.responseText}`);
        } else {
            const result = JSON.parse(xhr.responseText);
            if ({}.hasOwnProperty.call(result.user, 'password')) {
                throw new Error('Password transfer detected!')
            }
        }
    });
};
module.exports = myStepDefinitionsWrapper;
