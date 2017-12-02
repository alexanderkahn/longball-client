
import { Person } from '../models/models';
import { CollectionPage } from './rest';

export enum PeopleActionTypeKeys {
    RECEIVE_PEOPLE = 'RECEIVE_PEOPLE',
    REMOVE_PERSON = 'REMOVE_PERSON'
}

export type PeopleAction = | ReceivePeopleAction | RemovePersonAction;

interface ReceivePeopleAction {
    type: PeopleActionTypeKeys.RECEIVE_PEOPLE;
    receivedAt: number;
    data: Array<Person>;
    page?: CollectionPage;
}

interface RemovePersonAction {
    type: PeopleActionTypeKeys.REMOVE_PERSON;
    removed: string;
}

export function receivePeople(people: Array<Person>): ReceivePeopleAction {
    return {
        type: PeopleActionTypeKeys.RECEIVE_PEOPLE,
        data: people,
        receivedAt: Date.now()
    };
}

export function removePerson(id: string): RemovePersonAction {
    return {
        type: PeopleActionTypeKeys.REMOVE_PERSON,
        removed: id
    };
}