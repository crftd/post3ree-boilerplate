/**
 * Created by x22a on 25.02.16.
 */
require('babel-core/register');

require.extensions['.gif'] = () => {};
require.extensions['.svg'] = () => {};
require.extensions['.png'] = () => {};
require.extensions['.jpg'] = () => {};
require.extensions['.jpeg'] = () => {};
require.extensions['.ico'] = () => {};
require.extensions['.css'] = () => {};
require('babel-polyfill');
require('css-modules-require-hook/preset');
require('./server.js');