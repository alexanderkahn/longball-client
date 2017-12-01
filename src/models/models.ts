// TODO: get this from the server, not directly from firebase. Will look like the other models
import { parse } from 'querystring';
import { Location } from 'history';
import { isNumber } from 'util';
import { push } from 'react-router-redux';
import { RootState } from '../reducers/index';
import { Dispatch } from 'redux';

export interface User {
    name: string;
}

export interface CurrentView {
    isFetching: boolean;
    lastUpdated?: number;
}

export interface PagedViewParams {
    page?: string;
}

// TODO probably move all of these into their respective state reducers
export interface ResourceObject {
    id: string;
    type: string;
}

export interface League extends ResourceObject {
    id: string;
    type: string;
    attributes: {
        name: string
    };
}

export interface Team extends ResourceObject {
    id: string;
    type: string;
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
    type: string;
    attributes: {
        first: string,
        last: string
    };
}

export interface RosterPosition extends ResourceObject {
    id: string;
    type: string;
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
    data: {
        type: string;
        id: string
    };
}

// TODO: the functions below don't really have a home right now. Maybe find one for them?
export const deepCopy = <T>(o: T): T => {
    return JSON.parse(JSON.stringify(o));
};

export function getSafePage(location: Location): number {
    const params = parse(location.search.substr(1)) as PagedViewParams;
    const pageNumber = Number(params.page);
    if (isNumber(pageNumber) && pageNumber > 0) {
        return pageNumber;
    }
    return 1;
}

// TODO: this is unbounded. should return null if there is no next page
export function getNext(dispatch: Dispatch<RootState>, location: Location, currentPage: number)
: (() => void) | null {
    const nextPage = currentPage + 1;
    return function() {
        dispatch(push(location.pathname + '?page=' + nextPage));
    };
}

export function getPrevious(dispatch: Dispatch<RootState>, location: Location, currentPage: number)
: (() => void) | null {
    const previousPage = currentPage - 1;
    if (1 > previousPage) {
        return null;
    }

    return function() {
        dispatch(push(location.pathname + '?page=' + previousPage));
    } ;
}