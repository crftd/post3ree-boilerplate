import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerReducer } from 'react-router-redux'

import reducers from '../reducers'
import DevTools from '../containers/devTools'

export default (req, initialState) => {
    console.log('Server router!');
    const rootReducer = combineReducers(Object.assign({}, reducers, {
        routing: routerReducer
    }));

    let enhancer = compose(
        applyMiddleware(thunkMiddleware)
    );

    if (process.env.NODE_ENV !== 'production') {
        enhancer = compose(
            applyMiddleware(thunkMiddleware),
            DevTools.instrument()
        );
    }

    return createStore(rootReducer, initialState, enhancer);
};