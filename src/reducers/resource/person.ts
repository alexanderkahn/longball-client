import { ResourceObject } from './resourceReducer';

export interface Person extends ResourceObject {
    id: string;
    type: 'people';
    attributes: {
        first: string,
        last: string
    };
}

// Unlike other resource objects, there is currently no flow for creating a person by itself; instead, it's
// part of the player/rosterPosition flow. So its ID is blank, because we'll never hit the people/add endpoint.
export const blankPerson: Person = {
    type: 'people',
    id: '',
    attributes: {
        first: '',
        last: ''
    }
};