import { fetchCollection, DataResponse, fetchObject } from './rest';
import { setCurrentViewFetching } from './currentView';
import { League } from '../models/models';
import { Dispatch } from 'redux';
import { RootState } from '../reducers/index';

export enum LeagueActionTypeKeys {
    RECEIVE_LEAGUES = 'RECEIVE_LEAGUES',
}

export type LeagueAction =
    | ReceiveLeaguesAction;

interface ReceiveLeaguesAction {
    type: LeagueActionTypeKeys.RECEIVE_LEAGUES;
    data: Map<string, League>;
    receivedAt: number;
}

function receiveLeagues(leagues: Map<string, League>): ReceiveLeaguesAction {
    return {
        type: LeagueActionTypeKeys.RECEIVE_LEAGUES,
        data: leagues,
        receivedAt: Date.now()
    };
}

export function fetchLeagues(page: number) {
    return function (dispatch: Dispatch<RootState>) {
        dispatch(setCurrentViewFetching(true));
        return fetchCollection<League>('leagues', 0)
            .then((json: DataResponse<League>) => {
                dispatch(receiveLeagues(json.data));
                dispatch(setCurrentViewFetching(false));
            });
    };
}

export function fetchLeagueDetail(leagueId: string): any {
    return function (dispatch: Dispatch<RootState>) {
        dispatch(setCurrentViewFetching(true));
        return fetchObject('leagues', leagueId)
            .then((json: DataResponse<League>) => {
                dispatch(receiveLeagues(json.data));
                dispatch(setCurrentViewFetching(false));
            });
    };
}