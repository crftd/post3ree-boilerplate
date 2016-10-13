if (typeof window === 'undefined') {
    module.exports = require('./configureStore.server');
} else {
    if (__DEV__) {
        module.exports = require('./configureStore.client.dev');
    }
    module.exports = require('./configureStore.client.prod');
}
