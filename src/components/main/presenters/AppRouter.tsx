import * as React from "react";
import SignInContainer from "../containers/SignInContainer";
import {Redirect, Route, Switch} from "react-router-dom";
import ManageViewWrapper from "../../manage/shared/presenters/ManagementViewRouter";
import {Component} from "react";
import HeaderContainer from "../containers/HeaderContainer";
import LoadingUserPage from "./LoadingUserPage";
import {User} from "../../../models/models";

export interface AppRouterProps {
    user?: User,
    isFetching: boolean,
}

export default class AppRouter extends Component<AppRouterProps> {
    render() {
        if (!this.props.user) {
            if (this.props.isFetching) {
                return <LoadingUserPage/>
            } else {
                return <SignInContainer/>
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