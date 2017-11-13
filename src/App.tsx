import * as React from 'react';
import { Component } from 'react';
import reducers from './reducers/index';
import './App.css';
import 'typeface-roboto';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import AppRouterContainer from './components/main/containers/AppRouterContainer';
import { BrowserRouter } from 'react-router-dom';
import { watchForAuthChanges } from './actions/session';

let store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware,
    ));

store.dispatch(watchForAuthChanges());

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <AppRouterContainer/>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default Root;
