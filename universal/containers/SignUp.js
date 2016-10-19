import React, { Component } from 'react'
import { connect } from 'react-redux'

import ContainerWrapperHOC from './ContainerWrapperHOC'
import Container from '../components/Container/Container'
import Menu from '../components/Menu/Menu'
import SignUpForm from '../components/SignUpForm/SignUpForm'

class SignUp extends Component {
    render() {
        return (
            <Container>
                <Menu/>
                <SignUpForm/>
            </Container>
        )
    }
}

export default connect(() => ({}))(ContainerWrapperHOC(SignUp))