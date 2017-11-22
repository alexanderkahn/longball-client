import { auth, AuthState } from './auth';
import { data, DataState } from './data/index';
import { currentView } from './views/currentView';
import { combineReducers, Reducer } from 'redux';
import { easterEgg, EasterEggState } from './easterEgg';
import { CurrentView } from '../models/models';
import { routerReducer } from 'react-router-redux';

export interface RootState {
    auth: AuthState;
    data: DataState;
    currentView: CurrentView;
    easterEgg: EasterEggState;
}

const reducers: Reducer<RootState> = combineReducers({
    auth,
    data,
    currentView,
    easterEgg,
    routing: routerReducer,
});

export default reducers;