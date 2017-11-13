import {fetchJson} from "./rest";
import {setCurrentViewFetching} from "./currentView";

export enum TeamActionTypeKeys {
    RECEIVE_TEAMS = 'RECEIVE_TEAMS'
}

export type TeamAction = | ReceiveTeamsAction;

interface ReceiveTeamsAction {
    type: TeamActionTypeKeys.RECEIVE_TEAMS,
    data: any,
    receivedAt: number
}

function receiveTeams(jsonTeams: any): ReceiveTeamsAction {
    return {
        type: TeamActionTypeKeys.RECEIVE_TEAMS,
        data: jsonTeams,
        receivedAt: Date.now()
    }
}

export function fetchTeams(page: number): any {

    return function (dispatch: any) {
        dispatch(setCurrentViewFetching(true));
        return fetchJson(`/rest/teams?page=${page}`)
            .then((json: any) => {
                dispatch(receiveTeams(json.data));
                dispatch(setCurrentViewFetching(false));
            });
    }
}

export function fetchTeamDetail(teamId: string): any {
    return function (dispatch: any) {
        dispatch(setCurrentViewFetching(true));
        return fetchJson(`/rest/teams/${teamId}`)
            .then((json: any) => {
                dispatch(receiveTeams([json.data]));
               dispatch(setCurrentViewFetching(false));
            })
    }
}