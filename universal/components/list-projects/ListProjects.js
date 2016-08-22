/**
 * Created by nemaeska on 02.03.16.
 */
import React from 'react';
import { connect } from 'react-redux';

import { listProjects } from '../../actions/ListProjectActions';

class ListProjects extends React.Component {
    componentDidMount() {
        this.props.dispatch(listProjects());
    }

    render() {
        return <div className={this.props.className}>{this.props.projects.map((project, i) => {
            return (<div key={i}>
                <div>{project.created}</div>
                <div>{project.url}</div>
                <div>{project.projectName}</div>
            </div>);
        })}</div>;
    }
}

export default connect(store => ({ projects: store.listProjects }))(ListProjects);