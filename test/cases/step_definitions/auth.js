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


    this.Given(/^I have an empty DB$/, () => {
        console.warn('[x22a] Well it is given');
    });

    this.When(/^I send POST request to register with (.*) and (.*)$/, (email, password) => {
        const xhr = new XMLHttpRequest();

        const user = JSON.stringify({ user: {
            username: email,
            password,
            role: 'user'
        }
        });

        xhr.open('POST', `http://${config.express.host}:${config.express.port}/openapi/v1/register`, false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(user);

        if (xhr.status !== 200) {
            throw new Error(`[Bad response] Code: ${xhr.status} Res: ${xhr.responseText}`);
        } else {
            browser.setId(JSON.parse(xhr.responseText).id);
        }
    });

    this.Then(/^I get uuid of new user and I can access new user by uuid or (.*) \(no password, meta\-only\)$/, email => {
        const xhr = new XMLHttpRequest();

        let params = `uuid=${encodeURIComponent(browser.getId())}`;

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

        // get by email

        params = `email=${encodeURIComponent(email)}`;

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


    this.Given(/^I have DB with user with email test@example\.com and 123456 password$/, () => {
        console.warn('[x22a] we might have users from previous steps');
    });

    this.When(/^I call api function register with test@example\.com and anypassword$/, () => {
        const xhr = new XMLHttpRequest();

        const user = JSON.stringify({ user: {
            username: 'test@example.com',
            password: 'somepassword',
            role: 'user'
        }
        });

        xhr.open('POST', `http://${config.express.host}:${config.express.port}/openapi/v1/register`, false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(user);

        if (xhr.status === 200) {
            throw new Error('[Good response] (Bad expected)');
        } else {
            error = true;
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

    this.Given(/^Registered user with username: (.*) and password: (.*)$/, (email, password) => {
        const xhr = new XMLHttpRequest();

        const user = JSON.stringify({ user: {
            username: email,
            password,
            role: 'user'
        }
        });

        xhr.open('POST', `http://${config.express.host}:${config.express.port}/openapi/v1/register`, false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(user);

        if (xhr.status === 200) {
            browser.setId(JSON.parse(xhr.responseText).id);
        }
    });

    this.When(/^I send POST request to login with username: (.*) and password: (.*)$/, (email, password) => {
        const xhr = new XMLHttpRequest();

        const user = JSON.stringify({ user: {
            username: email,
            password
        }
        });

        xhr.open('POST', `http://${config.express.host}:${config.express.port}/openapi/v1/login`, false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(user);

        if (xhr.status !== 200) {
            throw new Error(`[Bad response] Code: ${xhr.status} Res: ${xhr.responseText}`);
        } else {
            browser.setToken(JSON.parse(xhr.responseText).token);
        }
    });

    this.Then(/^I get valid JWT token$/, () => {
        /** @namespace config.jwtSecret */
        jwt.verify(browser.getToken(), config.jwtSecret, err => {
            if (err) {
                throw new Error('Corrupt token')
            }
        });
    });

    this.Then(/^I can send GET request to get user data by token$/, () => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', `http://${config.express.host}:${config.express.port}/openapi/v1/user`, false);
        xhr.setRequestHeader('Authorization', browser.getToken());
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