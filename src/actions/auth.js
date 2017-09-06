export const RECEIVE_AUTHENTICATION = 'RECEIVE_AUTHENTICATION';
export function receiveAuthentication(user) {
    return {
        type: RECEIVE_AUTHENTICATION,
        auth: {
            user
        }
    }
}