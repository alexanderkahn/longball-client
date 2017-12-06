import { combineReducers, Reducer } from 'redux';
import { List, Map } from 'immutable';
import { FetchedState, League, Person, ResourceObject, ResourceType, RosterPosition, Team } from '../../models/models';
import { isNullOrUndefined } from 'util';
import { CollectionPage } from '../../actions/rest';
import { ResourceActionType, ResourceObjectAction } from '../../actions/resource/index';

export interface ResourceState {
    readonly leagues: ResourceObjectState<League>;
    readonly teams: ResourceObjectState<Team>;
    readonly people: ResourceObjectState<Person>;
    readonly rosterPositions: ResourceObjectState<RosterPosition>;
}

export class ResourceObjectCache<T> {
    readonly fetchingState: FetchedState.FETCHING | FetchedState.FETCHED;
    readonly object: T | null;

    constructor(fetchingState: FetchedState.FETCHING | FetchedState.FETCHED, object?: T) {
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

export function initialState<T extends ResourceObject>(): ResourceObjectState<T> {
    return {
        data: Map(),
        pageInfo: {
            totalPages: 1,
            pages: Map()
        }
    };
}

const resourceReducerBuilder = <T extends ResourceObject>(typeFilter: ResourceType) =>
    (state: ResourceObjectState<T> = initialState(), action: ResourceObjectAction<T>): ResourceObjectState<T> => {
        if (action.resourceType !== typeFilter) {
            return state;
        }

        switch (action.type) {
            case ResourceActionType.REQUEST_RESOURCE_OBJECT:
                return {
                    ...state,
                    data: state.data.set(action.id, new ResourceObjectCache(FetchedState.FETCHING))
                };
            case ResourceActionType.REQUEST_RESOURCE_PAGE:
                return {
                    ...state,
                    pageInfo: {
                        ...state.pageInfo,
                        pages: state.pageInfo.pages.set(action.page, new ResourceObjectCache(FetchedState.FETCHING))
                    }
                };
            case ResourceActionType.RECEIVE_RESOURCE_OBJECT:
                return {
                    ...state,
                    data: state.data.set(action.data.id,
                                         new ResourceObjectCache(FetchedState.FETCHED, action.data.resource))
                };
            case ResourceActionType.RECEIVE_RESOURCE_PAGE:
                return {
                    ...state,
                    pageInfo: mergePages(List(action.data.keys()), state.pageInfo, action.page),
                    data: state.data.merge(action.data.map(it => new ResourceObjectCache(FetchedState.FETCHED, it)))
                };
            case ResourceActionType.REMOVE_RESOURCE_OBJECT:
                return {
                    ...state,
                    data: state.data.set(action.removed, new ResourceObjectCache(FetchedState.FETCHED))
                };
            default:
                return state;
        }
    };

export function mergePages(responseObjectIds: List<string>, state: PageInfo, actionPage?: CollectionPage): PageInfo {
    if (isNullOrUndefined(actionPage)) {
        return state;
    } else {
        return {
            ...state,
            totalPages: actionPage.totalPages,
            pages: state.pages.set(actionPage.number, new ResourceObjectCache(FetchedState.FETCHED, responseObjectIds))
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

const leagues = resourceReducerBuilder<League>('leagues');
const teams = resourceReducerBuilder<Team>('teams');
const people = resourceReducerBuilder<Person>('people');
const rosterPositions = resourceReducerBuilder<RosterPosition>('rosterpositions');

export const resource: Reducer<ResourceState> = combineReducers<ResourceState>({
    leagues,
    teams,
    people,
    rosterPositions,
});