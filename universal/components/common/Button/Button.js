import React, { Component } from 'react'

import s from './button.pcss'

export default class Button extends Component {
    render() {
        return (
            <button className={ s.button } type="button" {...this.props}>
                { this.props.children }
            </button>
        )
    }
}