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
    relationships: {
        team: {data: {type: 'teams', id: ''}},
        player: {data: {type: 'people', id: ''}}
    }
};