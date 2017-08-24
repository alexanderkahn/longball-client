import React, {Component} from 'react';
import LongballAppBar from './components/LongballAppBar'
import longballStore from './reducers/index'
import './App.css';
import 'typeface-roboto'
import {Provider} from "react-redux";
import NumbersManagementList from "./components/containers/NumbersManagementList";
import {createStore} from "redux";

let store = createStore(longballStore);

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
            <NumbersManagementList title="List 'o numbers"/>
        </div>
    );
}

export default LongballApp;
