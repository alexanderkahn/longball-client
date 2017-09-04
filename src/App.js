import React, {Component} from 'react';
import Header from './components/Header'
import reducers from './reducers/index'
import './App.css';
import 'typeface-roboto'
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {Redirect, Route, Switch} from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory'
import {ConnectedRouter, routerMiddleware, routerReducer} from "react-router-redux";
import ManageViewWrapper from "./components/ManageViewWrapper"
import {attemptVerifyAuthentication} from "./actions/user";

const history = createBrowserHistory();
const reactRouterMiddleware = routerMiddleware(history);

let store = createStore(
    combineReducers({
        ...reducers,
        routerReducer,
    }),
    applyMiddleware(
        thunkMiddleware,
        reactRouterMiddleware
    ));

store.dispatch(attemptVerifyAuthentication());

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <App/>
                </ConnectedRouter>
            </Provider>
        );
    }
}

function App() {
    return (
        <div className="app-body">
            <Header/>
            <Main/>
        </div>
    );
}

function Main() {
    return (
        <Switch>
            <Route path="/manage" component={ManageViewWrapper}/>
            <Redirect from="/" to="/manage/teams"/>
        </Switch>
    );
}

export default Root;
