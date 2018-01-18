import { auth, AuthState } from './auth';
import { resource, ResourceState } from './resource/resourceReducer';
import { combineReducers, Reducer } from 'redux';
import { easterEgg, EasterEggState } from './easterEgg';
import { routerReducer } from 'react-router-redux';
import { form, FormState } from './form/formReducer';

export interface RootState {
    auth: AuthState;
    resource: ResourceState;
    form: FormState;
    easterEgg: EasterEggState;
}

const reducers: Reducer<RootState> = combineReducers({
    auth,
    resource,
    form,
    easterEgg,
    routing: routerReducer,
});

export default reducers;