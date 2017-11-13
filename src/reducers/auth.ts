import {AuthAction, AuthActionTypeKeys} from "../actions/auth";

const initialState = { isFetching: false};

export const auth = (state = initialState, action: AuthAction): any => {
    switch (action.type) {
        case AuthActionTypeKeys.RECEIVE_AUTHENTICATION:
            return {
                ...state,
                user: action.user,
                isFetching: false
            };
        case AuthActionTypeKeys.TRY_RESOLVE_AUTHENTICATION:
            return {
                ...state,
                isFetching: true
            };
        default:
            return state;
    }
};