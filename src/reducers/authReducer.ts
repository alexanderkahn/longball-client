import { AuthAction, AuthActionTypeKeys } from '../actions/authActions';
import { FetchingState, ResourceCache, toFetchedCache } from './resource/cache';
import { User } from './resource/user';
import { AuthToken } from './resource/authToken';

export interface AuthState {
    token: AuthToken;
    currentUser: ResourceCache<string, User>;
}

const initialState: AuthState = {
    token: {
        isFetching: FetchingState.NOT_FETCHED,
        isValid: false
    },
    currentUser: {
        id: 'current',
        fetchingState: FetchingState.NOT_FETCHED
    }
};

export const auth = (state: AuthState = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionTypeKeys.RECEIVE_AUTHENTICATION:
            return {
                token: {
                    isValid: action.isValid,
                    isFetching: FetchingState.FETCHED
                },
                currentUser: initialState.currentUser
            };
        case AuthActionTypeKeys.REQUEST_AUTHENTICATION:
            return {
                token: {
                    isFetching: FetchingState.FETCHING,
                    isValid: false
                },
                currentUser: initialState.currentUser
            };
        case AuthActionTypeKeys.CLEAR_AUTHENTICATION:
            return initialState;
        case AuthActionTypeKeys.REQUEST_CURRENT_USER:
            return {
                token: state.token,
                currentUser: {
                    id: initialState.currentUser.id,
                    fetchingState: FetchingState.FETCHING
                }
            };
        case AuthActionTypeKeys.RECEIVE_CURRENT_USER: {
            return {
                token: state.token,
                currentUser: toFetchedCache(initialState.currentUser.id, action.user)
            };
        }
        default:
            return state;
    }
};