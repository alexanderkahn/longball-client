import * as React from 'react';
import SignInContainer from '../containers/SignInContainer';
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageViewWrapper from '../../manage/shared/presenters/ManagementViewRouter';
import { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import LoadingUserPage from './LoadingUserPage';
import { AuthToken } from '../../../reducers/resource/authToken';
import { FetchingState } from '../../../reducers/resource/cache';

export interface AppRouterProps {
    token: AuthToken;
}

export default class AppRouter extends Component<AppRouterProps> {
    render() {
        if (this.props.token.isValid) {
            return (
                <div className="app-body">
                    <HeaderContainer/>
                    <Main/>
                </div>
            );
        } else if (this.props.token.isFetching === FetchingState.FETCHING) {
            return <LoadingUserPage/>;
        } else {
            return <SignInContainer/>;
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