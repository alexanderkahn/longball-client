import {RECEIVE_AUTHENTICATION} from "../actions/user";

export const auth = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_AUTHENTICATION:
            return action.auth;
        default:
            return state;
    }
};