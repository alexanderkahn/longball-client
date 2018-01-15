import { Person } from './person';
import { RelationshipResource, ResourceObject } from './index';

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