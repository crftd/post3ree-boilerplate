/**
 * Created by x22a on 25.02.16.
 */
import createHistory from 'history/lib/createMemoryHistory';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { syncHistory, routeReducer } from 'redux-simple-router';

import reducers from '../reducers';
import DevTools from '../containers/devTools';

export default (req, initialState) => {
    console.log('Server router!');
    const rootReducer = combineReducers(Object.assign({}, reducers, {
        routing: routeReducer
    }));

    const reduxRouterMiddleware = syncHistory(createHistory());

    let enhancer = compose(
        applyMiddleware(thunkMiddleware, reduxRouterMiddleware)
    );

    if (process.env.NODE_ENV !== 'production') {
        enhancer = compose(
            applyMiddleware(thunkMiddleware, reduxRouterMiddleware),
            DevTools.instrument()
        );
    }
    return createStore(rootReducer, initialState, enhancer);
};

