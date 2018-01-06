import { CollectionPage, deleteObject, fetchCollection, fetchObject, postObject } from '../rest';
import { League, ResourceType } from '../../models/models';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers/index';
import { replace } from 'react-router-redux';
import { OrderedMap } from 'immutable';
import {
    ReceiveResourcePageAction,
    RemoveResourceObjectAction, RequestResourcePageAction, RequestResourceObjectAction,
    ResourceActionType, ReceiveResourceObjectAction
} from './index';

const LEAGUE_RESOURCE_TYPE: ResourceType = 'leagues';

function requestLeague(id: string): RequestResourceObjectAction {
    return {
        type: ResourceActionType.REQUEST_RESOURCE_OBJECT,
        resourceType: LEAGUE_RESOURCE_TYPE,
        id
    };
}

function requestLeagueCollection(restrictions: Map<string, string>, page: number): RequestResourcePageAction {
    return {
        type: ResourceActionType.REQUEST_RESOURCE_PAGE,
        resourceType: LEAGUE_RESOURCE_TYPE,
        restrictions: restrictions,
        page
    };
}

function receiveLeague(id: string, resource: League | null): ReceiveResourceObjectAction<League> {
    return {
        type: ResourceActionType.RECEIVE_RESOURCE_OBJECT,
        resourceType: LEAGUE_RESOURCE_TYPE,
        data: {
            id,
            resource
        },
    };
}

function receiveLeagues(leagues: OrderedMap<string, League>, page: CollectionPage): ReceiveResourcePageAction<League> {
    return {
        type: ResourceActionType.RECEIVE_RESOURCE_PAGE,
        resourceType: LEAGUE_RESOURCE_TYPE,
        restrictions: new Map(),
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

export function fetchLeagues(restrictions: Map<string, string>, page: number) {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(requestLeagueCollection(restrictions, page));
        const collection = await fetchCollection<League>('leagues', page);
        dispatch(receiveLeagues(OrderedMap(collection.data.map(league => [league.id, league])), collection.meta.page));
    };
}

export function fetchLeagueDetail(leagueId: string): Dispatch<RootState> {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(requestLeague(leagueId));
        const object = await fetchObject<League>('leagues', leagueId);
        dispatch(receiveLeague(leagueId, object ? object.data : null));
    };
}

export function saveLeague(league: League): Dispatch<RootState> {
    return async function (dispatch: Dispatch<RootState>) {
        const saveResponse = await postObject(league);
        dispatch(receiveLeague(saveResponse.id, saveResponse));
        dispatch(replace(`/manage/leagues/${saveResponse.id}`));
    };
}

export function deleteLeague(league: League): Dispatch<RootState> {
    return async function (dispatch: Dispatch<RootState>) {
        await deleteObject(league);
        dispatch(removeLeague(league.id));
    };
}