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
import {Route, Switch} from "react-router-dom";
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
    return (
        <Switch>
            <Route exact path='/' component={ManageTeamsContainer}/>
            <Route path='/teams' component={ManageTeamsRoutes}/>
            <Route path='/players' component={ManagePlayersRoutes}/>
        </Switch>
    );
}

function ManageTeamsRoutes() {
    return (
        <Switch>
            <Route exact path='/teams' component={ManageTeamsContainer}/>
            <Route path="/teams/:teamId" component={TeamDetailContainer}/>
        </Switch>
    )
}

function ManagePlayersRoutes() {
    return (
        <Switch>
            <Route exact path='/players' component={ManagePlayersContainer}/>
            <Route path="/players/:playerId" component={PlayerDetailContainer}/>
        </Switch>
    )
}

export default Root;
