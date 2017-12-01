import { LeagueAction, LeagueActionTypeKeys } from '../../actions/leagues';
import { League } from '../../models/models';
import { Map } from 'immutable';

export const leagues = (state: Map<string, League> = Map(), action: LeagueAction): Map<string, League> => {
    switch (action.type) {
        case LeagueActionTypeKeys.RECEIVE_LEAGUES:
            return state.merge(Map(action.data.map(league => [league.id, league])));
        case LeagueActionTypeKeys.REMOVE_LEAGUE:
            return state.delete(action.removed);
        default:
            return state;
    }
};