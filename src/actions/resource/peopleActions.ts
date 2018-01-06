import { Person, ResourceType } from '../../models/models';
import { OrderedMap } from 'immutable';
import { ReceiveResourcePageAction, RemoveResourceObjectAction, ResourceActionType } from './index';

const PEOPLE_RESOURCE_TYPE: ResourceType = 'people';

// FIXME: shouldn't have to fake a page here. Maybe instead of dispatching a separate action it can watch the includes
export function receivePeople(people: OrderedMap<string, Person>): ReceiveResourcePageAction<Person> {
    return {
        type: ResourceActionType.RECEIVE_RESOURCE_PAGE,
        resourceType: PEOPLE_RESOURCE_TYPE,
        restrictions: new Map(),
        data: people,
        page: {
            number: 0,
            totalPages: 0,
            hasPrevious: false,
            hasNext: false,
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