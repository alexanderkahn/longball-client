import { OrderedMap } from 'immutable';
import { ReceiveResourceIncludesAction, RemoveResourceObjectAction, ResourceActionType } from './index';
import { ResourceType } from '../../reducers/resource';
import { Person } from '../../reducers/resource/person';

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