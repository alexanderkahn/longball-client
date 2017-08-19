import React, {Component} from 'react';
import UserSessionControl from './UserSessionControl'
import logo from './logo.svg';
import './App.css';

class LongballApp extends Component {
    render() {
        return (
            <Header />
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

export default LongballApp;
