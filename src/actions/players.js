import {fetchJson} from "./rest";

export const REQUEST_PLAYERS = 'REQUEST_PLAYERS';
function requestPlayers() {
    return {
        type: REQUEST_PLAYERS
    }
}

export const RECEIVE_PLAYERS = 'RECEIVE_PLAYERS';
function receivePlayers(json) {
    collapseIncluded(json);
    return {
        type: RECEIVE_PLAYERS,
        data: json.data,
        receivedAt: Date.now()
    }
}

export function fetchPlayers(page) {
    return function (dispatch) {
        dispatch(requestPlayers(page));

        return fetchJson(`/rest/rosterpositions?include=player&page=${page}`)
            .then(json => dispatch(receivePlayers(json)))
    }
}

export const SELECT_PLAYER_DETAIL = 'SELECT_PLAYER_DETAIL';
export function selectPlayerDetail(playerId) {
    return {
        type: SELECT_PLAYER_DETAIL,
        playerId
    }
}

export const REQUEST_PLAYER_DETAIL = 'REQUEST_PLAYER_DETAIL';
function requestPlayerDetail() {
    return {
        type: REQUEST_PLAYER_DETAIL
    }
}

export const RECEIVE_PLAYER_DETAIL = 'RECEIVE_PLAYER_DETAIL';
function receivePlayerDetail(json) {
    //TODO: this will likely break if any other includes are implemented later
    json.data.relationships.player.data = json.included[0];
    return {
        type: RECEIVE_PLAYER_DETAIL,
        data: json.data,
        receivedAt: Date.now()
    }
}

export function fetchPlayerDetail(playerId) {
    return function (dispatch) {
        dispatch(requestPlayerDetail());
        return fetchJson(`/rest/rosterpositions/${playerId}?include=player`)
            .then(json => dispatch(receivePlayerDetail(json)))
    }
}

function collapseIncluded(json) {
    for (const rosterPos of json.data) {
        const matchesId = (person) => { return person.id === rosterPos.relationships.player.data.id };
        rosterPos.relationships.player.data = json.included.find(matchesId)
    }
}