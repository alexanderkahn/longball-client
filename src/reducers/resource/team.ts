import { RelationshipResource, ResourceObject } from './index';

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