import { deleteObject, fetchCollection, fetchObject, postObject } from '../rest';
import { receivePeople, removePerson } from './peopleActions';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers/index';
import { isNullOrUndefined } from 'util';
import { replace } from 'react-router-redux';
import { OrderedMap } from 'immutable';
import {
    ReceiveResourcePageAction,
    RemoveResourceObjectAction, RequestResourcePageAction, RequestResourceObjectAction,
    ResourceActionType, ReceiveResourceObjectAction
} from './index';
import { PageDescriptor, PageResultsMeta } from '../../reducers/resource/page';
import { ResourceType } from '../../reducers/resource';
import { Player, RosterPosition } from '../../reducers/resource/rosterPosition';
import { Person } from '../../reducers/resource/person';

const ROSTER_POSITIONS_RESOURCE_TYPE: ResourceType = 'rosterpositions';

function requestRosterPosition(id: string): RequestResourceObjectAction {
    return {
        type: ResourceActionType.REQUEST_RESOURCE_OBJECT,
        resourceType: ROSTER_POSITIONS_RESOURCE_TYPE,
        id
    };
}

// TODO: descriptor should be a store-only concept.
// This should be a full list of query parameters that can get filtered down later.
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
            dispatch(receivePeople(OrderedMap(people.map(person => [person.id, person]))));
        }
        dispatch(receiveRosterPositions(
            OrderedMap(collection.data.map(position => [position.id, position])),
            page,
            collection.meta.page,
        ));
    };
}

export function fetchPlayer(playerId: string) {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(requestRosterPosition(playerId));
        const object = await fetchObject<RosterPosition>('rosterpositions', playerId, ['player']);
        if (object && object.included) {
            const people = object.included.filter(ro => ro.type === 'people') as Array<Person>;
            dispatch(receivePeople(OrderedMap(people.map(person => [person.id, person]))));
        }
        dispatch(receiveRosterPosition(playerId, object ? object.data : null));
    };
}

export function savePlayer(player: Player) {
    return async function (dispatch: Dispatch<RootState>) {

        const savePersonResponse = await postObject(player.person);
        dispatch(receivePeople(OrderedMap([[savePersonResponse.id, savePersonResponse]])));

        player.rosterPosition.relationships.player.data.id = savePersonResponse.id;
        const saveRosterPositionResponse = await postObject(player.rosterPosition);
        dispatch(receiveRosterPosition(saveRosterPositionResponse.id, saveRosterPositionResponse));

        dispatch(replace(`/manage/players/${saveRosterPositionResponse.id}`));
    };
}

export function deletePlayer(player: Player) {
    return async function (dispatch: Dispatch<RootState>) {
        await deleteObject(player.rosterPosition);
        await deleteObject(player.person);
        dispatch(removeRosterPosition(player.rosterPosition.id));
        dispatch(removePerson(player.person.id));
    };
}