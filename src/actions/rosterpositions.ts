import { fetchCollection, fetchObject } from './rest';
import { setCurrentViewFetching } from './currentView';
import { Person, RosterPosition } from '../models/models';
import { receivePeople } from './people';
import { Dispatch } from 'redux';
import { RootState } from '../reducers/index';

export enum RosterPositionActionTypeKeys {
    RECEIVE_ROSTER_POSITIONS = 'RECEIVE_ROSTER_POSITIONS'
}

export type RosterPositionAction = | ReceiveRosterPositionsAction;

interface ReceiveRosterPositionsAction {
    type: RosterPositionActionTypeKeys.RECEIVE_ROSTER_POSITIONS;
    data: Map<string, RosterPosition>;
    receivedAt: number;
}

function receiveRosterPositions(jsonRosterPositions: Map<string, RosterPosition>): ReceiveRosterPositionsAction {
    return {
        type: RosterPositionActionTypeKeys.RECEIVE_ROSTER_POSITIONS,
        data: jsonRosterPositions,
        receivedAt: Date.now()
    };
}

export function fetchPlayers(page: number) {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(setCurrentViewFetching(true));
        const collection = await fetchCollection<RosterPosition>('rosterpositions', page, ['player']);
        // TODO: this will break if any other types are included
        dispatch(receivePeople(collection.included as Map<string, Person>));
        dispatch(receiveRosterPositions(collection.data));
        dispatch(setCurrentViewFetching(false));
    };
}

export function fetchPlayerDetail(playerId: string) {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(setCurrentViewFetching(true));
        const object = await fetchObject<RosterPosition>('rosterpositions', playerId, ['player']);
        dispatch(receivePeople(object.included as Map<string, Person>));
        dispatch(receiveRosterPositions(object.data));
        dispatch(setCurrentViewFetching(false));
    };
}