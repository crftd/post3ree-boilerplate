/**
 * Created by nemaeska on 03.03.16.
 */
import React from 'react'

import styles from './../common/main.pcss'

import ListProjects from '../../components/list-projects/ListProjects'
import Menu from '../../components/menu/Menu'

export default class Dashboard extends React.Component {
    render () {
        return  <div>
                    <Menu />
                    <ListProjects className={styles.main} />
                </div>;
    }
}