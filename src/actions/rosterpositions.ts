import { deleteObject, fetchCollection, fetchObject, CollectionPage, postObject } from './rest';
import { setCurrentViewFetching } from './currentView';
import { Person, Player, RosterPosition } from '../models/models';
import { receivePeople, removePerson } from './people';
import { Dispatch } from 'redux';
import { RootState } from '../reducers/index';
import { isNullOrUndefined } from 'util';
import { replace } from 'react-router-redux';

export enum RosterPositionActionTypeKeys {
    RECEIVE_ROSTER_POSITIONS = 'RECEIVE_ROSTER_POSITIONS',
    REMOVE_ROSTER_POSITION = 'REMOVE_ROSTER_POSITION'
}

export type RosterPositionAction = | ReceiveRosterPositionsAction | RemoveRosterPositionAction;

interface ReceiveRosterPositionsAction {
    type: RosterPositionActionTypeKeys.RECEIVE_ROSTER_POSITIONS;
    receivedAt: number;
    data: Array<RosterPosition>;
    page?: CollectionPage;
}

interface RemoveRosterPositionAction {
    type: RosterPositionActionTypeKeys.REMOVE_ROSTER_POSITION;
    removed: string;
}

function receiveRosterPositions(rosterPositions: Array<RosterPosition>, page?: CollectionPage)
: ReceiveRosterPositionsAction {
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
        const collection = await fetchCollection<RosterPosition>('rosterpositions', page, ['player']);
        if (!isNullOrUndefined(collection.included)) {
            dispatch(receivePeople(collection.included.filter(ro => ro.type === 'people') as Array<Person>));
        }
        dispatch(receiveRosterPositions(collection.data, collection.meta.page));
        dispatch(setCurrentViewFetching(false));
    };
}

export function fetchPlayerDetail(playerId: string) {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(setCurrentViewFetching(true));
        const object = await fetchObject<RosterPosition>('rosterpositions', playerId, ['player']);
        if (!isNullOrUndefined(object.included)) {
            dispatch(receivePeople(object.included.filter(ro => ro.type === 'people') as Array<Person>));
        }
        dispatch(receiveRosterPositions([object.data]));
        dispatch(setCurrentViewFetching(false));
    };
}

export function savePlayer(player: Player) {
    return async function (dispatch: Dispatch<RootState>) {

        const savePersonResponse = await postObject(player.person);
        dispatch(receivePeople([savePersonResponse]));

        player.rosterPosition.relationships.player.data.id = savePersonResponse.id;
        const saveRosterPositionResponse = await postObject(player.rosterPosition);
        dispatch(receiveRosterPositions([saveRosterPositionResponse]));

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