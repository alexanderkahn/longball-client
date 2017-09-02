import React, {Component} from 'react';
import Header from './components/Header'
import reducers from './reducers/index'
import './App.css';
import 'typeface-roboto'
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import ManageTeamsContainer from "./components/containers/ManageTeamsContainer";
import ManagePlayersContainer from "./components/containers/ManagePlayersContainer";
import {Redirect, Route, Switch} from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory'
import {ConnectedRouter, routerMiddleware, routerReducer} from "react-router-redux";
import TeamDetailContainer from "./components/containers/TeamDetailContainer";
import PlayerDetailContainer from "./components/containers/PlayerDetailContainer";

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
    console.info("rendering main");
    return (
        <Switch>
            <Route path="/manage" component={ManagementNavWrapper}/>
            <Redirect from="/" to="/manage/teams"/>
        </Switch>
    );
}

function ManagementNavWrapper({match}) {
    console.info(match);
    return (
        <div>
            <div>Navigation toolbar will go here</div>
            <Switch>
                <Route exact path={`${match.url}/teams`} component={ManageTeamsContainer}/>
                <Route path={`${match.url}/teams/:teamId`} component={TeamDetailContainer}/>
                <Route exact path={`${match.url}/players`} component={ManagePlayersContainer}/>
                <Route path={`${match.url}/players/:playerId`} component={PlayerDetailContainer}/>
            </Switch>

        </div>
    )
}

export default Root;
