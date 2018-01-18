import { NEW_RESOURCE_FORM_ROUTE, ResourceObject } from './index';

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