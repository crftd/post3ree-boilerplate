import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { logout } from '../../actions/UserActions'

import s from './menu.pcss'

import { IndexLink, Link } from 'react-router'

class Menu extends Component {
    render() {
        const { dispatch } = this.props;
        const { isAuthenticated } = this.context;

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

Menu.contextTypes = {
    isAuthenticated: PropTypes.bool
};

export default connect(() => ({}))(Menu)