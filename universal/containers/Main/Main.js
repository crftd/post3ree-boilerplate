import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../common/main.pcss'

import Container from '../../components/Container/Container'
import Menu from '../../components/Menu/Menu'

class Main extends Component {
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

export default connect (() => ({}))(Main)