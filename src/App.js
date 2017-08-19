import React, {Component} from 'react';
import _ from 'lodash' //TODO: this is overkill. Best practice is to import only the functions you need. babel-plugin-lodash might help?
import UserSessionControl from './UserSessionControl'
import logo from './logo.svg';
import './App.css';

class LongballApp extends Component {
    render() {
        return (
            <div className="app-root">
                <Header />
                <AppBody />
            </div>
        );
    }
}

function Header() {
    return (
        <div className="longball-app">
            <div className="app-header">
                <img src={logo} className="app-logo" alt="logo"/>
                <h2 className="app-title">Longball</h2>
                <UserSessionControl />
            </div>
        </div>
    );
}

function AppBody() {
    return (
        <div className="app-body">
            <div className="section-title">A list of numbers for your enjoyment</div>
            <NumberList />
        </div>
    );
}

function NumberList() {
    const numbers = _.range(1, 20);
    const numberList = numbers.map(number => <li key={number}>{number}</li>);
    return <ul>{numberList}</ul>
}

export default LongballApp;
