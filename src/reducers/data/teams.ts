import { TeamAction, TeamActionTypeKeys } from '../../actions/teams';
import { Team } from '../../models/models';
import { Map } from 'immutable';

export const teams = (state: Map<string, Team> = Map(), action: TeamAction): Map<string, Team> => {
    switch (action.type) {
        case TeamActionTypeKeys.RECEIVE_TEAMS:
            return state.merge(Map(action.data.map(team => [team.id, team])));
        case TeamActionTypeKeys.REMOVE_TEAM:
            return state.delete(action.removed);
        default:
            return state;
    }
};