import path from 'path';
import bodyParser from 'body-parser';
import webpack from 'webpack'
import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import config from 'config';

import * as api from './server/api/http'
import * as uni from './server/app.js';

import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from './webpack.config'

const app = express();
const httpServer = http.createServer(app);
const port = config.get('express.port') || 3000;

var io = socketIO(httpServer);

app.use(webpackDevMiddleware(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true }
}));

app.set('views', path.join(__dirname, 'server', 'view'));
app.set('view engine', 'jade');

app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/favicon.ico', (req, res) => res.sendFile(path.join(__dirname, 'images', 'favicon.ico')));
//app.get('/app.css', (req, res) => res.sendFile(path.join(__dirname, 'partials', 'app.css')));

app.post('/api/v1/projects', api.addProject);
app.get('/api/v1/projects', api.listProjects);

/**
 * Universal Application endpoint
 */
app.get('*', uni.handleRender);

httpServer.listen(port);