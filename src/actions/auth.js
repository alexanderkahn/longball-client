export const RECEIVE_AUTHENTICATION = 'RECEIVE_AUTHENTICATION';
export function receiveAuthentication(user) {
    return {
        type: RECEIVE_AUTHENTICATION,
        user
    }
}

export const TRY_RESOLVE_AUTHENTICATION = 'TRY_RESOLVE_AUTHENTICATION';
export function tryResolveAuthentication() {
    return {
        type: TRY_RESOLVE_AUTHENTICATION
    }
}