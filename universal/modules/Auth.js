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
     * Get a user id
     *
     * @returns {string} id
     */

    static getUserId() {
        return Buffer(this.getToken().split('.')[1], 'base64').toString('ascii').split('\"')[3];
    }

    /**
     * Get a user role
     *
     * @returns {string} role
     */

    static getUserRole() {
        return Buffer(this.getToken().split('.')[1], 'base64').toString('ascii').split('\"')[7];
    }

}

export default Auth