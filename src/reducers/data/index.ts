import { teams, TeamsState } from './teams';
import { people, PeopleState } from './people';
import { rosterPositions, RosterPositionsState } from './rosterPositions';
import { leagues, LeaguesState } from './leagues';
import { combineReducers, Reducer } from 'redux';

export interface DataState {
    readonly leagues: LeaguesState;
    readonly teams: TeamsState;
    readonly people: PeopleState;
    readonly rosterPositions: RosterPositionsState;
}

export const data: Reducer<DataState> = combineReducers<DataState>({
    leagues,
    teams,
    people,
    rosterPositions,
});