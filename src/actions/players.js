
import {DEV_AUTH_HEADER} from "../local/index";

export const REQUEST_PLAYERS = 'REQUEST_PLAYERS';
function requestPlayers() {
    return {
        type: REQUEST_PLAYERS
    }
}

export const RECEIVE_PLAYERS = 'RECEIVE_PLAYERS';
function receivePlayers(json) {
    return {
        type: RECEIVE_PLAYERS,
        data: json.content,
        receivedAt: Date.now()
    }
}

//TODO: this and fetchPlayers is copied from teams.js. There should be a reuse opportunity here.
const fetchInit = {
    headers: {
        Authorization: DEV_AUTH_HEADER,
    }
};


export function fetchPlayers(page) {
    return function (dispatch) {
        dispatch(requestPlayers(page));

        return fetch(`/rest/v1/players?page=${page}`, fetchInit)
            .then(
                response => {
                    return response
                },
                error => console.log('An error occurred.', error) //TODO this is obviously not good enough
            )
            .then(response => response.json())
            .then(json =>
                dispatch(receivePlayers(json))
            )
    }
}