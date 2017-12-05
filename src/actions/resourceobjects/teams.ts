import { CollectionPage, deleteObject, fetchCollection, fetchObject, postObject } from '../rest';
import { Team } from '../../models/models';
import { RootState } from '../../reducers/index';
import { Dispatch } from 'redux';
import { replace } from 'react-router-redux';
import { OrderedMap } from 'immutable';
import { RemoveResourceObjectAction, ResourceObjectActionType } from './index';

export enum TeamActionTypeKeys {
    REQUEST_TEAM = 'REQUEST_TEAM',
    REQUEST_TEAM_COLLECTION = 'REQUEST_TEAM_COLLECTION',
    RECEIVE_TEAMS = 'RECEIVE_TEAMS',
}

export type TeamAction =
    | RequestTeamAction
    | RequestTeamCollectionAction
    | ReceiveTeamsAction;

interface RequestTeamAction {
    type: TeamActionTypeKeys.REQUEST_TEAM;
    id: string;
}

function requestTeam(id: string): RequestTeamAction {
    return {
        type: TeamActionTypeKeys.REQUEST_TEAM,
        id
    };
}

interface RequestTeamCollectionAction {
    type: TeamActionTypeKeys.REQUEST_TEAM_COLLECTION;
    page: number;
}

function requestTeamCollection(page: number): RequestTeamCollectionAction {
    return {
        type: TeamActionTypeKeys.REQUEST_TEAM_COLLECTION,
        page
    };
}

interface ReceiveTeamsAction {
    type: TeamActionTypeKeys.RECEIVE_TEAMS;
    receivedAt: number;
    data: OrderedMap<string, Team>;
    page?: CollectionPage;
}

function receiveTeams(teams: OrderedMap<string, Team>, page?: CollectionPage): ReceiveTeamsAction {
    return {
        type: TeamActionTypeKeys.RECEIVE_TEAMS,
        receivedAt: Date.now(),
        data: teams,
        page: page
    };
}

function removeTeam(id: string): RemoveResourceObjectAction {
    return {
        type: ResourceObjectActionType.REMOVE_RESOURCE_OBJECT,
        resourceObjectType: 'teams',
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