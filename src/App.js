import React, {Component} from 'react';
import LongballAppBar from './components/LongballAppBar'
import rootReducer from './reducers/index'
import './App.css';
import 'typeface-roboto'
import {Provider} from "react-redux";
import TeamManagementList from "./components/containers/TeamManagementList";
import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {fetchTeams} from "./actions/teams";

let store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware
    ));

store.dispatch(fetchTeams(0));

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
            <TeamManagementList/>
        </div>
    );
}

export default LongballApp;
