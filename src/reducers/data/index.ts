import { teams } from './teams';
import { people } from './people';
import { rosterPositions } from './rosterPositions';
import { leagues } from './leagues';
import { combineReducers, Reducer } from 'redux';
import { League, Person, ResourceObject, RosterPosition, Team } from '../../models/models';

export interface DataState {
    leagues: Map<string, League>;
    teams: Map<string, Team>;
    people: Map<string, Person>;
    rosterPositions: Map<string, RosterPosition>;
}

export const data: Reducer<DataState> = combineReducers<DataState>({
    leagues,
    teams,
    people,
    rosterPositions,
});

export function toMap<T extends ResourceObject>(existingState: Map<string, T>, newObjects: Array<T>): Map<string, T> {
    let newObjectMap = new Map();
    newObjects.forEach((object => newObjectMap.set(object.id, object)));
    return new Map([...existingState, ...newObjectMap]);
}