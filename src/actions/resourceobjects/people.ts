import { Person, ResourceType } from '../../models/models';
import { OrderedMap } from 'immutable';
import { ReceiveResourceAction, RemoveResourceObjectAction, ResourceActionType } from './index';

const PEOPLE_RESOURCE_TYPE: ResourceType = 'people';

export function receivePeople(people: OrderedMap<string, Person>): ReceiveResourceAction<Person> {
    return {
        type: ResourceActionType.RECEIVE_RESOURCE,
        resourceType: PEOPLE_RESOURCE_TYPE,
        data: people,
        receivedAt: Date.now()
    };
}

export function removePerson(id: string): RemoveResourceObjectAction {
    return {
        type: ResourceActionType.REMOVE_RESOURCE_OBJECT,
        resourceType: PEOPLE_RESOURCE_TYPE,
        removed: id
    };
}