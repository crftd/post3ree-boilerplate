import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga';

import rootSaga from '../sagas';
import rootReducer from '../redux';

export default (req, initialState) => {
  console.log('Server router!');

  const saga = createSagaMiddleware();

  const composeEnhancers = composeWithDevTools({});

  const enhancer = composeEnhancers(
    applyMiddleware(saga)
  );

  const store = createStore(rootReducer, initialState, enhancer);
  saga.run(rootSaga);

  return store;
};
