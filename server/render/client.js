import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';

import configureStore from '../../client/store';
import routes from '../../client/routes';

const isDev = (process.env.NODE_ENV !== 'production');

export default (req, res) => {
  console.info('[RENDER] Request for', req.url);
  const context = {};
  const initialState = {};

  const store = configureStore(req, initialState);

  const { assetsByChunkName } = res.locals.webpackStats.toJson();
  const css = assetsByChunkName.bundle
    .filter(path => path.endsWith('.css'))
    .map(asset => `/dist/${asset}`);

  const js = assetsByChunkName.bundle
    .filter(path => path.endsWith('.js'))
    .map(asset => `/dist/${asset}`);
  js.unshift('/dist/vendor.js');

  const render = ReactDOMServer.renderToString(
    <Provider store={ store }>
      <StaticRouter
        location={ req.url }
        context={ context }
      >
        { routes }
      </StaticRouter>
    </Provider>
  );

  if (context.url) {
    res.redirect(context.url);
  } else {
    res.render('index', { isProd: (!isDev), render, initialState: store.getState(), css, js });
  }
};
