import ReactDOM from 'react-dom';
import React from 'react';
import routes from './routes';
import store from './store';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component store={ store } routing={ routes }/>
    </AppContainer>,
    document.getElementById('app')
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    render(Root);
  });
}
