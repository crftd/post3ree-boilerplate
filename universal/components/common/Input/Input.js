import React, { Component } from 'react'

import classNames from 'classnames/bind'
import s from './input.pcss'

export default class Input extends Component {
    render() {
        const { err, ...rest } = this.props;

        let st = classNames.bind(s);
        let inputWrapper = st({
            inputWrapper: true,
            error: err
        });

        return (
            <div className={ inputWrapper }>
                <input type="text" { ...rest } />
            </div>
        )
    }
}