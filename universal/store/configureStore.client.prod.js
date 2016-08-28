import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import objectAssign from 'object-assign';

import reducers from '../reducers';

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;

const rootReducer = combineReducers(objectAssign({}, reducers, {
    routing: routerReducer,
}));

const enhancer = compose(
    applyMiddleware(thunkMiddleware)
);

const store = createStore(rootReducer, initialState, enhancer);

export default store;