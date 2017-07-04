/* global __DEV__:true */
if (typeof window === 'undefined') {
  module.exports = process.env.NODE_ENV === 'development' ? require('./configureStore.server.dev') : require('./configureStore.server.prod');
} else {
  module.exports = __DEV__ ? require('./configureStore.client.dev') : require('./configureStore.client.prod');
}
