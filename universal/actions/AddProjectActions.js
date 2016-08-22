import request from 'superagent';

import {
    ADD_PROJECT_FAIL,
    ADD_PROJECT_REQUEST,
    ADD_PROJECT_SUCCESS,
    projectsUrl,
} from './constants';

export function addProject(project) {
    console.log('Add project', project);
    return dispatch => {
        dispatch(addProjectRequest(project));

        return request
            .post(projectsUrl)
            .send(project)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    dispatch(addProjectFailure(err, project));
                } else {
                    dispatch(addProjectSuccess(res.body));
                }
            });
    };
}

export function addProjectRequest(project) {
    return {
        type: ADD_PROJECT_REQUEST,
        project,
    };
}

export function addProjectFailure(error, project) {
    return {
        type: ADD_PROJECT_FAIL,
        project,
        error,
    };
}

export function addProjectSuccess(project) {
    return {
        type: ADD_PROJECT_SUCCESS,
        project,
    };
}
