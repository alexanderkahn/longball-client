import { deleteObject, fetchCollection, fetchObject, CollectionPage, postObject } from '../rest';
import { setCurrentViewFetching } from '../currentView';
import { Person, Player, RosterPosition } from '../../models/models';
import { receivePeople, removePerson } from './people';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers/index';
import { isNullOrUndefined } from 'util';
import { replace } from 'react-router-redux';
import { OrderedMap } from 'immutable';

export enum RosterPositionActionTypeKeys {
    REQUEST_ROSTER_POSITION = 'REQUEST_ROSTER_POSITION',
    REQUEST_ROSTER_POSITION_COLLECTION = 'REQUEST_ROSTER_POSITION_COLLECTION',
    RECEIVE_ROSTER_POSITIONS = 'RECEIVE_ROSTER_POSITIONS',
    REMOVE_ROSTER_POSITION = 'REMOVE_ROSTER_POSITION'
}

export type RosterPositionAction =
    | RequestRosterPositionAction
    | RequestRosterPositionCollectionAction
    | ReceiveRosterPositionsAction
    | RemoveRosterPositionAction;

interface RequestRosterPositionAction {
    type: RosterPositionActionTypeKeys.REQUEST_ROSTER_POSITION;
    id: string;

}

function requestRosterPosition(id: string): RequestRosterPositionAction {
    return {
        type: RosterPositionActionTypeKeys.REQUEST_ROSTER_POSITION,
        id
    };
}

interface RequestRosterPositionCollectionAction {
    type: RosterPositionActionTypeKeys.REQUEST_ROSTER_POSITION_COLLECTION;
    page: number;
}

function requestRosterPositionCollection(page: number): RequestRosterPositionCollectionAction {
    return {
        type: RosterPositionActionTypeKeys.REQUEST_ROSTER_POSITION_COLLECTION,
        page
    };
}

interface ReceiveRosterPositionsAction {
    type: RosterPositionActionTypeKeys.RECEIVE_ROSTER_POSITIONS;
    receivedAt: number;
    data: OrderedMap<string, RosterPosition>;
    page?: CollectionPage;
}

interface RemoveRosterPositionAction {
    type: RosterPositionActionTypeKeys.REMOVE_ROSTER_POSITION;
    removed: string;
}

function receiveRosterPositions(rosterPositions: OrderedMap<string, RosterPosition>, page?: CollectionPage): ReceiveRosterPositionsAction {
    return {
        type: RosterPositionActionTypeKeys.RECEIVE_ROSTER_POSITIONS,
        receivedAt: Date.now(),
        data: rosterPositions,
        page: page
    };
}

function removeRosterPosition(id: string): RemoveRosterPositionAction {
    return {
        type: RosterPositionActionTypeKeys.REMOVE_ROSTER_POSITION,
        removed: id
    };
}

export function fetchPlayers(page: number) {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(setCurrentViewFetching(true));
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
        dispatch(setCurrentViewFetching(false));
    };
}

export function fetchPlayerDetail(playerId: string) {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(setCurrentViewFetching(true));
        dispatch(requestRosterPosition(playerId));
        const object = await fetchObject<RosterPosition>('rosterpositions', playerId, ['player']);
        if (object && object.included) {
            const people = object.included.filter(ro => ro.type === 'people') as Array<Person>;
            dispatch(receivePeople(OrderedMap(people.map(person => [person.id, person]))));
        }
        dispatch(receiveRosterPositions(OrderedMap([[playerId, object ? object.data : null]])));
        dispatch(setCurrentViewFetching(false));
    };
}

export function savePlayer(player: Player) {
    return async function (dispatch: Dispatch<RootState>) {

        const savePersonResponse = await postObject(player.person);
        dispatch(receivePeople(OrderedMap([[savePersonResponse.id, savePersonResponse]])));

        player.rosterPosition.relationships.player.data.id = savePersonResponse.id;
        const saveRosterPositionResponse = await postObject(player.rosterPosition);
        dispatch(receiveRosterPositions(OrderedMap([[saveRosterPositionResponse.id, saveRosterPositionResponse]])));

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