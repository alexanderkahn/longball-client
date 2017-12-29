import { CollectionPage, deleteObject, fetchCollection, fetchObject, postObject } from '../rest';
import { ResourceType, Team } from '../../models/models';
import { RootState } from '../../reducers';
import { Dispatch } from 'redux';
import { replace } from 'react-router-redux';
import { OrderedMap } from 'immutable';
import {
    ReceiveResourcePageAction,
    RemoveResourceObjectAction, RequestResourcePageAction, RequestResourceObjectAction,
    ResourceActionType, ReceiveResourceObjectAction
} from './index';

const TEAMS_RESOURCE_TYPE: ResourceType = 'teams';

function requestTeam(id: string): RequestResourceObjectAction {
    return {
        type: ResourceActionType.REQUEST_RESOURCE_OBJECT,
        resourceType: TEAMS_RESOURCE_TYPE,
        id
    };
}

function requestTeamCollection(filter: string, page: number): RequestResourcePageAction {
    return {
        type: ResourceActionType.REQUEST_RESOURCE_PAGE,
        resourceType: TEAMS_RESOURCE_TYPE,
        filter,
        page
    };
}

function receiveTeam(id: string, resource: Team | null): ReceiveResourceObjectAction<Team> {
    return {
        type: ResourceActionType.RECEIVE_RESOURCE_OBJECT,
        resourceType: TEAMS_RESOURCE_TYPE,
        data: {
            id,
            resource
        },
    };
}

function receiveTeams(teams: OrderedMap<string, Team>, page: CollectionPage): ReceiveResourcePageAction<Team> {
    return {
        type: ResourceActionType.RECEIVE_RESOURCE_PAGE,
        resourceType: TEAMS_RESOURCE_TYPE,
        filter: '',
        data: teams,
        page: page
    };
}

function removeTeam(id: string): RemoveResourceObjectAction {
    return {
        type: ResourceActionType.REMOVE_RESOURCE_OBJECT,
        resourceType: TEAMS_RESOURCE_TYPE,
        removed: id
    };
}

export function fetchTeams(filter: string, page: number): Dispatch<RootState> {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(requestTeamCollection(filter, page));
        const collection = await fetchCollection<Team>('teams', page);
        dispatch(receiveTeams(OrderedMap(collection.data.map(team => [team.id, team])), collection.meta.page));
    };
}

export function fetchTeamDetail(teamId: string): Dispatch<RootState> {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(requestTeam(teamId));
        const object = await fetchObject<Team>('teams', teamId);
        dispatch(receiveTeam(teamId, object ? object.data : null));
    };
}

export function saveTeam(team: Team): Dispatch<RootState> {
    return async function (dispatch: Dispatch<RootState>) {
        const saveResponse = await postObject(team);
        dispatch(receiveTeam(saveResponse.id, saveResponse));
        dispatch(replace(`/manage/teams/${saveResponse.id}`));
    };
}

export function deleteTeam(team: Team): Dispatch<RootState> {
    return async function  (dispatch: Dispatch<RootState>) {
        await deleteObject(team);
        dispatch(removeTeam(team.id));
    };
}