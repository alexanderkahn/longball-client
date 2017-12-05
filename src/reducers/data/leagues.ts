import { LeagueAction, LeagueActionTypeKeys } from '../../actions/resourceobjects/leagues';
import { FetchingState, League } from '../../models/models';
import { List } from 'immutable';
import { initialState, mergePages, ResourceObjectCache, ResourceObjectState } from './index';
import { ResourceObjectAction, ResourceObjectActionType } from '../../actions/resourceobjects/index';

export const leagues = (
    state: ResourceObjectState<League> = initialState(),
    action: LeagueAction | ResourceObjectAction): ResourceObjectState<League> => {
    if (action.type === ResourceObjectActionType.REMOVE_RESOURCE_OBJECT
        && action.resourceObjectType === 'leagues') {
        return {
            ...state,
            data: state.data.set(action.removed, new ResourceObjectCache(FetchingState.FETCHED))
        };
    }

    switch (action.type) {
        case LeagueActionTypeKeys.REQUEST_LEAGUE:
            return {
                ...state,
                data: state.data.set(action.id, new ResourceObjectCache(FetchingState.FETCHING))
            };
        case LeagueActionTypeKeys.REQUEST_LEAGUE_COLLECTION:
            return {
                ...state,
                pageInfo: {
                    ...state.pageInfo,
                    pages: state.pageInfo.pages.set(action.page, new ResourceObjectCache(FetchingState.FETCHING))
                }
            };
        case LeagueActionTypeKeys.RECEIVE_LEAGUES:
            return {
                ...state,
                pageInfo: mergePages(List(action.data.keys()), state.pageInfo, action.page),
                data: state.data.merge(action.data.map(it => new ResourceObjectCache(FetchingState.FETCHED, it)))
            };

        default:
            return state;
    }
};