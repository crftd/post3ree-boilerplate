/**
 * Crafted by x22a on 06.05.17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const Root = ({ store, routing }) =>
  <Provider store={ store }>
    <BrowserRouter>
      {routing}
    </BrowserRouter>
  </Provider>;

Root.propTypes = {
  routing: PropTypes.any,
  store: PropTypes.any,
};

export default Root;

