import { combineReducers, Reducer } from 'redux';
import * as Immutable from 'immutable';
import { ResourceActionType, ResourceObjectAction } from '../../actions/resource/resourceActions';
import { PageDescriptor, PageResult } from './page';
import { blankLeague, League } from './league';
import { blankTeam, Team } from './team';
import { blankPerson, Person } from './person';
import { blankRosterPosition, RosterPosition } from './rosterPosition';
import { CachedStateWrapper, FetchingState, isPresent, ResourceCache } from './cache';

export type ResourceType =
    | 'leagues'
    | 'teams'
    | 'rosterpositions'
    | 'people'
    | 'users';

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

export class ResourceObjectState<T extends ResourceObject> {
    readonly pages: CachedStateWrapper<PageDescriptor, PageResult<string>>;
    readonly data: CachedStateWrapper<string, T>;

    constructor(pages: CachedStateWrapper<PageDescriptor, PageResult<string>>,
                data: CachedStateWrapper<string, T>) {
        this.pages = pages;
        this.data = data;
    }

    getMappedPage(page: PageDescriptor): ResourceCache<PageDescriptor, PageResult<T>> {
        const pageResult = this.pages.get(page);
        if (isPresent(pageResult)) {
            const dataContents = this.getNonNullPageItems(pageResult.object.contents);
            return {
                ...pageResult,
                object: {
                    ...pageResult.object,
                    contents: dataContents
                }
            };
        } else {
            return pageResult;
        }
    }

    private getNonNullPageItems(itemIds: Immutable.List<string>): Immutable.List<T> {
        const objects = Array<T>();
        for (const id of itemIds.toArray()) {
            const record = this.data.get(id);
            if (record.fetchingState === FetchingState.FETCHED && record.object !== null) {
                objects.push(record.object as T);
            }
        }
        return Immutable.List(objects);
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
    state: ResourceObjectState<T> = initialState(addResource), action: ResourceObjectAction<T>
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