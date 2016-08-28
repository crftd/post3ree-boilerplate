/**
 * Created by hex22a on 06.04.16.
 */

import { LOCATION_CHANGE } from 'react-router-redux';


const mapURI2Menu = ['/', '/sign-in'];

function menuItem(state = 0, action) {
    if (action.type === LOCATION_CHANGE) {
        if (mapURI2Menu.indexOf(action.payload.pathname) > -1) {
            return mapURI2Menu.indexOf(action.payload.pathname);
        }
        return 1;
    }
    return state;
}

export default { menuItem };