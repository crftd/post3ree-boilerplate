import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/constants'

const auth = (state = {
    isAuthenticated: false,
    role: ''
}, action) => {
    switch (action.type) {
    case LOGIN_SUCCESS:
        return { ...state, isAuthenticated: true, role: action.role };

    case LOGOUT_SUCCESS:
        return { ...state, isAuthenticated: false, role: '' };

    default:
        return state;
    }
};

export default { auth }