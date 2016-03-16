/**
 * Created by nemaeska on 03.03.16.
 */
import { LIST_PROJECT_FAIL, LIST_PROJECT_SUCCESS, LIST_PROJECT_REQUEST } from '../actions/RolandActions'

function listProjects(state=[{}], action) {
    switch (action.type) {
        case LIST_PROJECT_SUCCESS:
            return action.listProjects;
            break;
        default:
            return state
    }
}

export default { listProjects }