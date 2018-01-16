import { combineReducers, Reducer } from 'redux';
import { List, Map as ImmutableMap } from 'immutable';
import { ResourceActionType, ResourceObjectAction } from '../../actions/resource';
import { PageDescriptor, PageResult } from './page';
import { League } from './league';
import { Team } from './team';
import { Person } from './person';
import { RosterPosition } from './rosterPosition';

export enum FetchingState {
    NOT_FETCHED,
    FETCHING,
    FETCHED
}

export type ResourceType =
    | 'leagues'
    | 'teams'
    | 'rosterpositions'
    | 'people';

export abstract class ResourceObject {
    id: string;
    type: ResourceType;
}

export class RelationshipResource {
    data: ResourceObject;

    constructor(type: ResourceType, id: string) {
        return {
            data: {
                type,
                id
            }
        };
    }
}

export interface ResourceState {
    readonly leagues: ResourceObjectState<League>;
    readonly teams: ResourceObjectState<Team>;
    readonly people: ResourceObjectState<Person>;
    readonly rosterPositions: ResourceObjectState<RosterPosition>;
}

interface UnknownItemCache<K> {
    readonly id: K;
    readonly fetchingState: FetchingState.NOT_FETCHED | FetchingState.FETCHING;
}

interface AbsentItemCache<K> {
    readonly id: K;
    readonly fetchingState: FetchingState.FETCHED;
    readonly object: null;
}

interface PresentItemCache<K, V> {
    readonly id: K;
    readonly fetchingState: FetchingState.FETCHED;
    readonly object: V;
}

export type ResourceCache<K, V> = UnknownItemCache<K> | AbsentItemCache<K> | PresentItemCache<K, V>;

export function isPresent<K, V>(value: ResourceCache<K, V> | null): value is PresentItemCache<K, V> {
    return value !== null && value.fetchingState === FetchingState.FETCHED && value.object !== null;
}

export function isAbsent<K, V>(value: ResourceCache<K, V> | null): value is AbsentItemCache<K> {
    return value !== null && value.fetchingState === FetchingState.NOT_FETCHED;
}

class CachedStateWrapper<K, V> {

    private readonly internal: ImmutableMap<K, ResourceCache<K, V>> = ImmutableMap();

    constructor(internal?: ImmutableMap<K, ResourceCache<K, V>>) {
        if (internal) {
            this.internal = internal;
        } else {
            this.internal = ImmutableMap();
        }
    }

    get(key: K): ResourceCache<K, V> {
        const value = this.internal.get(key);
        return value ? value : {id: key, fetchingState: FetchingState.NOT_FETCHED};
    }

    setOneFetching(key: K): CachedStateWrapper<K, V> {
        return new CachedStateWrapper<K, V>(this.internal.set(key, {id: key, fetchingState: FetchingState.FETCHING}));
    }

    setOneFetched(key: K, value: V | null): CachedStateWrapper<K, V> {
        return new CachedStateWrapper<K, V>(this.internal.set(key, this.toCache(key, value)));
    }

    setAllFetched(other: ImmutableMap<K, V>): CachedStateWrapper<K, V> {
        const cachedValues = other.map((value, key) => this.toCache(<K> key, value));
        return new CachedStateWrapper<K, V>(this.internal.merge(cachedValues));
    }

    private toCache(key: K, value: V | undefined | null): ResourceCache<K, V> {
        if (value) {
            return {
                id: key,
                fetchingState: FetchingState.FETCHED,
                object: value
            };
        } else {
            return {
                id: key,
                fetchingState: FetchingState.FETCHED,
                object: null
            };
        }
    }
}

export class ResourceObjectState<T extends ResourceObject> {
    readonly pages: CachedStateWrapper<PageDescriptor, PageResult<string>>;
    readonly data: CachedStateWrapper<string, T>;

    constructor(pages: CachedStateWrapper<PageDescriptor, PageResult<string>>,
                data: CachedStateWrapper<string, T>) {
        this.pages = pages;
        this.data = data;
    }

    // TODO: return fetched state here? Nothing to indicate whether it's "legitimately" empty
    // TODO: you know what? I'm thinking pages returned from the store should just always have the associated items
    // TODO: a more general "filter all the nulls out of this list" function could still be quite useful
    getNonNullPageItems(page: PageDescriptor): Array<T> {
        const pageResult = this.pages.get(page);
        if (!pageResult || pageResult.fetchingState !== FetchingState.FETCHED || !pageResult.object) {
            return Array();
        } else {
            const ids = pageResult.object.contents;
            const objects = Array<T>();
            for (const id of ids.toArray()) {
                const record = this.data.get(id);
                if (record.fetchingState === FetchingState.FETCHED && record.object !== null) {
                    objects.push(record.object as T);
                }
            }
            return objects;
        }
    }
}

export function initialState<T extends ResourceObject>(): ResourceObjectState<T> {
    return new ResourceObjectState<T>(new CachedStateWrapper(), new CachedStateWrapper());
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
                    state.data.setOneFetching(action.id)
                );
            case ResourceActionType.REQUEST_RESOURCE_PAGE:
                return new ResourceObjectState(
                    state.pages.setOneFetching(action.page),
                    state.data
                );
            case ResourceActionType.RECEIVE_RESOURCE_OBJECT:
                return new ResourceObjectState(
                    state.pages,
                    state.data.setOneFetched(action.data.id, action.data.resource)
                );
            case ResourceActionType.RECEIVE_RESOURCE_PAGE:
                return new ResourceObjectState(
                    state.pages.setOneFetched(action.page, {
                        descriptor: action.page,
                        meta: action.meta,
                        contents: List(action.data.keys())
                    }),
                    state.data.setAllFetched(action.data)
                );
            case ResourceActionType.RECEIVE_RESOURCE_INCLUDES:
                return new ResourceObjectState(
                    state.pages,
                    state.data.setAllFetched(action.data)
                );
            case ResourceActionType.REMOVE_RESOURCE_OBJECT:
                return new ResourceObjectState(
                    state.pages,
                    state.data.setOneFetched(action.removed, null)
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