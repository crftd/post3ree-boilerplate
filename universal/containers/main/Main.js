/**
 * Created by x22a on 25.02.16.
 */
import React from 'react'
import { connect } from 'react-redux'

import styles from './main.pcss'

export default class Main extends React.Component {
    render () {
        return  <div>
                    <p>Hello, darling. Ama main.</p>
                    <a className={styles.label} href="dashboard">Dashboard</a>
                    <a className={styles.label} href="add-project">Add project</a>
                </div>;
    }
}