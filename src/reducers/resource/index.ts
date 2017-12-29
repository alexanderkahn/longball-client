import { combineReducers, Reducer } from 'redux';
import { List, Map } from 'immutable';
import { FetchedState, League, Person, ResourceObject, ResourceType, RosterPosition, Team } from '../../models/models';
import { ResourceActionType, ResourceObjectAction } from '../../actions/resource';

export interface ResourceState {
    readonly leagues: ResourceObjectState<League>;
    readonly teams: ResourceObjectState<Team>;
    readonly people: ResourceObjectState<Person>;
    readonly rosterPositions: ResourceObjectState<RosterPosition>;
}

export class ResourceCache<T extends ResourceObject | null | List<string>> {
    readonly fetchingState: FetchedState.FETCHING | FetchedState.FETCHED;
    readonly object: T | null;

    constructor(object?: T) {
        this.fetchingState = object ? FetchedState.FETCHED : FetchedState.FETCHING;
        this.object = object ? object : null;
    }
}

// TODO: this might be the same as PagedView & CollectionPage. Lots of representations of the same thing right now.
export interface ResourceCollection {
    hasNext: boolean;
    hasPrevious: boolean;
    pageItems: ResourceCache<List<string>>;
}

const emptyCollection: ResourceCollection = {
    hasPrevious: false,
    hasNext: false,
    pageItems: new ResourceCache()
};

export class ResourceObjectState<T extends ResourceObject> {
    readonly data: Map<string, ResourceCache<T>>;
    readonly pages: FilteredPageMap;
}

class FilteredPageMap {
    private filteredPages: Map<string, Map<number, ResourceCollection>>;

    constructor(map?: Map<string, Map<number, ResourceCollection>>) {
        this.filteredPages = map ? map : Map();
    }

    get(filter: string, page: number): ResourceCollection | null {
        const filterMap = this.filteredPages.get(filter);
        if (!filterMap) {
            return null;
        }
        return filterMap.get(page);
    }

    set(filter: string, page: number, pageInfo: ResourceCollection): FilteredPageMap  {
        let filterMap = this.filteredPages.get(filter);
        if (!filterMap) {
            filterMap = Map();
        }
        filterMap = filterMap.set(page, pageInfo);
        const filteredPagesMap = this.filteredPages.set(filter, filterMap);
        return new FilteredPageMap(filteredPagesMap);
    }
}

export function initialState<T extends ResourceObject>(): ResourceObjectState<T> {
    return {
        data: Map(),
        pages: new FilteredPageMap()
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
                    data: state.data.set(action.id, new ResourceCache())
                };
            case ResourceActionType.REQUEST_RESOURCE_PAGE:
                return {
                    ...state,
                    pages: state.pages.set(action.filter, action.page, emptyCollection)
                };
            case ResourceActionType.RECEIVE_RESOURCE_OBJECT:
                const resourceCache = new ResourceCache(action.data.resource);
                return {
                    ...state,
                    data: state.data.set(action.data.id, resourceCache)
                };
            case ResourceActionType.RECEIVE_RESOURCE_PAGE:
                return {
                    ...state,
                    pages: state.pages.set(action.filter, action.page.number, {
                        hasNext: action.page.hasNext,
                        hasPrevious: action.page.hasPrevious,
                        pageItems: new ResourceCache(List(action.data.keys()))
                    }),
                    data: state.data.merge(action.data.map(it => new ResourceCache(it)))
                };
            case ResourceActionType.REMOVE_RESOURCE_OBJECT:
                return {
                    ...state,
                    data: state.data.set(action.removed, new ResourceCache())
                };
            default:
                return state;
        }
    };

export function getObjectsForPage<T extends ResourceObject>(state: ResourceObjectState<T>,
                                                            pageFilter: string,
                                                            page: number): Array<T> {
    const filteredPageResults = state.pages.get(pageFilter, page);
    if (!filteredPageResults || !filteredPageResults.pageItems.object) {
        return Array();
    } else {
        const ids = filteredPageResults.pageItems.object;
        const objects = Array<T>();
        for (const id of ids.toArray()) {
            const record = state.data.get(id);
            if (record !== null && record.object !== null) {
                objects.push(record.object as T);
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