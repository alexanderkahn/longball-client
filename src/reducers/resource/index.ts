import { combineReducers, Reducer } from 'redux';
import { List, Map as ImmutableMap } from 'immutable';
import { FetchedState, League, Person, ResourceObject, ResourceType, RosterPosition, Team } from '../../models/models';
import { ResourceActionType, ResourceObjectAction } from '../../actions/resource';
import { notEmpty } from '../../components/manage/players/containers/TeamPickerContainer';

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
    readonly data: ImmutableMap<string, ResourceCache<T>>;
    readonly pages: PageStore;
}

interface FilteredPage {
    restrictions: Restrictions;
    pageNumber: number;
    collection: ResourceCollection;
}

class PageStore {
    private restrictedPages: ImmutableMap<Restrictions, ImmutableMap<number, FilteredPage>>;

    constructor(restrictedPages?: ImmutableMap<Restrictions, ImmutableMap<number, FilteredPage>>) {
        this.restrictedPages = restrictedPages ? restrictedPages : ImmutableMap();
    }

    get(restrictions: Map<string, string>, pageNumber: number): FilteredPage | undefined {
        const pages = this.getPagesByRestrictions(new Restrictions(ImmutableMap(restrictions)));
        if (!pages) {
            return undefined;
        } else {
            return pages.get(pageNumber, undefined);
        }
    }

    set(page: FilteredPage): PageStore {
        let pagesByRestrictions = this.getPagesByRestrictions(page.restrictions);
        if (!pagesByRestrictions) {
            pagesByRestrictions = ImmutableMap();
        }
        pagesByRestrictions = pagesByRestrictions.set(page.pageNumber, page);
        const restrictedPages = this.restrictedPages.set(page.restrictions, pagesByRestrictions);
        return new PageStore(restrictedPages);
    }

    private getPagesByRestrictions(restrictions: Restrictions): ImmutableMap<number, FilteredPage> | undefined {
        return this.restrictedPages.find((value, key) => notEmpty(key) && key.equals(restrictions));
    }
}

class Restrictions {
    private restrictionsMap: ImmutableMap<string, string> = ImmutableMap();

    constructor(restrictionsMap: ImmutableMap<string, string>) {
        this.restrictionsMap = ImmutableMap(restrictionsMap.filter((value, key) => this.isRestrictionParameter(key)));
    }

    equals(other: Restrictions): boolean {
        return this.restrictionsMap.equals(other.restrictionsMap);
    }

    private isRestrictionParameter(key: String | undefined): boolean {
        if (key == null) {
            return false;
        }
        return key.startsWith('filter') || key.startsWith('search');
    }
}

export function initialState<T extends ResourceObject>(): ResourceObjectState<T> {
    return {
        data: ImmutableMap(),
        pages: new PageStore(),
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
                    pages: state.pages.set({
                        restrictions: new Restrictions(ImmutableMap(action.restrictions)),
                        pageNumber: action.page,
                        collection: emptyCollection
                    })
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
                    pages: state.pages.set({
                        restrictions: new Restrictions(ImmutableMap(action.restrictions)),
                        pageNumber: action.page.number,
                        collection: {
                            hasNext: action.page.hasNext,
                            hasPrevious: action.page.hasPrevious,
                            pageItems: new ResourceCache(List(action.data.keys()))
                    }}),
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
                                                            pageRestrictions: Map<string, string>,
                                                            page: number): Array<T> {
    const filteredPageResults = state.pages.get(pageRestrictions, page);
    if (!filteredPageResults || !filteredPageResults.collection.pageItems.object) {
        return Array();
    } else {
        const ids = filteredPageResults.collection.pageItems.object;
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