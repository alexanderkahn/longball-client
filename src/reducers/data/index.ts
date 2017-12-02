import { teams } from './teams';
import { people } from './people';
import { rosterPositions } from './rosterPositions';
import { leagues } from './leagues';
import { combineReducers, Reducer } from 'redux';
import { List, Map } from 'immutable';
import { League, Person, ResourceObject, RosterPosition, Team } from '../../models/models';
import { isNullOrUndefined } from 'util';
import { CollectionPage } from '../../actions/rest';

export interface DataState {
    readonly leagues: ResourceObjectState<League>;
    readonly teams: ResourceObjectState<Team>;
    readonly people: ResourceObjectState<Person>;
    readonly rosterPositions: ResourceObjectState<RosterPosition>;
}

export interface PageInfo {
    totalPages: number;
    pages: Map<number, List<string>>;
}

export interface ResourceObjectState<T extends ResourceObject> {
    readonly data: Map<string, T>;
    readonly pageInfo: PageInfo;
}

export function initialState<T extends ResourceObject>(): ResourceObjectState<T>  {
    return {
        data: Map(),
        pageInfo: {
            totalPages: 1,
            pages: Map()
        }
    };
}

export function mergePages(responseObjectIds: List<string>, state: PageInfo, actionPage?: CollectionPage): PageInfo {
    if (isNullOrUndefined(actionPage)) {
        return state;
    } else {
        return {
            ...state,
            totalPages: actionPage.totalPages,
            pages: state.pages.set(actionPage.number, responseObjectIds)
        };
    }
}

export const data: Reducer<DataState> = combineReducers<DataState>({
    leagues,
    teams,
    people,
    rosterPositions,
});