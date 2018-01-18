import { Person } from './person';
import { NEW_RESOURCE_FORM_ROUTE, RelationshipResource, ResourceObject } from './index';

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

    // TODO the pre-canned relationship to the 'person' is weird. Try and figure out a way to decouple these.
    // It's needed for now because that's how the person object is loaded into the form in PlayerDetailContainer
    static empty(): RosterPosition {
        return new RosterPosition(
            NEW_RESOURCE_FORM_ROUTE,
            {jerseyNumber: 0, startDate: ''},
            {team: '', player: NEW_RESOURCE_FORM_ROUTE}
            );
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