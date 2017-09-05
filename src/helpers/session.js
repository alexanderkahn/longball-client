const LONGBALL_AUTH = 'longballAuth';

export function storeAuthSession(auth) {
    localStorage.setItem(LONGBALL_AUTH, JSON.stringify(auth));
}

export function getSessionUser() {
    const auth = getAuthSessionCookie();
    if (auth) {
        return auth.user;
    } else {
        return null;
    }
}

export function getSessionJwtToken() {
    const auth = getAuthSessionCookie();
    console.info(auth);
    if (auth) {
        return auth.credential.idToken;
    } else {
        return null;
    }
}

function getAuthSessionCookie() {
    const auth = localStorage.getItem(LONGBALL_AUTH);

    if (auth && auth !== '') {
        try {
            return JSON.parse(auth);
        } catch (e) {
            console.warn("Error parsing stored session: " + e);
            return null;
        }
    } else {
        return null;
    }
}