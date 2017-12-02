import { LeagueAction, LeagueActionTypeKeys } from '../../actions/leagues';
import { League } from '../../models/models';
import { List, Map } from 'immutable';
import { isNullOrUndefined } from 'util';
import { PageInfo } from './index';

export interface LeaguesState {
    readonly data: Map<string, League>;
    readonly pageInfo: PageInfo;
}

const initialState: LeaguesState = {
    data: Map(),
    pageInfo: {
        totalPages: 1,
        pages: Map()
    }
};

export const leagues = (state: LeaguesState = initialState, action: LeagueAction): LeaguesState => {
    switch (action.type) {
        case LeagueActionTypeKeys.RECEIVE_LEAGUES:
            return {
                ...state,
                pageInfo: leaguePages(state.pageInfo, action),
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

function leaguePages(state: PageInfo, action: LeagueAction): PageInfo {
    if (action.type !== LeagueActionTypeKeys.RECEIVE_LEAGUES || isNullOrUndefined(action.page)) {
        return state;
    } else {
        return {
            ...state,
            totalPages: action.page.totalPages,
            pages: state.pages.set(action.page.number, List(action.data.map(league => league.id)))
        };
    }
}