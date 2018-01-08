import { combineReducers, Reducer } from 'redux';
import { List, Map as ImmutableMap } from 'immutable';
import { FetchedState, League, Person, ResourceObject, ResourceType, RosterPosition, Team } from '../../models/models';
import { ResourceActionType, ResourceObjectAction } from '../../actions/resource';
import { PageDescriptor, PageResult } from './page';

export interface ResourceState {
    readonly leagues: ResourceObjectState<League>;
    readonly teams: ResourceObjectState<Team>;
    readonly people: ResourceObjectState<Person>;
    readonly rosterPositions: ResourceObjectState<RosterPosition>;
}

export class ResourceCache<T> {
    readonly fetchingState: FetchedState.FETCHING | FetchedState.FETCHED;
    readonly object: T | null;

    constructor(object?: T) {
        this.fetchingState = object ? FetchedState.FETCHED : FetchedState.FETCHING;
        this.object = object ? object : null;
    }
}

export class ResourceObjectState<T extends ResourceObject> {
    readonly pages: ImmutableMap<PageDescriptor, ResourceCache<PageResult>>;
    readonly data: ImmutableMap<string, ResourceCache<T>>;

    constructor(pages: ImmutableMap<PageDescriptor, ResourceCache<PageResult>>,
                data: ImmutableMap<string, ResourceCache<T>>,) {
        this.pages = pages;
        this.data = data;
    }

    getNonNullPageItems(page: PageDescriptor): Array<T> {
        const pageResult = this.pages.get(page);
        if (!pageResult || !pageResult.object) {
            return Array();
        } else {
            const ids = pageResult.object.itemIds;
            const objects = Array<T>();
            for (const id of ids.toArray()) {
                const record = this.data.get(id);
                if (record !== null && record.object !== null) {
                    objects.push(record.object as T);
                }
            }
            return objects;
        }
    }
}

export function initialState<T extends ResourceObject>(): ResourceObjectState<T> {
    return new ResourceObjectState<T>(ImmutableMap(), ImmutableMap());
}

const resourceReducerBuilder = <T extends ResourceObject>(typeFilter: ResourceType) =>
    (state: ResourceObjectState<T> = initialState(), action: ResourceObjectAction<T>): ResourceObjectState<T> => {
        if (action.resourceType !== typeFilter) {
            return state;
        }

        switch (action.type) {
            case ResourceActionType.REQUEST_RESOURCE_OBJECT:
                return new ResourceObjectState(
                    state.pages,
                    state.data.set(action.id, new ResourceCache())
                );
            case ResourceActionType.REQUEST_RESOURCE_PAGE:
                return new ResourceObjectState(
                    state.pages.set(action.page, new ResourceCache()),
                    state.data
                );
            case ResourceActionType.RECEIVE_RESOURCE_OBJECT:
                const resourceCache = new ResourceCache(action.data.resource);
                return new ResourceObjectState(
                    state.pages,
                    state.data.set(action.data.id, resourceCache)
                );
            case ResourceActionType.RECEIVE_RESOURCE_PAGE:
                return new ResourceObjectState(
                    state.pages.set(action.page, new ResourceCache({
                        descriptor: action.page,
                        meta: action.meta,
                        itemIds: List(action.data.keys())
                    })),
                    state.data.merge(action.data.map(it => new ResourceCache(it)))
                );
            case ResourceActionType.REMOVE_RESOURCE_OBJECT:
                return new ResourceObjectState(
                    state.pages,
                    state.data.set(action.removed, new ResourceCache())
                );
            default:
                return state;
        }
    };

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