import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/constants'

const auth = (state = {
    isAuthenticated: false,
    payload: {
        sub: '',
        role: ''
    }
}, action) => {
    switch (action.type) {
    case LOGIN_SUCCESS:
        return { ...state, isAuthenticated: true, payload: action.payload };

    case LOGOUT_SUCCESS:
        return { ...state, isAuthenticated: false, payload: { sub: '', role: '' } };

    default:
        return state;
    }
};

export default { auth }