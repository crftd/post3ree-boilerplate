import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { logout, login } from '../../actions/UserActions'

import s from './menu.pcss'

import { IndexLink, Link } from 'react-router'
import Auth from '../../modules/Auth'

class Menu extends Component {

    componentDidMount() {
        if (Auth.isUserAuthenticated()) {
            if (!this.props.isAuthenticated) {
                this.props.dispatch(login(Auth.getUserRole()));
            }
        }
    }

    render() {
        const { dispatch, isAuthenticated } = this.props;

        return (
            <div className={ s.menu }>
                <ul>
                    <li>
                        <IndexLink to="/" activeClassName={ s.active }>/main</IndexLink>
                    </li>
                    {!isAuthenticated &&
                        <li>
                            <Link to="/sign-in" activeClassName={ s.active }>/sign-in</Link>
                        </li>
                    }
                    {!isAuthenticated &&
                        <li>
                            <Link to="/sign-up" activeClassName={ s.active }>/sign-up</Link>
                        </li>
                    }
                    {isAuthenticated &&
                        <li className={ s.pullRight }>
                            <button onClick={ () => { dispatch(logout()) } }>/logout</button>
                        </li>
                    }
                </ul>
            </div>
        )
    }
}

export default connect (state => ({
    isAuthenticated: state.auth.isAuthenticated,
    role: state.auth.role
}))(Menu)