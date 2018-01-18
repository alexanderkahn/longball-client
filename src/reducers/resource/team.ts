import { NEW_RESOURCE_FORM_ROUTE, RelationshipResource, ResourceObject } from './resourceReducer';

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

export const blankTeam: Team = {
    type: 'teams',
    id: NEW_RESOURCE_FORM_ROUTE,
    attributes: {
        abbreviation: '',
        location: '',
        nickname: ''
    },
    relationships: {
        league: {data: {type: 'leagues', id: ''}}
    }
};