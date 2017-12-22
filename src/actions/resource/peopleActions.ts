import { Person, ResourceType } from '../../models/models';
import { OrderedMap } from 'immutable';
import { ReceiveResourcePageAction, RemoveResourceObjectAction, ResourceActionType } from './index';

const PEOPLE_RESOURCE_TYPE: ResourceType = 'people';

export function receivePeople(people: OrderedMap<string, Person>): ReceiveResourcePageAction<Person> {
    return {
        type: ResourceActionType.RECEIVE_RESOURCE_PAGE,
        resourceType: PEOPLE_RESOURCE_TYPE,
        data: people,
        page: {
            number: 0,
            totalPages: 0,
        }
    };
}

export function removePerson(id: string): RemoveResourceObjectAction {
    return {
        type: ResourceActionType.REMOVE_RESOURCE_OBJECT,
        resourceType: PEOPLE_RESOURCE_TYPE,
        removed: id
    };
}