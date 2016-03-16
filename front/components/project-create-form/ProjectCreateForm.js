/**
 * Created by nemaeska on 02.03.16.
 */
import React from 'react'
import { connect } from 'react-redux'

import styles from './project_create_form.pcss'

import { addProject } from '../../actions/RolandActions'

class ProjectCreateForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            errors: [],
            projectName: this.props.projectName || '',
            url: this.props.url || ''
        };
    }

    handleUrlChange(e) {
        this.setState({url: e.target.value});
    }

    handleProjectNameChange(e) {
        this.setState({projectName: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.dispatch(addProject({projectName: this.state.projectName, url: this.state.url}));
    }

    render () {
        return  <div>
                    <div>
                        <form>
                            <label>Название проекта
                                <input className={styles.common_input} type="text" onChange={::this.handleProjectNameChange}/>
                            </label>
                            <label>Адрес
                                <input className={styles.common_input} type="text" onChange={::this.handleUrlChange}/>
                            </label>
                            <button type="submit" onClick={::this.handleSubmit}> пошел в мгаз закупился</button>
                        </form>
                    </div>
                </div>;
    }
}

function mapStateToProps(store) {
    return {}
}

export default connect(mapStateToProps)(ProjectCreateForm)