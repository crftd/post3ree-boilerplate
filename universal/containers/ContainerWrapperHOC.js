import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Auth from '../modules/Auth'

import { loginSuccess } from '../actions/UserActions'

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
            const { isAuthenticated, uuid, role } = this.props;
            return { isAuthenticated, uuid, role };
        }

        render() {
            return <Container { ...this.props } isAuthenticated={ this.props.isAuthenticated } />
        }
    }

    ContainerWrapper.childContextTypes = {
        isAuthenticated: PropTypes.bool,
        uuid: PropTypes.string,
        role: PropTypes.string
    };

    return connect(state => ({
        isAuthenticated: state.auth.isAuthenticated,
        uuid: state.auth.payload.sub,
        role: state.auth.payload.role
    }))(ContainerWrapper);
};

export default ContainerWrapperHOC