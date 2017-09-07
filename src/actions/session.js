import firebase from 'firebase'
import {receiveAuthentication, tryResolveAuthentication} from "./auth";

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

export function watchForAuthChanges() {
    return function (dispatch) {
        dispatch(attemptVerifyAuthentication()); //TODO: this should not happen on every request
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                dispatch(receiveAuthentication({name: user.displayName}))
            } else {
                dispatch(receiveAuthentication(null));
            }
        })
    }
}

export function redirectToAuthenticationProvider() {
    return function (dispatch) {
        return firebase.auth().signInWithRedirect(provider)
    }
}

export function attemptVerifyAuthentication() {
    return function (dispatch) {
        if (!firebase.auth().currentUser) {
            dispatch(tryResolveAuthentication());
            firebase.auth().getRedirectResult();
            //watchForAuthChanges() will handle the state change
        }
    }
}

export function getIdTokenPromise() {
    return firebase.auth().currentUser.getIdToken();
}
