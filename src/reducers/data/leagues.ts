import { LeagueAction, LeagueActionTypeKeys } from '../../actions/leagues';
import { League } from '../../models/models';

export const leagues = (state: Map<string, League> = new Map(), action: LeagueAction): Map<string, League> => {
    switch (action.type) {
        case LeagueActionTypeKeys.RECEIVE_LEAGUES:
            return new Map([...state, ...action.data]);
        case LeagueActionTypeKeys.REMOVE_LEAGUE:
            // TODO: this could be more graceful
            let newState = new Map([...state]);
            newState.delete(action.removed);
            return newState;
        default:
            return state;
    }
};