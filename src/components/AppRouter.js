import React from "react";
import SignInContainer from "./containers/SignInContainer";
import Header from "./Header";
import {Redirect, Route, Switch} from "react-router-dom";
import PropTypes from 'prop-types';
import ManageViewWrapper from "./ManageViewWrapper";
import {Component} from "react";

class AppRouter extends Component {
    render() {
        if (!this.props.user) {
            return <SignInContainer/>
        } else {
            return (
                <div className="app-body">
                    <Header/>
                    <Main/>
                </div>
            );
        }
    }
}

function Main(props) {
    return (
        <Switch>
            <Route path="/manage" component={ManageViewWrapper}/>
            <Redirect from="/" to="/manage/teams"/>
        </Switch>
    );
}

AppRouter
    .propTypes = {
    user: PropTypes.shape(),
};

export default AppRouter