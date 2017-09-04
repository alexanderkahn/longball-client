import firebase from 'firebase'

export const RECEIVE_AUTHENTICATION = 'RECEIVE_AUTHENTICATION';
function receiveAuthentication(auth) {
    return {
        type: RECEIVE_AUTHENTICATION,
        auth
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

export function attemptVerifyAuthentication() {
    return function (dispatch) {
        if (!firebase.auth().currentUser)
            firebase.auth().getRedirectResult().then(
                result => {
                    if (result.credential) {
                        dispatch(receiveAuthentication({
                            user: result.additionalUserInfo.profile,
                            credential: result.credential
                        }));
                    }
                }, error => console.warn(error)
            )
    }
}