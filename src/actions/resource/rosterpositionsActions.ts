import { deleteObject, fetchCollection, fetchObject, postObject } from '../rest';
import { receivePeopleIncludes } from './peopleActions';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers/rootReducer';
import { isNullOrUndefined } from 'util';
import { replace } from 'react-router-redux';
import { OrderedMap } from 'immutable';
import {
    ReceiveResourcePageAction, RemoveResourceObjectAction, RequestResourcePageAction, RequestResourceObjectAction,
    ResourceActionType, ReceiveResourceObjectAction
} from './resourceActions';
import { PageDescriptor, PageResultsMeta } from '../../reducers/resource/page';
import { ResourceType } from '../../reducers/resource/resourceReducer';
import { RosterPosition } from '../../reducers/resource/rosterPosition';
import { Person } from '../../reducers/resource/person';

const ROSTER_POSITIONS_RESOURCE_TYPE: ResourceType = 'rosterpositions';

function requestRosterPosition(id: string): RequestResourceObjectAction {
    return {
        type: ResourceActionType.REQUEST_RESOURCE_OBJECT,
        resourceType: ROSTER_POSITIONS_RESOURCE_TYPE,
        id
    };
}

function requestRosterPositionCollection(page: PageDescriptor): RequestResourcePageAction {
    return {
        type: ResourceActionType.REQUEST_RESOURCE_PAGE,
        resourceType: ROSTER_POSITIONS_RESOURCE_TYPE,
        page: page,
    };
}

function receiveRosterPosition(id: string, resource: RosterPosition | null)
: ReceiveResourceObjectAction<RosterPosition> {
    return {
        type: ResourceActionType.RECEIVE_RESOURCE_OBJECT,
        resourceType: ROSTER_POSITIONS_RESOURCE_TYPE,
        data: {
            id,
            resource
        },
    };
}

function receiveRosterPositions(rosterPositions: OrderedMap<string, RosterPosition>,
                                page: PageDescriptor,
                                meta: PageResultsMeta): ReceiveResourcePageAction<RosterPosition> {
    return {
        type: ResourceActionType.RECEIVE_RESOURCE_PAGE,
        resourceType: ROSTER_POSITIONS_RESOURCE_TYPE,
        page: page,
        data: rosterPositions,
        meta: meta
    };
}

function removeRosterPosition(id: string): RemoveResourceObjectAction {
    return {
        type: ResourceActionType.REMOVE_RESOURCE_OBJECT,
        resourceType: ROSTER_POSITIONS_RESOURCE_TYPE,
        removed: id
    };
}

export function fetchPlayers(page: PageDescriptor) {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(requestRosterPositionCollection(page));
        const collection = await fetchCollection<RosterPosition>('rosterpositions', page, ['player']);
        if (!isNullOrUndefined(collection.included)) {
            const people = collection.included.filter(ro => ro.type === 'people') as Array<Person>;
            dispatch(receivePeopleIncludes(OrderedMap(people.map(person => [person.id, person]))));
        }
        dispatch(receiveRosterPositions(
            OrderedMap(collection.data.map(position => [position.id, position])),
            page,
            collection.meta.page,
        ));
    };
}

export function fetchRosterPositionIncludePerson(playerId: string) {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(requestRosterPosition(playerId));
        const object = await fetchObject<RosterPosition>('rosterpositions', playerId, ['player']);
        if (object && object.included) {
            const people = object.included.filter(ro => ro.type === 'people') as Array<Person>;
            dispatch(receivePeopleIncludes(OrderedMap(people.map(person => [person.id, person]))));
        }
        dispatch(receiveRosterPosition(playerId, object ? object.data : null));
    };
}

// TODO: This shouldn't redirect -- it's a side effect. Will need a generic util dispatch function to do that now.
// TODO: all these save methods should return ID of the new saved object (see savePerson)
export function saveRosterPosition(rosterPosition: RosterPosition) {
    return async function (dispatch: Dispatch<RootState>) {
        const savedRosterPosition = (await postObject(rosterPosition)).data;
        dispatch(receiveRosterPosition(savedRosterPosition.id, savedRosterPosition));
        dispatch(replace(`/manage/players/${savedRosterPosition.id}`));
    };
}

export function deleteRosterPosition(rosterPosition: RosterPosition) {
    return async function (dispatch: Dispatch<RootState>) {
        await deleteObject(rosterPosition);
        dispatch(removeRosterPosition(rosterPosition.id));
    };
}