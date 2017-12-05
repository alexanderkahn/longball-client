import { CollectionPage, deleteObject, fetchCollection, fetchObject, postObject } from '../rest';
import { League, ResourceType } from '../../models/models';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers/index';
import { replace } from 'react-router-redux';
import { OrderedMap } from 'immutable';
import {
    ReceiveResourceAction,
    RemoveResourceObjectAction, RequestResourceCollectionAction, RequestResourceObjectAction,
    ResourceActionType
} from './index';

const LEAGUE_RESOURCE_TYPE: ResourceType = 'leagues';

function requestLeague(id: string): RequestResourceObjectAction {
    return {
        type: ResourceActionType.REQUEST_RESOURCE_OBJECT,
        resourceType: LEAGUE_RESOURCE_TYPE,
        id
    };
}

function requestLeagueCollection(page: number): RequestResourceCollectionAction {
    return {
        type: ResourceActionType.REQUEST_RESOURCE_COLLECTION,
        resourceType: LEAGUE_RESOURCE_TYPE,
        page
    };
}

function receiveLeagues(leagues: OrderedMap<string, League>, page?: CollectionPage): ReceiveResourceAction<League> {
    return {
        type: ResourceActionType.RECEIVE_RESOURCE,
        resourceType: LEAGUE_RESOURCE_TYPE,
        receivedAt: Date.now(),
        data: leagues,
        page: page
    };
}

function removeLeague(id: string): RemoveResourceObjectAction {
    return {
        type: ResourceActionType.REMOVE_RESOURCE_OBJECT,
        resourceType: 'leagues',
        removed: id
    };
}

export function fetchLeagues(page: number) {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(requestLeagueCollection(page));
        const collection = await fetchCollection<League>('leagues', page);
        dispatch(receiveLeagues(OrderedMap(collection.data.map(league => [league.id, league])), collection.meta.page));
    };
}

export function fetchLeagueDetail(leagueId: string): Dispatch<RootState> {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(requestLeague(leagueId));
        const object = await fetchObject<League>('leagues', leagueId);
        dispatch(receiveLeagues(OrderedMap([[leagueId, object ? object.data : null]])));
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
    return async function (dispatch: Dispatch<RootState>) {
        await deleteObject(league);
        dispatch(removeLeague(league.id));
    };
}