import {fetchJson} from "./rest";
import {setCurrentViewFetching} from "./currentView";

export const RECEIVE_ROSTER_POSITIONS = 'RECEIVE_ROSTER_POSITIONS';
function receivePlayers(jsonRosterPositions) {
    return {
        type: RECEIVE_ROSTER_POSITIONS,
        data: jsonRosterPositions,
        receivedAt: Date.now()
    }
}

export const RECEIVE_PEOPLE = 'RECEIVE_PEOPLE';
function receivePeople(jsonPeople) {
    return {
        type: RECEIVE_PEOPLE,
        data: jsonPeople,
        receivedAt: Date.now()
    }
}

export function fetchPlayers(page) {
    return function (dispatch) {
        dispatch(setCurrentViewFetching(true));

        return fetchJson(`/rest/rosterpositions?include=player&page=${page}`)
            .then(json => {
                dispatch(receivePeople(json.included));
                dispatch(receivePlayers(json.data));
                dispatch(setCurrentViewFetching(false));
            })
    }
}

export function fetchPlayerDetail(playerId) {
    return function (dispatch) {
        dispatch(setCurrentViewFetching(true));
        return fetchJson(`/rest/rosterpositions/${playerId}?include=player`)
            .then(json => {
                dispatch(receivePeople(json.included));
                dispatch(receivePlayers([json.data]));
                dispatch(setCurrentViewFetching(false)) ;
            })
    }
}