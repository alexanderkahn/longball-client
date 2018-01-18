import { OrderedMap } from 'immutable';
import { ReceiveResourceIncludesAction, RemoveResourceObjectAction, ResourceActionType } from './resourceActions';
import { ResourceType } from '../../reducers/resource/resourceReducer';
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