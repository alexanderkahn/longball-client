import { ResourceObject } from './resourceReducer';
import { NEW_RESOURCE_FORM_ROUTE } from './cache';

export interface Person extends ResourceObject {
    id: string;
    type: 'people';
    attributes: {
        first: string,
        last: string
    };
}
export const blankPerson: Person = {
    type: 'people',
    id: NEW_RESOURCE_FORM_ROUTE,
    attributes: {
        first: '',
        last: ''
    }
};