import ReactDOM from 'react-dom';
import React from 'react';

import routes from '../universal/routes';
import store from '../universal/store';

import Root from '../universal/containers/root';

ReactDOM.render(
  <Root store={store} routing={routes} />,
  document.getElementById('app')
);
