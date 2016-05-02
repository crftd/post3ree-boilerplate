/**
 * Created by x22a on 25.02.16.
 */
import React from 'react'

import styles from './../common/main.pcss'

import { Link } from 'react-router'
import Menu from '../../components/menu/Menu'

export default class Main extends React.Component {
    render () {
        return  <div>
                    <Menu />
                    <div className={styles.main}>
                        <p>Hello, darling. Ama main.</p>
                        <Link className={styles.label} to="dashboard">Dashboard</Link>
                        <Link className={styles.label} to="add-project">Add project</Link>
                    </div>
                </div>;
    }
}