/**
 * Created by x22a on 02.10.16.
 * Browser emulator fot tests
 */

const singleton = Symbol('singleton');
const singletonEnforcer = Symbol('enforcer');

const _accessToken = Symbol('accessToken');
const _refreshToken = Symbol('refreshToken');
const _uuid = Symbol('uuid');

export default class Browser {
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) throw new Error('Cannot construct singleton');
        this[_refreshToken] = null;
        this[_accessToken] = null;
        this[_uuid] = null;
    }

    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new Browser(singletonEnforcer);
        }
        return this[singleton];
    }

    setRefreshToken(token) {
        this[_refreshToken] = token;
    }

    getRefreshToken() {
        return this[_refreshToken];
    }

    setAccessToken(token) {
        this[_accessToken] = token;
    }

    getAccessToken() {
        return this[_accessToken];
    }

    setId(id) {
        this[_uuid] = id;
    }

    getId() {
        return this[_uuid];
    }
}
