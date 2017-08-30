import React, {Component} from 'react';
import LongballAppBar from './components/LongballAppBar'
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

let store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware
    ));

store.dispatch(fetchTeams(0));
store.dispatch(fetchPlayers(0));

class LongballApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppBody/>
            </Provider>
        );
    }
}

function AppBody() {
    return (
        <div className="app-body">
            <LongballAppBar/>
            <ManageTeamsContainer/>
            <ManagePlayersContainer/>
        </div>
    );
}

export default LongballApp;
