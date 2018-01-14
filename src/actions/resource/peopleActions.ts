import { Person, ResourceType } from '../../models/models';
import { OrderedMap } from 'immutable';
import { ReceiveResourceIncludesAction, RemoveResourceObjectAction, ResourceActionType } from './index';

const PEOPLE_RESOURCE_TYPE: ResourceType = 'people';

export function receivePeople(people: OrderedMap<string, Person>): ReceiveResourceIncludesAction<Person> {
    return {
        type: ResourceActionType.RECEIVE_RESOURCE_INCLUDES,
        resourceType: PEOPLE_RESOURCE_TYPE,
        data: people
    };
}

export function removePerson(id: string): RemoveResourceObjectAction {
    return {
        type: ResourceActionType.REMOVE_RESOURCE_OBJECT,
        resourceType: PEOPLE_RESOURCE_TYPE,
        removed: id
    };
}