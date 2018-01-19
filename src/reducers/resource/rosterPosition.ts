import { Person } from './person';
import { RelationshipResource, ResourceObject } from './resourceReducer';
import { NEW_RESOURCE_FORM_ROUTE } from './cache';

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

export const blankRosterPosition: RosterPosition = {
    type: 'rosterpositions',
    id: NEW_RESOURCE_FORM_ROUTE,
    attributes: {
        jerseyNumber: 0,
        startDate: '',
    },
    // TODO the pre-canned relationship to the 'person' is weird. Try and figure out a way to decouple these.
    // It's needed for now because that's how the person object is loaded into the form in PlayerDetailContainer
    relationships: {
        team: {data: {type: 'teams', id: ''}},
        player: {data: {type: 'people', id: 'add'}}
    }
};

export interface Player {
    rosterPosition: RosterPosition;
    person: Person;
}