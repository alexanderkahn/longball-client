import { LeagueAction, LeagueActionTypeKeys } from '../../actions/resourceobjects/leagues';
import { League } from '../../models/models';
import { List } from 'immutable';
import { initialState, mergePages, ResourceObjectState } from './index';

export const leagues = (state: ResourceObjectState<League> = initialState(), action: LeagueAction)
    : ResourceObjectState<League> => {
    switch (action.type) {
        case LeagueActionTypeKeys.RECEIVE_LEAGUES:
            return {
                ...state,
                pageInfo: mergePages(List(action.data.keys()), state.pageInfo, action.page),
                data: state.data.merge(action.data)
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