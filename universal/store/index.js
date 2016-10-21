/* global __DEV__:true */
if (typeof window === 'undefined') {
    module.exports = require('./configureStore.server');
} else {
    module.exports = __DEV__ ? require('./configureStore.client.dev') : require('./configureStore.client.prod');
}