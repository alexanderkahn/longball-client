import { NEW_RESOURCE_FORM_ROUTE, ResourceObject } from './index';

export class League implements ResourceObject {

    id: string;
    type: 'leagues';
    attributes: {
        name: string
    };

    // TODO: rename this method, pull it out of the class (for all resourceobjects)
    static empty(): League {
        return new League(NEW_RESOURCE_FORM_ROUTE, {name: ''});
    }

    constructor(id: string, attributes: { name: string }) {
        this.type = 'leagues';
        this.id = id;
        this.attributes = attributes;
    }
}