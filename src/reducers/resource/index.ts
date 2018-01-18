import { combineReducers, Reducer } from 'redux';
import * as Immutable from 'immutable';
import { ResourceActionType, ResourceObjectAction } from '../../actions/resource';
import { PageDescriptor, PageResult } from './page';
import { blankLeague, League } from './league';
import { blankTeam, Team } from './team';
import { blankPerson, Person } from './person';
import { blankRosterPosition, RosterPosition } from './rosterPosition';
import * as _ from 'lodash';

export const NEW_RESOURCE_FORM_ROUTE = 'add';

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

export interface ResourceObject {
    id: string;
    type: ResourceType;
}

export interface RelationshipResource {
    data: ResourceObject;
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

    private readonly internal: Immutable.Map<K, ResourceCache<K, V>>;
    private readonly synthetic: Immutable.Map<K, ResourceCache<K, V>>;

    constructor(synthetic: Immutable.Map<K, ResourceCache<K, V>>, internal: Immutable.Map<K, ResourceCache<K, V>>) {
        this.synthetic = synthetic;
        this.internal = internal;
    }

    get(key: K): ResourceCache<K, V> {
        const syntheticValue = this.synthetic.get(key);
        if (syntheticValue) {
            return _.cloneDeep(syntheticValue);
        }
        return this.internal.get(key, {id: key, fetchingState: FetchingState.NOT_FETCHED});
    }

    setOneFetching(key: K): CachedStateWrapper<K, V> {
        return new CachedStateWrapper<K, V>(this.synthetic, this.internal.set(
            key, {id: key, fetchingState: FetchingState.FETCHING})
        );
    }

    setOneFetched(key: K, value: V | null): CachedStateWrapper<K, V> {
        return new CachedStateWrapper<K, V>(this.synthetic, this.internal.set(key, this.toCache(key, value)));
    }

    setAllFetched(other: Immutable.Map<K, V>): CachedStateWrapper<K, V> {
        const cachedValues = other.map((value, key) => this.toCache(<K> key, value));
        return new CachedStateWrapper<K, V>(this.synthetic, this.internal.merge(cachedValues));
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

export function initialState<T extends ResourceObject>(defaultResource: T): ResourceObjectState<T> {
    return new ResourceObjectState<T>(
        new CachedStateWrapper<PageDescriptor, PageResult<string>>(
            Immutable.Map(), Immutable.Map()
        ),
        new CachedStateWrapper<string, T>(
            Immutable.Map<string, ResourceCache<string, T>>([[defaultResource.id, {
                id: defaultResource.id,
                fetchingState: FetchingState.FETCHED,
                object: defaultResource
            }]]),
            Immutable.Map()
        )
    );
}

const resourceReducerBuilder = <T extends ResourceObject>(typeFilter: ResourceType, addResource: T) => (
    state: ResourceObjectState<T> = initialState(addResource),
    action: ResourceObjectAction<T>
): ResourceObjectState<T> => {
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
                    contents: Immutable.List(action.data.keys())
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

const leagues = resourceReducerBuilder<League>('leagues', blankLeague);
const teams = resourceReducerBuilder<Team>('teams', blankTeam);
const people = resourceReducerBuilder<Person>('people', blankPerson);
const rosterPositions = resourceReducerBuilder<RosterPosition>('rosterpositions', blankRosterPosition);

export const resource: Reducer<ResourceState> = combineReducers<ResourceState>({
    leagues,
    teams,
    people,
    rosterPositions,
});