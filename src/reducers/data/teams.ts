import { TeamAction, TeamActionTypeKeys } from '../../actions/teams';
import { Team } from '../../models/models';
import { toMap } from './index';

export const teams = (state: Map<string, Team> = new Map(), action: TeamAction): Map<string, Team> => {
    switch (action.type) {
        case TeamActionTypeKeys.RECEIVE_TEAMS:
            return toMap(state, action.data);
        case TeamActionTypeKeys.REMOVE_TEAM:
            let newMap = new Map([...state]);
            newMap.delete(action.removed);
            return newMap;
        default:
            return state;
    }
};