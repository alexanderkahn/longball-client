import { TeamAction, TeamActionTypeKeys } from '../../actions/teams';
import { Team } from '../../models/models';

export const teams = (state: Map<string, Team> = new Map(), action: TeamAction): Map<string, Team> => {
    switch (action.type) {
        case TeamActionTypeKeys.RECEIVE_TEAMS:
            return new Map([...state, ...action.data]);
        default:
            return state;
    }
};