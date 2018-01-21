import { OrderedMap } from 'immutable';
import {
    ReceiveResourceIncludesAction, ReceiveResourceObjectAction, RemoveResourceObjectAction,
    ResourceActionType
} from './resourceActions';
import { ResourceType } from '../../reducers/resource/resourceReducer';
import { Person } from '../../reducers/resource/person';
import { deleteObject, postObject } from '../rest';
import { RootState } from '../../reducers/rootReducer';
import { Dispatch } from 'redux';

const PEOPLE_RESOURCE_TYPE: ResourceType = 'people';

export function receivePeopleIncludes(people: OrderedMap<string, Person>): ReceiveResourceIncludesAction<Person> {
    return {
        type: ResourceActionType.RECEIVE_RESOURCE_INCLUDES,
        resourceType: PEOPLE_RESOURCE_TYPE,
        data: people
    };
}

function receivePerson(id: string, resource: Person | null): ReceiveResourceObjectAction<Person> {
    return {
        type: ResourceActionType.RECEIVE_RESOURCE_OBJECT,
        resourceType: PEOPLE_RESOURCE_TYPE,
        data: {
            id,
            resource
        },
    };
}

export function savePerson(person: Person): (dispatch: Dispatch<RootState>) => Promise<string> {
    return async (dispatch) => {
        const savePersonResponse = (await postObject(person)).data;
        dispatch(receivePerson(savePersonResponse.id, savePersonResponse));
        return savePersonResponse.id;
    };
}

function removePerson(id: string): RemoveResourceObjectAction {
    return {
        type: ResourceActionType.REMOVE_RESOURCE_OBJECT,
        resourceType: PEOPLE_RESOURCE_TYPE,
        removed: id
    };
}

export function deletePerson(person: Person) {
    return async function (dispatch: Dispatch<RootState>) {
        await deleteObject(person);
        dispatch(removePerson(person.id));

    };
}