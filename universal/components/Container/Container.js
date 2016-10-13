import React, { Component } from 'react'

import s from './container.pcss'

export default class Container extends Component {
    render() {
        return (
            <div className={ s.wrapper }>
                <div className={ s.container }>
                    { this.props.children }
                </div>
            </div>
        )
    }
}