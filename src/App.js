import React, {Component} from 'react';
import reducers from './reducers/index'
import './App.css';
import 'typeface-roboto'
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {attemptVerifyAuthentication, getSessionUser, receiveAuthentication} from "./actions/auth"; //TODO could probably move this to didMount on AppRouter
import AppRouterContainer from "./components/containers/AppRouterContainer";
import {BrowserRouter} from "react-router-dom";

let store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware,
    ));

if (!store.getState().auth.user) {
    const sessionUser = getSessionUser();
    if (sessionUser) {
        store.dispatch(receiveAuthentication(sessionUser))
    } else {
        store.dispatch(attemptVerifyAuthentication());
    }
}

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <AppRouterContainer/>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default Root;
