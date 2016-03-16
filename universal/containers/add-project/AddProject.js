/**
 * Created by x22a on 25.02.16.
 */
import React from 'react'
import { connect } from 'react-redux'

import ProjectCreateForm from '../../components/project-create-form/ProjectCreateForm'

export default class AddProject extends React.Component {
    render () {
        return  <div>
            <ProjectCreateForm/>
        </div>;
    }
}