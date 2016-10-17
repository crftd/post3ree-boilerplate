import React, { Component } from 'react'
import { connect } from 'react-redux'
import Auth from '../../modules/Auth'

import { loginSuccess } from '../../actions/UserActions'

const ContainerWrapperHOC = Container => {
    class ContainerWrapper extends Component {
        componentDidMount() {
            const { dispatch, isAuthenticated } = this.props;

            if (Auth.isUserAuthenticated()) {
                if (!isAuthenticated) {
                    dispatch(loginSuccess(Auth.getUserRole()));
                }
            }
        }

        render() {
            return <Container { ...this.props } isAuthenticated={ this.props.isAuthenticated } />
        }
    }

    return connect(state => ({
        isAuthenticated: state.auth.isAuthenticated
    }))(ContainerWrapper);
};

export default ContainerWrapperHOC