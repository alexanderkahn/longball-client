import { parse } from 'querystring';
import { Location } from 'history';
import { isNumber } from 'util';
import { ResourceObjectState } from '../reducers/resource';
import { PageDescriptor } from '../reducers/resource/page';

export enum FetchedState {
    NOT_FETCHED,
    FETCHING,
    FETCHED
}

// TODO: get this from the server, not directly from firebase. Will look like the other models
export interface User {
    name: string;
}

export interface ViewState {
    fetchedState: FetchedState;
}

// TODO: this is essentially the same as PageResultsMeta
export interface PagedView extends ViewState {
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

export interface RelationshipResource {
    data: ResourceObject;
}

// TODO: this whole function should probably be part of the state object
export function getSafePage(state: ResourceObjectState<ResourceObject>, location: Location): PagedView {
    const params = parse(location.search.substr(1)) as PagedViewParams;
    const pageNumber = Number(params.page);
    const safePage = (isNumber(pageNumber) && pageNumber > 0) ? pageNumber : 1;

    // FIXME: this will not work for filtered collections. Need a way to parse out pagenumber from filter.
    const pageGroup = state.pages.get(new PageDescriptor(safePage));
    if (!pageGroup) {
        return {
            page: safePage,
            fetchedState: FetchedState.NOT_FETCHED,
            hasPrevious: false,
            hasNext: false,
        };
    } else {
        return {
            page: safePage,
            fetchedState: pageGroup.fetchingState,
            hasPrevious: pageGroup.object ? pageGroup.object.meta.hasPrevious : false,
            hasNext: pageGroup.object ? pageGroup.object.meta.hasNext : false,
        };
    }
}