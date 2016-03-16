/**
 * Created by nemaeska on 03.03.16.
 */
import React from 'react'
import { connect } from 'react-redux'

import ListProjects from '../../components/list-projects/ListProjects'

export default class Dashboard extends React.Component {
    render () {
        return  <div>
            <ListProjects/>
        </div>;
    }
}