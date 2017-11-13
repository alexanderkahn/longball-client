import { receiveAuthentication, tryResolveAuthentication } from './auth';
import { Dispatch } from 'react-redux';
import * as firebase from 'firebase';
import { User } from 'firebase';

const config = {
    apiKey: 'AIzaSyDKd4LVFbOySsyC3a4fyps7klanKMH34jc',
    authDomain: 'longball-7517e.firebaseapp.com',
    databaseURL: 'https://longball-7517e.firebaseio.com',
    projectId: 'longball-7517e',
    storageBucket: 'longball-7517e.appspot.com',
    messagingSenderId: '801909287418'
};

firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/plus.login');

export function watchForAuthChanges(): any {
    return function (dispatch: Dispatch<{}>) {
        dispatch(attemptVerifyAuthentication()); // TODO: this should not happen on every request
        firebase.auth().onAuthStateChanged(function(user: User) {
            if (user) {
                dispatch(receiveAuthentication({name: user.displayName}));
            } else {
                dispatch(receiveAuthentication(null));
            }
        });
    };
}

export function redirectToAuthenticationProvider(): any {
    return function () {
        return firebase.auth().signInWithRedirect(provider);
    };
}

export function attemptVerifyAuthentication(): any {
    return function (dispatch: Dispatch<{}>) {
        if (!firebase.auth().currentUser) {
            dispatch(tryResolveAuthentication());
            firebase.auth().getRedirectResult();
            // watchForAuthChanges() will handle the state change
        }
    };
}

export function getIdTokenPromise(): Promise<any> {
    let currentUser = firebase.auth().currentUser;
    if (currentUser == null) {
        return Promise.resolve();
    }
    return currentUser.getIdToken();
}
