import React, {Component} from 'react';
import Header from './components/Header'
import rootReducer from './reducers/index'
import './App.css';
import 'typeface-roboto'
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {fetchTeams} from "./actions/teams";
import {fetchPlayers} from "./actions/players";
import ManageTeamsContainer from "./components/containers/ManageTeamsContainer";
import ManagePlayersContainer from "./components/containers/ManagePlayersContainer";
import {BrowserRouter, Route, Switch} from "react-router-dom";

let store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware
    ));

store.dispatch(fetchTeams(0));
store.dispatch(fetchPlayers(0));

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
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
          <Route exact path='/teams' component={ManageTeamsContainer}/>
          <Route exact path='/players' component={ManagePlayersContainer}/>
      </Switch>
    );
}

export default Root;
