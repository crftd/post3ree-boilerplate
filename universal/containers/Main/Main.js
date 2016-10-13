import React, { Component } from 'react'
import { connect } from 'react-redux'
import Auth from '../../modules/Auth'

import { login } from '../../actions/UserActions'

import '../common/main.pcss'

import Container from '../../components/Container/Container'
import Menu from '../../components/Menu/Menu'

class Main extends Component {
    componentDidMount() {
        if (Auth.isUserAuthenticated()) {
            if (!this.props.isAuthenticated) {
                this.props.dispatch(login(Auth.getUserRole()));
            }
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

export default connect (state => ({
    isAuthenticated: state.auth.isAuthenticated,
    role: state.auth.role
}))(Main)