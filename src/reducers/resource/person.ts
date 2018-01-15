import { ResourceObject } from './index';

export class Person implements ResourceObject {
    id: string;
    type: 'people';
    attributes: {
        first: string,
        last: string
    };

    static empty(): Person {
        return new Person('', {first: '', last: ''});
    }

    constructor(id: string, attributes: { first: string, last: string }) {
        this.type = 'people';
        this.id = id;
        this.attributes = attributes;
    }
}