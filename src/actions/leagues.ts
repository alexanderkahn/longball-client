import { fetchJson } from './rest';
import { setCurrentViewFetching } from './currentView';

export enum LeagueActionTypeKeys {
    RECEIVE_LEAGUES = 'RECEIVE_LEAGUES',
}

export type LeagueAction =
    | ReceiveLeaguesAction;

interface ReceiveLeaguesAction {
    type: LeagueActionTypeKeys.RECEIVE_LEAGUES;
    data: any;
    receivedAt: number;
}

function receiveLeagues(jsonData: any): ReceiveLeaguesAction {
    return {
        type: LeagueActionTypeKeys.RECEIVE_LEAGUES,
        data: jsonData,
        receivedAt: Date.now()
    };
}

export function fetchLeagues(page: number) {

    return function (dispatch: any) {
        dispatch(setCurrentViewFetching(true));
        return fetchJson(`/rest/leagues?page=${page}`)
            .then((json: any) => {
                dispatch(receiveLeagues(json.data));
                dispatch(setCurrentViewFetching(false));
            });
    };
}

export function fetchLeagueDetail(leagueId: string): any {
    return function (dispatch: any) {
        dispatch(setCurrentViewFetching(true));
        return fetchJson(`/rest/leagues/${leagueId}`)
            .then((json: any) => {
                dispatch(receiveLeagues([json.data]));
                dispatch(setCurrentViewFetching(false));
            });
    };
}