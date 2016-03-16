import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route } from 'react-router';

import routes from '../front/routes';
import store from '../front/store';

import Root from '../front/containers/root';

ReactDOM.render(
  <Root store={store} routing={routes} />,
  document.getElementById('app')
);
