import firebase from 'firebase'

export const RECEIVE_AUTHENTICATION = 'RECEIVE_AUTHENTICATION';
export function receiveAuthentication(user) {
    return {
        type: RECEIVE_AUTHENTICATION,
        auth: {
            user
        }
    }
}

const config = {
    apiKey: "AIzaSyDKd4LVFbOySsyC3a4fyps7klanKMH34jc",
    authDomain: "longball-7517e.firebaseapp.com",
    databaseURL: "https://longball-7517e.firebaseio.com",
    projectId: "longball-7517e",
    storageBucket: "longball-7517e.appspot.com",
    messagingSenderId: "801909287418"
};

firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/plus.login');


export function redirectToAuthenticationProvider() {
    return function (dispatch) {
        return firebase.auth().signInWithRedirect(provider)
    }
}

//TODO: these three are not really actions in that they don't modify store. Maybe split into some kind of session manager module.
const LONGBALL_AUTH = 'longballAuth';
function storeAuthSession(auth) {
    localStorage.setItem(LONGBALL_AUTH, JSON.stringify(auth));
}

export function getSessionUser() {
    const auth = localStorage.getItem(LONGBALL_AUTH);

    if (auth && auth !== '') {
        try {
            return JSON.parse(auth).user;
        } catch (e) {
            console.warn("Error parsing stored session: " + e);
            return null;
        }
    } else {
        return null;
    }
}

export function attemptVerifyAuthentication() {
    return function (dispatch) {
        if (!firebase.auth().currentUser)
            firebase.auth().getRedirectResult().then(
                result => {
                    if (result.credential) {
                        storeAuthSession({
                            user: result.additionalUserInfo.profile,
                            credential: result.credential
                        });
                        dispatch(receiveAuthentication(result.additionalUserInfo.profile));
                    }
                }, error => console.warn(error)
            )
    }
}