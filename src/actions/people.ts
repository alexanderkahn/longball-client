
import { Person } from '../models/models';

export enum PeopleActionTypeKeys {
    RECEIVE_PEOPLE = 'RECEIVE_PEOPLE'
}

export type PeopleAction = | ReceivePeopleAction;

interface ReceivePeopleAction {
    type: PeopleActionTypeKeys.RECEIVE_PEOPLE;
    data: Array<Person>;
    receivedAt: number;
}

export function receivePeople(people: Array<Person>) {
    return {
        type: PeopleActionTypeKeys.RECEIVE_PEOPLE,
        data: people,
        receivedAt: Date.now()
    };
}