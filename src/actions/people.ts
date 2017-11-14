
import { Person } from '../models/models';

export enum PeopleActionTypeKeys {
    RECEIVE_PEOPLE = 'RECEIVE_PEOPLE'
}

export type PeopleAction = | ReceivePeopleAction;

interface ReceivePeopleAction {
    type: PeopleActionTypeKeys.RECEIVE_PEOPLE;
    data: Map<string, Person>;
    receivedAt: number;
}

export function receivePeople(jsonPeople: Map<String, Person>) {
    return {
        type: PeopleActionTypeKeys.RECEIVE_PEOPLE,
        data: jsonPeople,
        receivedAt: Date.now()
    };
}