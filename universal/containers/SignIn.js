import React, { Component } from 'react'
import { connect } from 'react-redux'

import ContainerWrapperHOC from './ContainerWrapperHOC'
import Container from '../components/Container/Container'
import Menu from '../components/Menu/Menu'
import SignInForm from '../components/SignInForm/SignInForm'

class SignIn extends Component {
    render() {
        return (
            <Container>
                <Menu/>
                <SignInForm />
            </Container>
        )
    }
}

export default connect(() => ({}))(ContainerWrapperHOC(SignIn))