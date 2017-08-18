import React, {Component} from 'react';
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
                <User />
            </div>
        </div>
    );
}

function User() {
    const isLoggedIn = true;
    if (isLoggedIn) {
        return <AuthenticatedUser />
    } else {
        return <AnonymousUser />
    }
}

function AuthenticatedUser() {
    return <span className="header-user">Hey, dude!</span>
}

function AnonymousUser() {
    return <span classID="header-user"><a href="">Sign in</a></span>
}

export default LongballApp;
