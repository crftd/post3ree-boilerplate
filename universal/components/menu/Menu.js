/**
 * Created by Space Invader on 30.03.2016.
 */

import React from 'react'
import s from './menu.pcss'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import SVG from 'svg-inline-react'
import newsIcon from './images/menu-news.svg'
import privateAreaIcon from './images/menu-privateArea.svg'

import classNames from 'classnames/bind'

class Menu extends React.Component {
    render () {
        let props = this.props;

        let st = classNames.bind(s);

        let navItem = function(number) {
            return st({
                active: props.menuItem == number
            });
        };

        return  <header className={ s.header }>
                    <div className={ s.overlay }></div>
                    <nav className={ s.main }>
                        <div className={ s.menu }>
                            <ul className={ s.list }>
                                <li>
                                    <Link className={navItem(0)} to="/">
                                        <span className={ s.default }>
                                            <SVG src={ newsIcon } className={ s.newsSVG } />
                                            <span>Root</span>
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link className={navItem(1)} to="/sign-in">
                                        <span className={ s.default }>
                                            <SVG src={ privateAreaIcon } className={ s.privateAreaSVG } />
                                            <span>Private</span>
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>;
    }
}

export default connect(store => ({menuItem: store.menuItem}))(Menu)