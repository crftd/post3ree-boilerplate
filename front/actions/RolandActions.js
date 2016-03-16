import request from 'superagent';

const serverUrl = '';
const projectsUrl = `${serverUrl}/api/v1/projects`;

export const ADD_PROJECT_REQUEST = 'ADD_PROJECT_REQUEST';
export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS';
export const ADD_PROJECT_FAIL = 'ADD_PROJECT_FAIL';

export const LIST_PROJECT_REQUEST = 'LIST_PROJECT_REQUEST';
export const LIST_PROJECT_SUCCESS = 'LIST_PROJECT_SUCCESS';
export const LIST_PROJECT_FAIL = 'LIST_PROJECT_FAIL';

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
        project
    };
}

export function addProjectFailure(error, project) {
    return {
        type: ADD_PROJECT_FAIL,
        project, error
    }
}

export function addProjectSuccess(project) {
    return {
        type: ADD_PROJECT_SUCCESS,
        project
    }
}

///

export function listProjects() {
    return dispatch => {
        dispatch(listProjectsRequest());

        return request
            .get(projectsUrl)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    dispatch(listProjectsFailure(err));
                } else {
                    dispatch(listProjectsSuccess(res.body));
                }
            });
    };
}

export function listProjectsRequest() {
    return { type: LIST_PROJECT_REQUEST }
}

export function listProjectsFailure(error) {
    return {
        type: LIST_PROJECT_FAIL,
        error
    }
}

export function listProjectsSuccess(listProjects) {
    return {
        type: LIST_PROJECT_SUCCESS,
        listProjects
    }
}
