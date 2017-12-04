import { teams } from './teams';
import { people } from './people';
import { rosterPositions } from './rosterPositions';
import { leagues } from './leagues';
import { combineReducers, Reducer } from 'redux';
import { List, Map } from 'immutable';
import { FetchingState, League, Person, ResourceObject, RosterPosition, Team } from '../../models/models';
import { isNullOrUndefined } from 'util';
import { CollectionPage } from '../../actions/rest';

export interface DataState {
    readonly leagues: ResourceObjectState<League>;
    readonly teams: ResourceObjectState<Team>;
    readonly people: ResourceObjectState<Person>;
    readonly rosterPositions: ResourceObjectState<RosterPosition>;
}

export class ResourceObjectCache<T> {
    readonly fetchingState: FetchingState.FETCHING | FetchingState.FETCHED;
    readonly object: T | null;
    constructor (fetchingState: FetchingState.FETCHING | FetchingState.FETCHED, object?: T) {
        this.fetchingState = fetchingState;
        this.object = object ? object : null;
    }
}

export interface PageInfo {
    totalPages: number;
    pages: Map<number, ResourceObjectCache<List<string>>>;
}

export interface ResourceObjectState<T extends ResourceObject> {
    readonly data: Map<string, ResourceObjectCache<T>>;
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
            pages: state.pages.set(actionPage.number, new ResourceObjectCache(FetchingState.FETCHED, responseObjectIds))
        };
    }
}

export function getObjectsForPage<T extends ResourceObject>(state: ResourceObjectState<T>, page: number): Array<T> {
    if (!state.pageInfo.pages.has(page)) {
        return Array();
    } else {
        const ids = state.pageInfo.pages.get(page);
        if (!ids || !ids.object) {
            return Array();
        }
        const objects = Array<T>();
        for (const id of ids.object.toArray()) {
            const object = state.data.get(id);
            if (object !== null) {
                objects.push(object.object as T);
            }
        }
        return objects;
    }
}

export const data: Reducer<DataState> = combineReducers<DataState>({
    leagues,
    teams,
    people,
    rosterPositions,
});