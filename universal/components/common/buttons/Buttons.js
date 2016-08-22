/**
 * Created by Space Invader on 06.04.2016.
 */

import React from 'react';
import classNames from 'classnames/bind';
import FaSignOut from 'react-icons/lib/fa/sign-out';

import s from './buttons.pcss';

export class Button extends React.Component {
    render() {
        const st = classNames.bind(s);
        let button = st({
            button: true,
            large: this.props.large,
            small: this.props.small,
            grey: this.props.color === 'grey',
        });

        return <button
                    className={ button }
                    type="button"
                    {...this.props}
                >
                    { this.props.children }
                </button>;
    }
}

export class ExitButton extends React.Component {
    render() {
        return <a
                    className={ s.exitButtonComponent }
                    type="button"
                    {...this.props}
                >
                    <span className={ s.text }>
                        Выйти
                    </span>
                    <span className={ s.icon }>
                        <FaSignOut/>
                    </span>
                </a>;
    }
}