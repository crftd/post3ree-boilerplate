/* global __DEV__:true */
module.exports = __DEV__ ? require('./root.dev') : require('./root.prod');