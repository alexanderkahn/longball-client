// TODO: get this from the server, not directly from firebase. Will look like the other models
import { parse } from 'querystring';
import { Location } from 'history';
import { isNumber } from 'util';
import { ResourceObjectState } from '../reducers/data/index';

export enum FetchedState {
    NOT_FETCHED,
    FETCHING,
    FETCHED
}

export interface User {
    name: string;
}

export interface CurrentView {
    fetchedState: FetchedState;
}

export interface PagedView extends CurrentView {
    page: number;
    hasPrevious: boolean;
    hasNext: boolean;

}

export interface PagedViewParams {
    page?: string;
}

// TODO probably move all of these into their respective state reducers
export interface ResourceObject {
    id: string;
    type: ResourceType;
}

export type ResourceType =
    | 'leagues'
    | 'teams'
    | 'rosterpositions'
    | 'people';

export interface League extends ResourceObject {
    id: string;
    type: 'leagues';
    attributes: {
        name: string
    };
}

export interface Team extends ResourceObject {
    id: string;
    type: 'teams';
    attributes: {
        abbreviation: string,
        location: string,
        nickname: string
    };
    relationships: {
        league: RelationshipResource;
    };
}

export interface Person extends ResourceObject {
    id: string;
    type: 'people';
    attributes: {
        first: string,
        last: string
    };
}

export interface RosterPosition extends ResourceObject {
    id: string;
    type: 'rosterpositions';
    attributes: {
        jerseyNumber: number;
        startDate: string;
        endDate?: string;
    };
    relationships: {
        team: RelationshipResource;
        player: RelationshipResource;
    };
}

export interface Player {
    rosterPosition: RosterPosition;
    person: Person;
}

interface RelationshipResource {
    data: ResourceObject;
}

// TODO: the functions below don't really have a home right now. Maybe find one for them?
export const deepCopy = <T>(o: T): T => {
    return JSON.parse(JSON.stringify(o));
};

// TODO: with a little more information, this could return a built PagedView
export function getSafePage(state: ResourceObjectState<ResourceObject>, location: Location): PagedView {
    const params = parse(location.search.substr(1)) as PagedViewParams;
    const pageNumber = Number(params.page);
    const safePage = (isNumber(pageNumber) && pageNumber > 0) ? pageNumber : 1;
    const pageInfo = state.pageInfo.pages.get(safePage);
    if (!pageInfo) {
        return {
            page: safePage,
            fetchedState: FetchedState.NOT_FETCHED,
            hasPrevious: false,
            hasNext: false,
        };
    } else {
        return {
            page: safePage,
            fetchedState: pageInfo.fetchingState,
            hasPrevious: safePage > 1,
            hasNext: safePage < state.pageInfo.totalPages,
        };
    }
}

// TODO: this really does not need to exist. Better to extract a constant and use it for all the route pushing.
export function getUrlForPage(currentLocation: Location, page: number) {
    return `${currentLocation.pathname}?page=${page}`;
}