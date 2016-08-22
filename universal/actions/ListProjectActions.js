/**
 * Created by hex22a on 16.03.16.
 */
import request from 'superagent';

import {
    projectsUrl,
    LIST_PROJECT_FAIL,
    LIST_PROJECT_REQUEST,
    LIST_PROJECT_SUCCESS,
} from './constants';

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
    return { type: LIST_PROJECT_REQUEST };
}

export function listProjectsFailure(error) {
    return {
        type: LIST_PROJECT_FAIL,
        error,
    };
}

export function listProjectsSuccess(listProjects) {
    return {
        type: LIST_PROJECT_SUCCESS,
        listProjects,
    };
}