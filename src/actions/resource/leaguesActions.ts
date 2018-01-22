import { deleteObject, fetchCollection, fetchObject, postObject } from '../rest';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers/rootReducer';
import { replace } from 'react-router-redux';
import { OrderedMap } from 'immutable';
import {
    ReceiveResourcePageAction,
    RemoveResourceObjectAction, RequestResourcePageAction, RequestResourceObjectAction,
    ResourceActionType, ReceiveResourceObjectAction
} from './resourceActions';
import { PageDescriptor, PageResultsMeta } from '../../reducers/resource/page';
import { ResourceType } from '../../reducers/resource/resourceReducer';
import { League } from '../../reducers/resource/league';

const LEAGUE_RESOURCE_TYPE: ResourceType = 'leagues';

function requestLeague(id: string): RequestResourceObjectAction {
    return {
        type: ResourceActionType.REQUEST_RESOURCE_OBJECT,
        resourceType: LEAGUE_RESOURCE_TYPE,
        id
    };
}

function requestLeagueCollection(page: PageDescriptor): RequestResourcePageAction {
    return {
        type: ResourceActionType.REQUEST_RESOURCE_PAGE,
        resourceType: LEAGUE_RESOURCE_TYPE,
        page,
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

function receiveLeagues(leagues: OrderedMap<string, League>, page: PageDescriptor, meta: PageResultsMeta)
: ReceiveResourcePageAction<League> {
    return {
        type: ResourceActionType.RECEIVE_RESOURCE_PAGE,
        resourceType: LEAGUE_RESOURCE_TYPE,
        data: leagues,
        meta,
        page
    };
}

function removeLeague(id: string): RemoveResourceObjectAction {
    return {
        type: ResourceActionType.REMOVE_RESOURCE_OBJECT,
        resourceType: 'leagues',
        removed: id
    };
}

export function fetchLeagues(page: PageDescriptor) {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(requestLeagueCollection(page));
        const collection = await fetchCollection<League>('leagues', page);
        const leagues = OrderedMap<string, League>(collection.data.map((league: League) => [league.id, league]));
        dispatch(receiveLeagues(leagues, page, collection.meta.page));
    };
}

export function fetchLeague(leagueId: string): Dispatch<RootState> {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(requestLeague(leagueId));
        const object = await fetchObject<League>('leagues', leagueId);
        dispatch(receiveLeague(leagueId, object ? object.data : null));
    };
}

export function saveLeague(league: League): (dispatch: Dispatch<RootState>) => Promise<string> {
    return async (dispatch) => {
        const saveResponse = (await postObject(league)).data;
        dispatch(receiveLeague(saveResponse.id, saveResponse));
        dispatch(replace(`/manage/leagues/${saveResponse.id}`));
        return league.id;
    };
}

export function deleteLeague(league: League): Dispatch<RootState> {
    return async function (dispatch: Dispatch<RootState>) {
        await deleteObject(league);
        dispatch(removeLeague(league.id));
    };
}