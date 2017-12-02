import { LeagueAction, LeagueActionTypeKeys } from '../../actions/leagues';
import { League } from '../../models/models';
import { Map } from 'immutable';

export interface LeaguesState {
    readonly data: Map<string, League>;
}

const initialState: LeaguesState = {
    data: Map(),
};

export const leagues = (state: LeaguesState = initialState, action: LeagueAction): LeaguesState => {
    switch (action.type) {
        case LeagueActionTypeKeys.RECEIVE_LEAGUES:
            return {
                ...state,
                data: state.data.merge(Map(action.data.map(league => [league.id, league])))
            };
        case LeagueActionTypeKeys.REMOVE_LEAGUE:
            return {
                ...state,
                data: state.data.delete(action.removed)
            };
        default:
            return state;
    }
};