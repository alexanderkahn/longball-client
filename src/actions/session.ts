import { receiveAuthentication, tryResolveAuthentication } from './auth';
import { Dispatch } from 'react-redux';
import * as firebase from 'firebase';
import { User } from 'firebase';
import { RootState } from '../reducers/index';

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

export function watchForAuthChanges(): Dispatch<RootState> {
    return function (dispatch: Dispatch<{}>) {
        dispatch(attemptVerifyAuthentication()); // TODO: this should not happen on every request
        firebase.auth().onAuthStateChanged(function(user: User) {
            if (user && user.displayName) {
                dispatch(receiveAuthentication({name: user.displayName}));
            } else {
                dispatch(receiveAuthentication(null));
            }
        });
    };
}

export function redirectToAuthenticationProvider(): Dispatch<RootState> {
    return function () {
        return firebase.auth().signInWithRedirect(provider);
    };
}

export function attemptVerifyAuthentication(): Dispatch<RootState> {
    return function (dispatch: Dispatch<{}>) {
        if (!firebase.auth().currentUser) {
            dispatch(tryResolveAuthentication());
            firebase.auth().getRedirectResult();
            // watchForAuthChanges() will handle the state change
        }
    };
}

export async function getIdTokenPromise(): Promise<string> {
    let currentUser = firebase.auth().currentUser;
    if (currentUser == null) {
        throw new Error('Unable to get idToken from firebase user');
    }
    return currentUser.getIdToken();
}
