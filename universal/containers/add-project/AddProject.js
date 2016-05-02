/**
 * Created by x22a on 25.02.16.
 */
import React from 'react'
import styles from './../common/main.pcss'

import ProjectCreateForm from '../../components/project-create-form/ProjectCreateForm'
import Menu from '../../components/menu/Menu'

export default class AddProject extends React.Component {
    render () {
        return  <div>
                    <Menu />
                    <ProjectCreateForm className={styles.main}/>
                </div>;
    }
}