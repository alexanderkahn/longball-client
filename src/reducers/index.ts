import { auth, AuthState } from './auth';
import { resource, ResourceState } from './resource/index';
import { combineReducers, Reducer } from 'redux';
import { easterEgg, EasterEggState } from './easterEgg';
import { routerReducer } from 'react-router-redux';

export interface RootState {
    auth: AuthState;
    resource: ResourceState;
    easterEgg: EasterEggState;
}

const reducers: Reducer<RootState> = combineReducers({
    auth,
    resource,
    easterEgg,
    routing: routerReducer,
});

export default reducers;