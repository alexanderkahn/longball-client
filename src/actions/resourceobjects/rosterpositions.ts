import { deleteObject, fetchCollection, fetchObject, CollectionPage, postObject } from '../rest';
import { Person, Player, ResourceType, RosterPosition } from '../../models/models';
import { receivePeople, removePerson } from './people';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers/index';
import { isNullOrUndefined } from 'util';
import { replace } from 'react-router-redux';
import { OrderedMap } from 'immutable';
import {
    ReceiveResourceAction,
    RemoveResourceObjectAction, RequestResourceCollectionAction, RequestResourceObjectAction,
    ResourceActionType
} from './index';

const ROSTER_POSITIONS_RESOURCE_TYPE: ResourceType = 'rosterpositions';

function requestRosterPosition(id: string): RequestResourceObjectAction {
    return {
        type: ResourceActionType.REQUEST_RESOURCE_OBJECT,
        resourceType: ROSTER_POSITIONS_RESOURCE_TYPE,
        id
    };
}

function requestRosterPositionCollection(page: number): RequestResourceCollectionAction {
    return {
        type: ResourceActionType.REQUEST_RESOURCE_COLLECTION,
        resourceType: ROSTER_POSITIONS_RESOURCE_TYPE,
        page
    };
}

function receiveRosterPositions(rosterPositions: OrderedMap<string, RosterPosition>, page?: CollectionPage)
: ReceiveResourceAction<RosterPosition> {
    return {
        type: ResourceActionType.RECEIVE_RESOURCE,
        resourceType: ROSTER_POSITIONS_RESOURCE_TYPE,
        receivedAt: Date.now(),
        data: rosterPositions,
        page: page
    };
}

function removeRosterPosition(id: string): RemoveResourceObjectAction {
    return {
        type: ResourceActionType.REMOVE_RESOURCE_OBJECT,
        resourceType: ROSTER_POSITIONS_RESOURCE_TYPE,
        removed: id
    };
}

export function fetchPlayers(page: number) {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(requestRosterPositionCollection(page));
        const collection = await fetchCollection<RosterPosition>('rosterpositions', page, ['player']);
        if (!isNullOrUndefined(collection.included)) {
            const people = collection.included.filter(ro => ro.type === 'people') as Array<Person>;
            dispatch(receivePeople(OrderedMap(people.map(person => [person.id, person]))));
        }
        dispatch(receiveRosterPositions(
            OrderedMap(collection.data.map(position => [position.id, position])),
            collection.meta.page)
        );
    };
}

export function fetchPlayerDetail(playerId: string) {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(requestRosterPosition(playerId));
        const object = await fetchObject<RosterPosition>('rosterpositions', playerId, ['player']);
        if (object && object.included) {
            const people = object.included.filter(ro => ro.type === 'people') as Array<Person>;
            dispatch(receivePeople(OrderedMap(people.map(person => [person.id, person]))));
        }
        dispatch(receiveRosterPositions(OrderedMap([[playerId, object ? object.data : null]])));
    };
}

export function savePlayer(player: Player) {
    return async function (dispatch: Dispatch<RootState>) {

        const savePersonResponse = await postObject(player.person);
        dispatch(receivePeople(OrderedMap([[savePersonResponse.id, savePersonResponse]])));

        player.rosterPosition.relationships.player.data.id = savePersonResponse.id;
        const saveRosterPositionResponse = await postObject(player.rosterPosition);
        dispatch(receiveRosterPositions(OrderedMap(
            [[saveRosterPositionResponse.id, saveRosterPositionResponse]])));

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