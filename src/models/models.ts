import { parse } from 'querystring';
import { Location } from 'history';
import { isNumber } from 'util';
import { ResourceObjectState } from '../reducers/resource';
import { PageDescriptor } from '../reducers/resource/page';

export enum FetchingState {
    NOT_FETCHED,
    FETCHING,
    FETCHED
}

// TODO: get this from the server, not directly from firebase. Will look like the other models
export interface User {
    name: string;
}

export interface ViewState {
    fetchedState: FetchingState;
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
export abstract class ResourceObject {
    id: string;
    type: ResourceType;
}

export type ResourceType =
    | 'leagues'
    | 'teams'
    | 'rosterpositions'
    | 'people';

export class League implements ResourceObject {

    id: string;
    type: 'leagues';
    attributes: {
        name: string
    };

    static empty(): League {
        return new League('', {name: ''});
    }

    constructor(id: string, attributes: { name: string }) {
        this.type = 'leagues';
        this.id = id;
        this.attributes = attributes;
    }
}

export class Team implements ResourceObject {
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

    static empty(): Team {
        return new Team('', {abbreviation: '', location: '', nickname: ''}, {league: ''});
    }

    constructor(id: string,
                attributes: { abbreviation: string, location: string, nickname: string },
                relationships: { league: string }) {
        this.type = 'teams';
        this.id = id;
        this.attributes = attributes;
        this.relationships = { league: {
            data: {
                type: 'leagues',
                id: relationships.league
            }
            }};
    }
}

export class Person implements ResourceObject {
    id: string;
    type: 'people';
    attributes: {
        first: string,
        last: string
    };

    static empty(): Person {
        return new Person('', {first: '', last: ''});
    }

    constructor(id: string, attributes: { first: string, last: string }) {
        this.type = 'people';
        this.id = id;
        this.attributes = attributes;
    }
}

export class RosterPosition implements ResourceObject {
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

    static empty(): RosterPosition {
        return new RosterPosition('', {jerseyNumber: 0, startDate: ''}, {team: '', player: ''});
    }

    constructor(id: string,
                attributes: { jerseyNumber: number, startDate: string, endDate?: string },
                relationships: { team: string, player: string }) {
        this.type = 'rosterpositions';
        this.id = id;
        this.attributes = attributes;
        this.relationships = {
            team: new RelationshipResource('teams', relationships.team),
            player: new RelationshipResource('people', relationships.player)
        };
    }
}

export interface Player {
    rosterPosition: RosterPosition;
    person: Person;
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
            fetchedState: FetchingState.NOT_FETCHED,
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