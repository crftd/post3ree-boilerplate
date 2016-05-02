/**
 * Created by x22a on 25.02.16.
 */
require('babel-core/register');
require.extensions['.gif'] = function() {};
require.extensions['.svg'] = function() {};
require.extensions['.png'] = function() {};
require.extensions['.jpg'] = function() {};
require.extensions['.jpeg'] = function() {};
require.extensions['.ico'] = function() {};
require.extensions['.css'] = function() {};
require('babel-polyfill');
require('css-modules-require-hook/preset');
require('./server.js');