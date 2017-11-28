import { fetchCollection, fetchObject } from './rest';
import { setCurrentViewFetching } from './currentView';
import { Person, RosterPosition, toMap } from '../models/models';
import { receivePeople } from './people';
import { Dispatch } from 'redux';
import { RootState } from '../reducers/index';
import { isNullOrUndefined } from 'util';

export enum RosterPositionActionTypeKeys {
    RECEIVE_ROSTER_POSITIONS = 'RECEIVE_ROSTER_POSITIONS'
}

export type RosterPositionAction = | ReceiveRosterPositionsAction;

interface ReceiveRosterPositionsAction {
    type: RosterPositionActionTypeKeys.RECEIVE_ROSTER_POSITIONS;
    data: Map<string, RosterPosition>;
    receivedAt: number;
}

function receiveRosterPositions(rosterPositions: Array<RosterPosition>): ReceiveRosterPositionsAction {
    return {
        type: RosterPositionActionTypeKeys.RECEIVE_ROSTER_POSITIONS,
        data: toMap(rosterPositions),
        receivedAt: Date.now()
    };
}

export function fetchPlayers(page: number) {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(setCurrentViewFetching(true));
        const collection = await fetchCollection<RosterPosition>('rosterpositions', page, ['player']);
        if (!isNullOrUndefined(collection.included)) {
            dispatch(receivePeople(collection.included.filter(ro => ro.type === 'people') as Array<Person>));
        }
        dispatch(receiveRosterPositions(collection.data));
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