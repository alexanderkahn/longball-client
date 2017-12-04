import { auth, AuthState } from './auth';
import { data, DataState } from './data/index';
import { combineReducers, Reducer } from 'redux';
import { easterEgg, EasterEggState } from './easterEgg';
import { routerReducer } from 'react-router-redux';

export interface RootState {
    auth: AuthState;
    data: DataState;
    easterEgg: EasterEggState;
}

const reducers: Reducer<RootState> = combineReducers({
    auth,
    data,
    easterEgg,
    routing: routerReducer,
});

export default reducers;