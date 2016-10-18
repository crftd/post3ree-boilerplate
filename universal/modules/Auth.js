class Auth {

    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} token
     */
    static authenticateUser(token) {
        localStorage.setItem('token', token);
    }

    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     */
    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    static deauthenticateUser() {
        localStorage.removeItem('token');
    }

    /**
     * Get a token value.
     *
     */
    static getToken() {
        return localStorage.getItem('token');
    }

    /**
     * Get token payload
     * @param token
     * @returns {object} payload
     */

    static getPayload(token = this.getToken()) {
        let payload = token.split('.')[1];
        payload = JSON.parse(Buffer(payload, 'base64').toString('ascii'));
        return payload;
    }

}

export default Auth