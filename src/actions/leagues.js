
import {fetchJson} from "./rest";

export const REQUEST_LEAGUES = 'REQUEST_LEAGUES';
function requestLeagues() {
    return {
        type: REQUEST_LEAGUES
    }
}

export const RECEIVE_LEAGUES = 'RECEIVE_LEAGUES';
function receiveLeagues(json) {
    return {
        type: RECEIVE_LEAGUES,
        data: json.data,
        receivedAt: Date.now()
    }
}

export function fetchLeagues(page) {

    return function (dispatch) {
        dispatch(requestLeagues(page));
        return fetchJson(`/rest/leagues?page=${page}`)
            .then(json => dispatch(receiveLeagues(json)));
    }
}

export const SELECT_LEAGUE_DETAIL = 'SELECT_LEAGUE_DETAIL';
export function selectLeagueDetail(leagueId) {
    return {
        type: SELECT_LEAGUE_DETAIL,
        leagueId
    }
}

export const REQUEST_LEAGUE_DETAIL = 'REQUEST_LEAGUE_DETAIL';
function requestLeagueDetail() {
    return {
        type: REQUEST_LEAGUE_DETAIL
    }
}

export const RECEIVE_LEAGUE_DETAIL = 'RECEIVE_LEAGUE_DETAIL';
function receiveLeagueDetail(json) {
    return {
        type: RECEIVE_LEAGUE_DETAIL,
        data: json.data,
        receivedAt: Date.now()
    }
}

export function fetchLeagueDetail(leagueId) {
    return function (dispatch) {
        dispatch(requestLeagueDetail());
        return fetchJson(`/rest/leagues/${leagueId}`)
            .then(json => dispatch(receiveLeagueDetail(json)))
    }
}