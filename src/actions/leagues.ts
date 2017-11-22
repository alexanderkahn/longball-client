import { fetchCollection, fetchObject, postObject } from './rest';
import { setCurrentViewFetching } from './currentView';
import { League } from '../models/models';
import { Dispatch } from 'redux';
import { RootState } from '../reducers/index';
import { replace } from 'react-router-redux';

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
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(setCurrentViewFetching(true));
        const collection = await fetchCollection<League>('leagues', page);
        dispatch(receiveLeagues(collection.data));
        dispatch(setCurrentViewFetching(false));
    };
}

export function fetchLeagueDetail(leagueId: string): Dispatch<RootState> {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(setCurrentViewFetching(true));
        const object = await fetchObject<League>('leagues', leagueId);
        dispatch(receiveLeagues(object.data));
        dispatch(setCurrentViewFetching(false));
    };
}

export function saveLeague(league: League): Dispatch<RootState> {
    return async function (dispatch: Dispatch<RootState>) {
        const saveResponse = await postObject(league);
        dispatch(receiveLeagues(new Map().set(saveResponse.id, saveResponse)));
        dispatch(replace(`/manage/leagues/${saveResponse.id}`));
    };
}