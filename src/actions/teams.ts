import { deleteObject, fetchCollection, fetchObject, postObject } from './rest';
import { setCurrentViewFetching } from './currentView';
import { Team } from '../models/models';
import { RootState } from '../reducers/index';
import { Dispatch } from 'redux';
import { replace } from 'react-router-redux';

export enum TeamActionTypeKeys {
    RECEIVE_TEAMS = 'RECEIVE_TEAMS',
    REMOVE_TEAM = 'REMOVE_TEAM'
}

export type TeamAction = | ReceiveTeamsAction | RemoveTeamAction;

interface ReceiveTeamsAction {
    type: TeamActionTypeKeys.RECEIVE_TEAMS;
    data: Array<Team>;
    receivedAt: number;
}

interface RemoveTeamAction {
    type: TeamActionTypeKeys.REMOVE_TEAM;
    removed: string;
}

function receiveTeams(teams: Array<Team>): ReceiveTeamsAction {
    return {
        type: TeamActionTypeKeys.RECEIVE_TEAMS,
        data: teams,
        receivedAt: Date.now()
    };
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
        const collection = await fetchCollection<Team>('teams', page);
        dispatch(receiveTeams(collection.data));
        dispatch(setCurrentViewFetching(false));
    };
}

export function fetchTeamDetail(teamId: string): Dispatch<RootState> {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(setCurrentViewFetching(true));
        const object = await fetchObject<Team>('teams', teamId);
        dispatch(receiveTeams([object.data]));
        dispatch(setCurrentViewFetching(false));
    };
}

export function saveTeam(team: Team): Dispatch<RootState> {
    return async function (dispatch: Dispatch<RootState>) {
        const saveResponse = await postObject(team);
        dispatch(receiveTeams([saveResponse]));
        dispatch(replace(`/manage/teams/${saveResponse.id}`));
    };
}

export function deleteTeam(team: Team): Dispatch<RootState> {
    return async function  (dispatch: Dispatch<RootState>) {
        await deleteObject(team);
        dispatch(removeTeam(team.id));
    };
}