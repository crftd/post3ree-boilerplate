import { createStore, applyMiddleware, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';

import rootSaga from '../sagas';
import rootReducer from '../redux';

export default (req, initialState) => {
  console.log('Server router!');

  const saga = createSagaMiddleware();

  const enhancer = compose(
    applyMiddleware(saga)
  );

  const store = createStore(rootReducer, initialState, enhancer);
  saga.run(rootSaga);

  return store;
};
