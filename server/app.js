import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext, match } from 'react-router';

import configureStore from '../universal/store';
import DevTools from '../universal/containers/devTools';
import routes from '../universal/routes';

const isDev = (process.env.NODE_ENV !== 'production');

export function handleRender(req, res) {
    console.log(' [x] Request for', req.url);
    const initialState = {};

    const store = configureStore(req, initialState);

    // Wire up routing based upon routes
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (req.user != null) {
            console.log('[AUTH]', req.user);
        } else {
            console.log('[AUTH] unauthorized request');
        }

        if (error) {
            console.log('Error', error);
            res.status(400);
            res.send(error);
            return;
        }

        if (redirectLocation) {
            res.redirect(redirectLocation);
            return;
        }

        const devTools = (isDev) ? <DevTools /> : null;

        // Render the component to a string
        const html = ReactDOMServer.renderToString(
            <Provider store={store}>
            <div>
            <RouterContext {...renderProps} />
        {devTools}
        </div>
        </Provider>
        );

        res.render('index', { isProd: (!isDev), html, initialState: store.getState() });
    });
}