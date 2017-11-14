import { DataResponse, fetchCollection, fetchObject } from './rest';
import { setCurrentViewFetching } from './currentView';
import { Team } from '../models/models';
import { RootState } from '../reducers/index';
import { Dispatch } from 'redux';

export enum TeamActionTypeKeys {
    RECEIVE_TEAMS = 'RECEIVE_TEAMS'
}

export type TeamAction = | ReceiveTeamsAction;

interface ReceiveTeamsAction {
    type: TeamActionTypeKeys.RECEIVE_TEAMS;
    data: Map<string, Team>;
    receivedAt: number;
}

function receiveTeams(teams: Map<string, Team>): ReceiveTeamsAction {
    return {
        type: TeamActionTypeKeys.RECEIVE_TEAMS,
        data: teams,
        receivedAt: Date.now()
    };
}

export function fetchTeams(page: number): Dispatch<RootState> {

    return function (dispatch: Dispatch<RootState>) {
        dispatch(setCurrentViewFetching(true));
        return fetchCollection<Team>('teams', page)
            .then((json: DataResponse<Team>) => {
                dispatch(receiveTeams(json.data));
                dispatch(setCurrentViewFetching(false));
            });
    };
}

export function fetchTeamDetail(teamId: string): Dispatch<RootState> {
    return function (dispatch: Dispatch<RootState>) {
        dispatch(setCurrentViewFetching(true));
        return fetchObject<Team>('teams', teamId)
            .then((json: DataResponse<Team>) => {
                dispatch(receiveTeams(json.data));
                dispatch(setCurrentViewFetching(false));
            });
    };
}