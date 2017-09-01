import {DEV_AUTH_HEADER} from "../local/index";

export const REQUEST_TEAMS = 'REQUEST_TEAMS';
function requestTeams() {
    return {
        type: REQUEST_TEAMS
    }
}

export const RECEIVE_TEAMS = 'RECEIVE_TEAMS';
function receiveTeams(json) {
    return {
        type: RECEIVE_TEAMS,
        data: json.content,
        receivedAt: Date.now()
    }
}

export function fetchTeams(page) {

    const fetchInit = {
        headers: {
            //TODO temporary prototype solution until oauth is implemented
            Authorization: DEV_AUTH_HEADER,
        }
    };

    return function (dispatch) {
        dispatch(requestTeams(page));

        return fetch(`/rest/v1/teams?page=${page}`, fetchInit)
            .then(
                response => {
                    return response
                },
                error => console.log('An error occurred.', error) //TODO this is obviously not good enough
            )
            .then(response => response.json())
            .then(json =>
                dispatch(receiveTeams(json))
            )
    }
}

export const SELECT_TEAM_DETAIL = 'SELECT_TEAM_DETAIL';
export function selectTeamDetail(teamId) {
    return {
        type: SELECT_TEAM_DETAIL,
        teamId
    }
}

export const REQUEST_TEAM_DETAIL = 'REQUEST_TEAM_DETAIL';
function requestTeamDetail() {
    return {
        type: REQUEST_TEAM_DETAIL
    }
}

export const RECEIVE_TEAM_DETAIL = 'RECEIVE_TEAM_DETAIL';
function receiveTeamDetail(json) {
    return {
        type: RECEIVE_TEAM_DETAIL,
        data: json,
        receivedAt: Date.now()
    }
}

export function fetchTeamDetail(teamId) {
    const fetchInit = {
        headers: {
            //TODO temporary prototype solution until oauth is implemented
            Authorization: DEV_AUTH_HEADER,
        }
    };

    return function (dispatch) {
        dispatch(requestTeamDetail());

        return fetch(`/rest/v1/teams/${teamId}`, fetchInit)
            .then(
                response => response,
                error => console.log('An error occurred.', error) //TODO this is obviously not good enough
            )
            .then(response => response.json())
            .then(json => dispatch(receiveTeamDetail(json)))
    }
}