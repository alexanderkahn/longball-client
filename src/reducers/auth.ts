import { AuthAction, AuthActionTypeKeys } from '../actions/auth';
import { FetchingState } from './resource/cache';

export interface AuthState {
    isFetching: FetchingState;
    authenticated: boolean;
}

const initialState = { isFetching: FetchingState.NOT_FETCHED, authenticated: false};

export const auth = (state: AuthState = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionTypeKeys.RECEIVE_AUTHENTICATION:
            return {
                authenticated: action.authenticated,
                isFetching: FetchingState.FETCHED
            };
        case AuthActionTypeKeys.TRY_RESOLVE_AUTHENTICATION:
            return {
                isFetching: FetchingState.FETCHING,
                authenticated: false
            };
        default:
            return state;
    }
};