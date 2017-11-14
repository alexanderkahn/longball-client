import { fetchCollection, fetchObject } from './rest';
import { setCurrentViewFetching } from './currentView';

export const RECEIVE_ROSTER_POSITIONS = 'RECEIVE_ROSTER_POSITIONS';
function receiveRosterPositions(jsonRosterPositions: any) {
    return {
        type: RECEIVE_ROSTER_POSITIONS,
        data: jsonRosterPositions,
        receivedAt: Date.now()
    };
}

export const RECEIVE_PEOPLE = 'RECEIVE_PEOPLE';
function receivePeople(jsonPeople: any) {
    return {
        type: RECEIVE_PEOPLE,
        data: jsonPeople,
        receivedAt: Date.now()
    };
}

export function fetchPlayers(page: number) {
    return function (dispatch: any) {
        dispatch(setCurrentViewFetching(true));

        return fetchCollection('rosterpositions', page, ['player'])
            .then((json: any) => {
                dispatch(receivePeople(json.included));
                dispatch(receiveRosterPositions(json.data));
                dispatch(setCurrentViewFetching(false));
            });
    };
}

export function fetchPlayerDetail(playerId: string) {
    return function (dispatch: any) {
        dispatch(setCurrentViewFetching(true));
        return fetchObject('rosterpositions', playerId, ['player'])
            .then((json: any) => {
                dispatch(receivePeople(json.included));
                dispatch(receiveRosterPositions([json.data]));
                dispatch(setCurrentViewFetching(false)) ;
            });
    };
}