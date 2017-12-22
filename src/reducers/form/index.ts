import { leagueForm, LeagueFormState } from './leagueForm';
import { combineReducers, Reducer } from 'redux';

export interface FormState {
    league: LeagueFormState;
}

export const form: Reducer<FormState> = combineReducers({
    league: leagueForm
});