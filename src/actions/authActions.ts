import { User } from '../reducers/resource/user';

export enum AuthActionTypeKeys {
    RECEIVE_AUTHENTICATION = 'RECEIVE_AUTHENTICATION',
    REQUEST_AUTHENTICATION = 'REQUEST_AUTHENTICATION',
    CLEAR_AUTHENTICATION = 'CLEAR_AUTHENTICATION',
    REQUEST_CURRENT_USER = 'REQUEST_CURRENT_USER',
    RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
}

export type AuthAction =
    | RequestAuthenticationAction
    | ReceiveAuthenticationAction
    | ClearAuthenticationAction
    | RequestCurrentUserAction
    | ReceiveCurrentUserAction;

interface RequestAuthenticationAction {
    type: AuthActionTypeKeys.REQUEST_AUTHENTICATION;
}

interface ReceiveAuthenticationAction {
    type: AuthActionTypeKeys.RECEIVE_AUTHENTICATION;
    isValid: boolean;
}

interface ClearAuthenticationAction {
    type: AuthActionTypeKeys.CLEAR_AUTHENTICATION;
}

interface RequestCurrentUserAction {
    type: AuthActionTypeKeys.REQUEST_CURRENT_USER;
}

interface ReceiveCurrentUserAction {
    type: AuthActionTypeKeys.RECEIVE_CURRENT_USER;
    user: User | null;
}

export function requestAuthentication(): RequestAuthenticationAction {
    return {
        type: AuthActionTypeKeys.REQUEST_AUTHENTICATION
    };
}

export function receiveAuthentication(authenticated: boolean): ReceiveAuthenticationAction {
    return {
        type: AuthActionTypeKeys.RECEIVE_AUTHENTICATION,
        isValid: authenticated
    };
}

export function clearAuthentication(): ClearAuthenticationAction {
    return {
        type: AuthActionTypeKeys.CLEAR_AUTHENTICATION
    };
}

export function requestCurrentUser(): RequestCurrentUserAction {
    return {
        type: AuthActionTypeKeys.REQUEST_CURRENT_USER
    };
}

export function receiveCurrentUser(user: User | null): ReceiveCurrentUserAction {
    return {
        type: AuthActionTypeKeys.RECEIVE_CURRENT_USER,
        user
    };
}
