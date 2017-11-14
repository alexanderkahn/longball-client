import { DataResponse, fetchCollection, fetchObject } from './rest';
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
    return function (dispatch: Dispatch<RootState>) {
        dispatch(setCurrentViewFetching(true));

        return fetchCollection<RosterPosition>('rosterpositions', page, ['player'])
            .then((json: DataResponse<RosterPosition>) => {
                // TODO: this will break if any other types are included
                dispatch(receivePeople(json.included as Map<string, Person>));
                dispatch(receiveRosterPositions(json.data));
                dispatch(setCurrentViewFetching(false));
            });
    };
}

export function fetchPlayerDetail(playerId: string) {
    return function (dispatch: Dispatch<RootState>) {
        dispatch(setCurrentViewFetching(true));
        return fetchObject<RosterPosition>('rosterpositions', playerId, ['player'])
            .then((json: DataResponse<RosterPosition>) => {
                dispatch(receivePeople(json.included as Map<string, Person>));
                dispatch(receiveRosterPositions(json.data));
                dispatch(setCurrentViewFetching(false)) ;
            });
    };
}