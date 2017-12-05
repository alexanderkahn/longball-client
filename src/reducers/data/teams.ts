import { TeamAction, TeamActionTypeKeys } from '../../actions/resourceobjects/teams';
import { FetchingState, Team } from '../../models/models';
import { List } from 'immutable';
import { initialState, mergePages, ResourceObjectCache, ResourceObjectState } from './index';
import { ResourceObjectAction, ResourceObjectActionType } from '../../actions/resourceobjects/index';

export const teams = (state: ResourceObjectState<Team> = initialState(), action: TeamAction | ResourceObjectAction)
    : ResourceObjectState<Team> => {
    if (action.type === ResourceObjectActionType.REMOVE_RESOURCE_OBJECT
        && action.resourceObjectType === 'teams') {
        return {
            ...state,
            data: state.data.set(action.removed, new ResourceObjectCache(FetchingState.FETCHED))
        };
    }

    switch (action.type) {
        case TeamActionTypeKeys.REQUEST_TEAM:
            return {
                ...state,
                data: state.data.set(action.id, new ResourceObjectCache(FetchingState.FETCHING))
            };
        case TeamActionTypeKeys.REQUEST_TEAM_COLLECTION:
            return {
                ...state,
                pageInfo: {
                    ...state.pageInfo,
                    pages: state.pageInfo.pages.set(action.page, new ResourceObjectCache(FetchingState.FETCHING))
                }
            };
        case TeamActionTypeKeys.RECEIVE_TEAMS:
            return {
                ...state,
                pageInfo: mergePages(List(action.data.keys()), state.pageInfo, action.page),
                data: state.data.merge(action.data.map(it => new ResourceObjectCache(FetchingState.FETCHED, it)))
            };
        default:
            return state;
    }
};