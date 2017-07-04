import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Auth from '../modules/Auth';

import { loginSuccess } from '../actions/UserActions';

const ContainerWrapperHOC = Container => {
  class ContainerWrapper extends Component {
    componentDidMount() {
      const { dispatch, isAuthenticated } = this.props;

      if (Auth.isUserAuthenticated()) {
        if (!isAuthenticated) {
          dispatch(loginSuccess(Auth.getPayload()));
        }
      }
    }

    getChildContext() {
      const { isAuthenticated, subject } = this.props;
      return { isAuthenticated, subject };
    }

    render() {
      return <Container { ...this.props } isAuthenticated={ this.props.isAuthenticated } />;
    }
    }

  ContainerWrapper.childContextTypes = {
    isAuthenticated: PropTypes.bool,
    subject: PropTypes.string,
  };

  return connect(state => ({
    isAuthenticated: state.auth.isAuthenticated,
    subject: state.auth.payload.sub,
  }))(ContainerWrapper);
};

export default ContainerWrapperHOC;
