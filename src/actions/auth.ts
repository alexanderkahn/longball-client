import { User } from '../models/models';

export enum AuthActionTypeKeys {
    RECEIVE_AUTHENTICATION = 'RECEIVE_AUTHENTICATION',
    TRY_RESOLVE_AUTHENTICATION = 'TRY_RESOLVE_AUTHENTICATION'
}

export type AuthAction =
    | ReceiveAuthenticationAction
    | TryResolveAuthenticationAction;

interface ReceiveAuthenticationAction {
    type: AuthActionTypeKeys.RECEIVE_AUTHENTICATION;
    user: User | null;
}

export function receiveAuthentication(user: User | null): ReceiveAuthenticationAction {
    return {
        type: AuthActionTypeKeys.RECEIVE_AUTHENTICATION,
        user
    };
}

interface TryResolveAuthenticationAction {
    type: AuthActionTypeKeys.TRY_RESOLVE_AUTHENTICATION;
}

export function tryResolveAuthentication(): TryResolveAuthenticationAction {
    return {
        type: AuthActionTypeKeys.TRY_RESOLVE_AUTHENTICATION
    };
}