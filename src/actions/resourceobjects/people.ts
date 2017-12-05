import { Person} from '../../models/models';
import { CollectionPage } from '../rest';
import { OrderedMap } from 'immutable';
import { RemoveResourceObjectAction, ResourceObjectActionType } from './index';

export enum PeopleActionTypeKeys {
    RECEIVE_PEOPLE = 'RECEIVE_PEOPLE'
}

export type PeopleAction = | ReceivePeopleAction;

interface ReceivePeopleAction {
    type: PeopleActionTypeKeys.RECEIVE_PEOPLE;
    receivedAt: number;
    data: OrderedMap<string, Person>;
    page?: CollectionPage;
}

export function receivePeople(people: OrderedMap<string, Person>): ReceivePeopleAction {
    return {
        type: PeopleActionTypeKeys.RECEIVE_PEOPLE,
        data: people,
        receivedAt: Date.now()
    };
}

export function removePerson(id: string): RemoveResourceObjectAction {
    return {
        type: ResourceObjectActionType.REMOVE_RESOURCE_OBJECT,
        resourceObjectType: 'people',
        removed: id
    };
}