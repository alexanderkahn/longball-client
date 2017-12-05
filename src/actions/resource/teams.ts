import { CollectionPage, deleteObject, fetchCollection, fetchObject, postObject } from '../rest';
import { ResourceType, Team } from '../../models/models';
import { RootState } from '../../reducers/index';
import { Dispatch } from 'redux';
import { replace } from 'react-router-redux';
import { OrderedMap } from 'immutable';
import {
    ReceiveResourceAction,
    RemoveResourceObjectAction, RequestResourceCollectionAction, RequestResourceObjectAction,
    ResourceActionType
} from './index';

const TEAMS_RESOURCE_TYPE: ResourceType = 'teams';

function requestTeam(id: string): RequestResourceObjectAction {
    return {
        type: ResourceActionType.REQUEST_RESOURCE_OBJECT,
        resourceType: TEAMS_RESOURCE_TYPE,
        id
    };
}

function requestTeamCollection(page: number): RequestResourceCollectionAction {
    return {
        type: ResourceActionType.REQUEST_RESOURCE_COLLECTION,
        resourceType: TEAMS_RESOURCE_TYPE,
        page
    };
}

function receiveTeams(teams: OrderedMap<string, Team>, page?: CollectionPage): ReceiveResourceAction<Team> {
    return {
        type: ResourceActionType.RECEIVE_RESOURCE,
        resourceType: TEAMS_RESOURCE_TYPE,
        receivedAt: Date.now(),
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

export function fetchTeams(page: number): Dispatch<RootState> {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(requestTeamCollection(page));
        const collection = await fetchCollection<Team>('teams', page);
        dispatch(receiveTeams(OrderedMap(collection.data.map(team => [team.id, team])), collection.meta.page));
    };
}

export function fetchTeamDetail(teamId: string): Dispatch<RootState> {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(requestTeam(teamId));
        const object = await fetchObject<Team>('teams', teamId);
        dispatch(receiveTeams(OrderedMap([[teamId, object ? object.data : null]])));
    };
}

export function saveTeam(team: Team): Dispatch<RootState> {
    return async function (dispatch: Dispatch<RootState>) {
        const saveResponse = await postObject(team);
        dispatch(receiveTeams(OrderedMap([[saveResponse.id, saveResponse]])));
        dispatch(replace(`/manage/teams/${saveResponse.id}`));
    };
}

export function deleteTeam(team: Team): Dispatch<RootState> {
    return async function  (dispatch: Dispatch<RootState>) {
        await deleteObject(team);
        dispatch(removeTeam(team.id));
    };
}