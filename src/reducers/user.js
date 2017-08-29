import {LOG_IN, LOG_OUT} from "../actions/user";

export const user = (state = null, action) => {
    switch (action.type) {
        case LOG_IN:
            return {first: 'Keith', last: 'Fudge'};
        case LOG_OUT:
            return null;
        default:
            return state;
    }
};