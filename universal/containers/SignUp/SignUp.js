import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ContainerWrapperHOC from '../ContainerWrapper/ContainerWrapper'
import Container from '../../components/Container/Container'
import Menu from '../../components/Menu/Menu'
import SignUpForm from '../../components/SignUpForm/SignUpForm'

class SignUp extends Component {
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
                <SignUpForm/>
            </Container>
        )
    }
}

SignUp.childContextTypes = {
    isAuthenticated: PropTypes.bool
};

export default connect(() => ({}))(ContainerWrapperHOC(SignUp))