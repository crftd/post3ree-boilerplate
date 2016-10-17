import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ContainerWrapperHOC from '../ContainerWrapper/ContainerWrapper'
import Container from '../../components/Container/Container'
import Menu from '../../components/Menu/Menu'
import SignInForm from '../../components/SignInForm/SignInForm'

class SignIn extends Component {
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
                <SignInForm />
            </Container>
        )
    }
}

SignIn.childContextTypes = {
    isAuthenticated: PropTypes.bool
};

export default connect(() => ({}))(ContainerWrapperHOC(SignIn))