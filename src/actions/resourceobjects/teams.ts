import { CollectionPage, deleteObject, fetchCollection, fetchObject, postObject } from '../rest';
import { setCurrentViewFetching } from '../currentView';
import { Team } from '../../models/models';
import { RootState } from '../../reducers/index';
import { Dispatch } from 'redux';
import { replace } from 'react-router-redux';
import { OrderedMap } from 'immutable';

export enum TeamActionTypeKeys {
    REQUEST_TEAM = 'REQUEST_TEAM',
    REQUEST_TEAM_COLLECTION = 'REQUEST_TEAM_COLLECTION',
    RECEIVE_TEAMS = 'RECEIVE_TEAMS',
    REMOVE_TEAM = 'REMOVE_TEAM'
}

export type TeamAction =
    | RequestTeamAction
    | RequestTeamCollectionAction
    | ReceiveTeamsAction
    | RemoveTeamAction;

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

interface RemoveTeamAction {
    type: TeamActionTypeKeys.REMOVE_TEAM;
    removed: string;
}

function removeTeam(id: string): RemoveTeamAction {
    return {
        type: TeamActionTypeKeys.REMOVE_TEAM,
        removed: id
    };
}

export function fetchTeams(page: number): Dispatch<RootState> {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(setCurrentViewFetching(true));
        dispatch(requestTeamCollection(page));
        const collection = await fetchCollection<Team>('teams', page);
        dispatch(receiveTeams(OrderedMap(collection.data.map(team => [team.id, team])), collection.meta.page));
        dispatch(setCurrentViewFetching(false));
    };
}

export function fetchTeamDetail(teamId: string): Dispatch<RootState> {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(setCurrentViewFetching(true));
        dispatch(requestTeam(teamId));
        const object = await fetchObject<Team>('teams', teamId);
        dispatch(receiveTeams(OrderedMap([[teamId, object ? object.data : null]])));
        dispatch(setCurrentViewFetching(false));
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