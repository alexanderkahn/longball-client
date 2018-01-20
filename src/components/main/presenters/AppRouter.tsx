import * as React from 'react';
import SignInContainer from '../containers/SignInContainer';
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageViewWrapper from '../../manage/shared/presenters/ManagementViewRouter';
import { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import LoadingUserPage from './LoadingUserPage';
import { AuthToken } from '../../../reducers/resource/authToken';

export interface AppRouterProps {
    token: AuthToken;
}

export default class AppRouter extends Component<AppRouterProps> {
    render() {
        // TODO: this control flow is weird. Once we're getting the user from the server let's make this better
        if (!this.props.token.isValid) {
            if (this.props.token.isFetching) {
                return <LoadingUserPage/>;
            } else {
                return <SignInContainer/>;
            }
        } else {
            return (
                <div className="app-body">
                    <HeaderContainer/>
                    <Main/>
                </div>
            );
        }
    }
}

function Main() {
    return (
        <Switch>
            <Route path="/manage" component={ManageViewWrapper}/>
            <Redirect from="/" to="/manage/leagues"/>
        </Switch>
    );
}