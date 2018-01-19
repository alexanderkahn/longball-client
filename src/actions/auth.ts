export enum AuthActionTypeKeys {
    RECEIVE_AUTHENTICATION = 'RECEIVE_AUTHENTICATION',
    TRY_RESOLVE_AUTHENTICATION = 'TRY_RESOLVE_AUTHENTICATION'
}

export type AuthAction =
    | ReceiveAuthenticationAction
    | TryResolveAuthenticationAction;

interface ReceiveAuthenticationAction {
    type: AuthActionTypeKeys.RECEIVE_AUTHENTICATION;
    authenticated: boolean;
}

export function receiveAuthentication(authenticated: boolean): ReceiveAuthenticationAction {
    return {
        type: AuthActionTypeKeys.RECEIVE_AUTHENTICATION,
        authenticated
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