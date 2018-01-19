import { ResourceObject } from './resourceReducer';
import { NEW_RESOURCE_FORM_ROUTE } from './cache';

export interface League extends ResourceObject {
    id: string;
    type: 'leagues';
    attributes: {
        name: string
    };
}

export const blankLeague: League = {
    type: 'leagues',
    id: NEW_RESOURCE_FORM_ROUTE,
    attributes: {
        name: ''
    }
};