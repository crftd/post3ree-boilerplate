/**
 * Created by x22a on 25.02.16.
 */
import { createHistory } from 'history';
import { browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { syncHistory, routeReducer } from 'redux-simple-router';

import objectAssign from 'object-assign'

import reducers from '../reducers';

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;

const rootReducer = combineReducers(objectAssign({}, reducers, {
    routing: routeReducer
}));

const reduxRouterMiddleware = syncHistory(browserHistory);
const enhancer = compose(
    applyMiddleware(thunkMiddleware, reduxRouterMiddleware)
);

const store = createStore(rootReducer, initialState, enhancer);

export default store;