
import { Person, toMap } from '../models/models';

export enum PeopleActionTypeKeys {
    RECEIVE_PEOPLE = 'RECEIVE_PEOPLE'
}

export type PeopleAction = | ReceivePeopleAction;

interface ReceivePeopleAction {
    type: PeopleActionTypeKeys.RECEIVE_PEOPLE;
    data: Map<string, Person>;
    receivedAt: number;
}

export function receivePeople(people: Array<Person>): ReceivePeopleAction {
    return {
        type: PeopleActionTypeKeys.RECEIVE_PEOPLE,
        data: toMap(people),
        receivedAt: Date.now()
    };
}