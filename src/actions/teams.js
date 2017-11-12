import {fetchJson} from "./rest";
import {setCurrentViewFetching} from "./currentView";

export const RECEIVE_TEAMS = 'RECEIVE_TEAMS';
function receiveTeams(jsonTeams) {
    return {
        type: RECEIVE_TEAMS,
        data: jsonTeams,
        receivedAt: Date.now()
    }
}

export function fetchTeams(page) {

    return function (dispatch) {
        dispatch(setCurrentViewFetching(true));
        return fetchJson(`/rest/teams?page=${page}`)
            .then(json => {
                dispatch(receiveTeams(json.data));
                dispatch(setCurrentViewFetching(false));
            });
    }
}

export function fetchTeamDetail(teamId) {
    return function (dispatch) {
        dispatch(setCurrentViewFetching(true));
        return fetchJson(`/rest/teams/${teamId}`)
            .then(json => {
                dispatch(receiveTeams([json.data]));
               dispatch(setCurrentViewFetching(false));
            })
    }
}