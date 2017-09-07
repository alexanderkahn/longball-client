import {RECEIVE_AUTHENTICATION, TRY_RESOLVE_AUTHENTICATION} from "../actions/auth";

const initialState = { isFetching: false};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_AUTHENTICATION:
            return {
                ...state,
                user: action.user,
                isFetching: false
            };
        case TRY_RESOLVE_AUTHENTICATION:
            return {
                ...state,
                isFetching: true
            };
        default:
            return state;
    }
};