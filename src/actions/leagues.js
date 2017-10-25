
import {fetchJson} from "./rest";
import {setCurrentViewFetching} from "./currentView";

export const RECEIVE_LEAGUES = 'RECEIVE_LEAGUES';
function receiveLeagues(jsonData) {
    return {
        type: RECEIVE_LEAGUES,
        data: jsonData,
        receivedAt: Date.now()
    }
}

export function fetchLeagues(page) {

    return function (dispatch) {
        dispatch(setCurrentViewFetching(true));
        return fetchJson(`/rest/leagues?page=${page}`)
            .then(json => {
                dispatch(receiveLeagues(json.data));
                dispatch(setCurrentViewFetching(false));
            });
    }
}

export function fetchLeagueDetail(leagueId) {
    return function (dispatch) {
        dispatch(setCurrentViewFetching(true));
        return fetchJson(`/rest/leagues/${leagueId}`)
            .then(json => {
                dispatch(receiveLeagues([json.data]));
                dispatch(setCurrentViewFetching(false));
            })
    }
}