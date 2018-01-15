import { ResourceObject } from './index';

export class League implements ResourceObject {

    id: string;
    type: 'leagues';
    attributes: {
        name: string
    };

    static empty(): League {
        return new League('', {name: ''});
    }

    constructor(id: string, attributes: { name: string }) {
        this.type = 'leagues';
        this.id = id;
        this.attributes = attributes;
    }
}