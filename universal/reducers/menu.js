/**
 * Created by hex22a on 06.04.16.
 */

import { UPDATE_LOCATION } from 'redux-simple-router';


const mapURI2Menu = ['/', '/sign-in'];

function menuItem(state = 0, action) {
    if (action.type === UPDATE_LOCATION) {
        if (mapURI2Menu.indexOf(action.payload.pathname) > -1) {
            return mapURI2Menu.indexOf(action.payload.pathname);
        }
        return 1;
    }
    return state;
}

export default { menuItem };