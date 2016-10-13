if (__DEV__) {
    module.exports = require('./root.dev');
} else {
    module.exports = require('./root.prod');
}