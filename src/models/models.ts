// TODO probably move all of these into their respective state reducers
// TODO: get this from the server, not directly from firebase. Will look like the other models

export interface ResourceObject {
    id: string;
    type: string;
}

export interface User {
    name: string;
}

export interface CurrentView {
    isFetching: boolean;
    lastUpdated?: number;
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
    relationships: {
        player: RelationshipResource
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

export function toMap<T extends ResourceObject>(objectsArray: Array<T>): Map<string, T> {
    return new Map(objectsArray.map((obj): [string, T] => [obj.id, obj]));
}