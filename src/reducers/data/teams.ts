import { TeamAction, TeamActionTypeKeys } from '../../actions/teams';
import { Team } from '../../models/models';
import { List, Map } from 'immutable';
import { initialState, PageInfo, ResourceObjectState } from './index';
import { isNullOrUndefined } from 'util';

export const teams = (state: ResourceObjectState<Team> = initialState(), action: TeamAction)
    : ResourceObjectState<Team> => {
    switch (action.type) {
        case TeamActionTypeKeys.RECEIVE_TEAMS:
            return {
                ...state,
                pageInfo: teamsPages(state.pageInfo, action),
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

function teamsPages(state: PageInfo, action: TeamAction): PageInfo {
    if (action.type !== TeamActionTypeKeys.RECEIVE_TEAMS || isNullOrUndefined(action.page)) {
        return state;
    } else {
        return {
            ...state,
            totalPages: action.page.totalPages,
            pages: state.pages.set(action.page.number, List(action.data.map(league => league.id)))
        };
    }
}