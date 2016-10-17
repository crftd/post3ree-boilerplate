import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import '../common/main.pcss'

import ContainerWrapperHOC from '../ContainerWrapper/ContainerWrapper'
import Container from '../../components/Container/Container'
import Menu from '../../components/Menu/Menu'

class Main extends Component {
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
                <div>Hello{!this.props.isAuthenticated && ', anonymous'}!</div>
            </Container>
        )
    }
}

Main.childContextTypes = {
    isAuthenticated: PropTypes.bool
};

export default connect(() => ({}))(ContainerWrapperHOC(Main))