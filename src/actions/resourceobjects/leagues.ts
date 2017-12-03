import { CollectionPage, deleteObject, fetchCollection, fetchObject, postObject } from '../rest';
import { setCurrentViewFetching } from '../currentView';
import { League } from '../../models/models';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers/index';
import { replace } from 'react-router-redux';
import { OrderedMap } from 'immutable';

export enum LeagueActionTypeKeys {
    RECEIVE_LEAGUES = 'RECEIVE_LEAGUES',
    REMOVE_LEAGUE = 'REMOVE_LEAGUE',
}

export type LeagueAction =
    | ReceiveLeaguesAction | RemoveLeagueAction;

// TODO: can I generify these too? Let's not go crazy, but I'm getting tired of changing the same thing in 5 places
interface ReceiveLeaguesAction {
    type: LeagueActionTypeKeys.RECEIVE_LEAGUES;
    receivedAt: number;
    data: OrderedMap<string, League>;
    page?: CollectionPage;
}

function receiveLeagues(leagues: OrderedMap<string, League>, page?: CollectionPage): ReceiveLeaguesAction {
    return {
        type: LeagueActionTypeKeys.RECEIVE_LEAGUES,
        receivedAt: Date.now(),
        data: leagues,
        page: page
    };
}

interface RemoveLeagueAction {
    type: LeagueActionTypeKeys.REMOVE_LEAGUE;
    removed: string;
}

function removeLeague(id: string): RemoveLeagueAction {
    return {
        type: LeagueActionTypeKeys.REMOVE_LEAGUE,
        removed: id
    };
}

export function fetchLeagues(page: number) {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(setCurrentViewFetching(true));
        const collection = await fetchCollection<League>('leagues', page);
        dispatch(receiveLeagues(OrderedMap(collection.data.map(league => [league.id, league])), collection.meta.page));
        dispatch(setCurrentViewFetching(false));
    };
}

export function fetchLeagueDetail(leagueId: string): Dispatch<RootState> {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(setCurrentViewFetching(true));
        const object = await fetchObject<League>('leagues', leagueId);
        dispatch(receiveLeagues(OrderedMap([[object.data.id, object.data]])));
        dispatch(setCurrentViewFetching(false));
    };
}

export function saveLeague(league: League): Dispatch<RootState> {
    return async function (dispatch: Dispatch<RootState>) {
        const saveResponse = await postObject(league);
        dispatch(receiveLeagues(OrderedMap([[saveResponse.id, saveResponse]])));
        dispatch(replace(`/manage/leagues/${saveResponse.id}`));
    };
}

export function deleteLeague(league: League): Dispatch<RootState> {
    return async function  (dispatch: Dispatch<RootState>) {
        await deleteObject(league);
        dispatch(removeLeague(league.id));
    };
}