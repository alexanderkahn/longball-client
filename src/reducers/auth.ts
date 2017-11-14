import { AuthAction, AuthActionTypeKeys } from '../actions/auth';

export interface AuthState {
    isFetching: boolean;
    user?: any;
}

const initialState = { isFetching: false};

export const auth = (state: AuthState = initialState, action: AuthAction): AuthState => {
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