import * as React from 'react';
import { Component } from 'react';
import reducers from './reducers/index';
import './App.css';
import 'typeface-roboto';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import AppRouterContainer from './components/main/containers/AppRouterContainer';
import { watchForAuthChanges } from './actions/session';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();
const store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware,
        routerMiddleware(history),
    ));
store.dispatch(watchForAuthChanges());

class Root extends Component<{}> {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <AppRouterContainer/>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default Root;
