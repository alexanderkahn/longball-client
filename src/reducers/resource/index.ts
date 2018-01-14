import { combineReducers, Reducer } from 'redux';
import { List, Map as ImmutableMap } from 'immutable';
import { FetchingState, League, Person, ResourceObject, ResourceType, RosterPosition, Team } from '../../models/models';
import { ResourceActionType, ResourceObjectAction } from '../../actions/resource';
import { PageDescriptor, PageResult } from './page';

export interface ResourceState {
    readonly leagues: ResourceObjectState<League>;
    readonly teams: ResourceObjectState<Team>;
    readonly people: ResourceObjectState<Person>;
    readonly rosterPositions: ResourceObjectState<RosterPosition>;
}

// TODO: putting an ID in here would clean up a lot of code in ResourcePickerPresenter
// TODO: splitting out NOT_FETCHED and FETCHING (no object) from FETCHED (required object) would simplify a lot of logic
export class ResourceCache<T> {
    readonly fetchingState: FetchingState;
    readonly object: T | null;

    static empty<T>(): ResourceCache<T> {
        return {
            fetchingState: FetchingState.NOT_FETCHED,
            object: null
        };
    }

    constructor(object?: T) {
        this.fetchingState = object ? FetchingState.FETCHED : FetchingState.FETCHING;
        this.object = object ? object : null;
    }
}

class CachedStateWrapper<K, V> {

    private readonly internal: ImmutableMap<K, ResourceCache<V>> = ImmutableMap();

    constructor(internal?: ImmutableMap<K, ResourceCache<V>>) {
        if (internal) {
            this.internal = internal;
        } else {
            this.internal = ImmutableMap();
        }
    }

    get(key: K): ResourceCache<V> {
        const value = this.internal.get(key);
        return value ? value : ResourceCache.empty();
    }

    set(key: K, value?: V): CachedStateWrapper<K, V> {
        return new CachedStateWrapper<K, V>(this.internal.set(key, new ResourceCache<V>(value)));
    }

    merge(other: ImmutableMap<K, V>): CachedStateWrapper<K, V> {
        const cachedValues = other.map((value) => new ResourceCache(value));
        return new CachedStateWrapper<K, V>(this.internal.merge(cachedValues));
    }

    toArray(): Array<V> {
        const result: Array<V> = [];
        this.internal.forEach(it => {
            if (it && it.object) {
                result.push(it.object);
            }
        });
        return result;
    }
}

export class ResourceObjectState<T extends ResourceObject> {
    readonly pages: CachedStateWrapper<PageDescriptor, PageResult>;
    readonly data: CachedStateWrapper<string, T>;

    constructor(pages: CachedStateWrapper<PageDescriptor, PageResult>,
                data: CachedStateWrapper<string, T>) {
        this.pages = pages;
        this.data = data;
    }

    // TODO: return fetched state here? Nothing to indicate whether it's "legitimately" empty
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
                    state.data.set(action.id)
                );
            case ResourceActionType.REQUEST_RESOURCE_PAGE:
                return new ResourceObjectState(
                    state.pages.set(action.page),
                    state.data
                );
            case ResourceActionType.RECEIVE_RESOURCE_OBJECT:
                return new ResourceObjectState(
                    state.pages,
                    state.data.set(action.data.id, action.data.resource ? action.data.resource : undefined)
                );
            case ResourceActionType.RECEIVE_RESOURCE_PAGE:
                return new ResourceObjectState(
                    state.pages.set(action.page, {
                        descriptor: action.page,
                        meta: action.meta,
                        itemIds: List(action.data.keys())
                    }),
                    state.data.merge(action.data)
                );
            case ResourceActionType.RECEIVE_RESOURCE_INCLUDES:
                return new ResourceObjectState(
                    state.pages,
                    state.data.merge(action.data)
                );
            case ResourceActionType.REMOVE_RESOURCE_OBJECT:
                return new ResourceObjectState(
                    state.pages,
                    state.data.set(action.removed)
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