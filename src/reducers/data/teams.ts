import { TeamAction, TeamActionTypeKeys } from '../../actions/teams';
import { Team } from '../../models/models';
import { List, Map } from 'immutable';
import { initialState, mergePages, ResourceObjectState } from './index';

export const teams = (state: ResourceObjectState<Team> = initialState(), action: TeamAction)
    : ResourceObjectState<Team> => {
    switch (action.type) {
        case TeamActionTypeKeys.RECEIVE_TEAMS:
            return {
                ...state,
                pageInfo: mergePages(List(action.data.map(team => team.id)), state.pageInfo, action.page),
                data: state.data.merge(Map(action.data.map(team => [team.id, team])))
            };
        case TeamActionTypeKeys.REMOVE_TEAM:
            return {
                ...state,
                data: state.data.delete(action.removed)
            };
        default:
            return state;
    }
};