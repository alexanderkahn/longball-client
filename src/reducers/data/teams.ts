import { TeamAction, TeamActionTypeKeys } from '../../actions/resourceobjects/teams';
import { Team } from '../../models/models';
import { List } from 'immutable';
import { initialState, mergePages, ResourceObjectCache, ResourceObjectState } from './index';

export const teams = (state: ResourceObjectState<Team> = initialState(), action: TeamAction)
    : ResourceObjectState<Team> => {
    switch (action.type) {
        case TeamActionTypeKeys.REQUEST_TEAM:
            return {
                ...state,
                data: state.data.set(action.id, new ResourceObjectCache(true))
            };
        case TeamActionTypeKeys.REQUEST_TEAM_COLLECTION:
            return {
                ...state,
                pageInfo: {
                    ...state.pageInfo,
                    pages: state.pageInfo.pages.set(action.page, new ResourceObjectCache(true))
                }
            };
        case TeamActionTypeKeys.RECEIVE_TEAMS:
            return {
                ...state,
                pageInfo: mergePages(List(action.data.keys()), state.pageInfo, action.page),
                data: state.data.merge(action.data.map(it => new ResourceObjectCache(false, it)))
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