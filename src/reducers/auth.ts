import { AuthAction, AuthActionTypeKeys } from '../actions/auth';
import { User } from '../models/models';

export interface AuthState {
    isFetching: boolean;
    user: User | null;
}

const initialState = { isFetching: false, user: null};

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