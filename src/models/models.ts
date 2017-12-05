// TODO: get this from the server, not directly from firebase. Will look like the other models
import { parse } from 'querystring';
import { Location } from 'history';
import { isNumber } from 'util';
import { ResourceObjectState } from '../reducers/data/index';

export enum FetchingState {
    NOT_FETCHED,
    FETCHING,
    FETCHED
}

export interface User {
    name: string;
}

export interface CurrentView {
    fetchingState: FetchingState;
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
export function getSafePage(location: Location): number {
    const params = parse(location.search.substr(1)) as PagedViewParams;
    const pageNumber = Number(params.page);
    if (isNumber(pageNumber) && pageNumber > 0) {
        return pageNumber;
    }
    return 1;
}

export function hasPrevious(currentPage: number): boolean {
    return currentPage > 1;
}

export function hasNext(state: ResourceObjectState<ResourceObject>,  currentPage: number): boolean {
    return currentPage < state.pageInfo.totalPages;
}

// TODO: this really does not need to exist. Better to extract a constant and use it for all the route pushing.
export function getUrlForPage(currentLocation: Location, page: number) {
    return `${currentLocation.pathname}?page=${page}`;
}