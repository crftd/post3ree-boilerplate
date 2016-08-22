/**
 * Created by nemaeska on 03.03.16.
 */
import { LIST_PROJECT_SUCCESS } from '../actions/constants';

function listProjects(state = [{}], action) {
    switch (action.type) {
    case LIST_PROJECT_SUCCESS:
        return action.listProjects;
    default:
        return state;
    }
}
// For tests
function foo(state = 0) {
    return state;
}

export default { listProjects, foo };