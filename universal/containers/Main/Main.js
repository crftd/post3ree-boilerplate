import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Auth from '../../modules/Auth'

import { loginSuccess } from '../../actions/UserActions'

import '../common/main.pcss'

import Container from '../../components/Container/Container'
import Menu from '../../components/Menu/Menu'

class Main extends Component {
    componentDidMount() {
        const { dispatch, isAuthenticated } = this.props;

        if (Auth.isUserAuthenticated()) {
            if (!isAuthenticated) {
                dispatch(loginSuccess(Auth.getUserRole()));
            }
        }
    }

    getChildContext() {
        const { isAuthenticated } = this.props;

        return {
            isAuthenticated
        }
    }

    render() {
        return (
            <Container>
                <Menu/>
                <div>
                    Hello, anonymous!
                </div>
            </Container>
        )
    }
}

Main.childContextTypes = {
    isAuthenticated: PropTypes.bool
};

export default connect (state => ({
    isAuthenticated: state.auth.isAuthenticated
}))(Main)