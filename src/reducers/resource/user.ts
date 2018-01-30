import { ResourceObject } from './resourceReducer';

export interface User extends ResourceObject {
    type: 'users';
    id: string;
    attributes: {
        issuer: string;
        username: string;
        displayName: string;
    };
}