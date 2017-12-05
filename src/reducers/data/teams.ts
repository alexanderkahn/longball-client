import { FetchingState, Team } from '../../models/models';
import { List } from 'immutable';
import { initialState, mergePages, ResourceObjectCache, ResourceObjectState } from './index';
import { ResourceObjectAction, ResourceActionType } from '../../actions/resourceobjects/index';

export const teams = (state: ResourceObjectState<Team> = initialState(), action: ResourceObjectAction<Team>)
    : ResourceObjectState<Team> => {
    if (action.resourceType !== 'teams') {
        return state;
    }

    switch (action.type) {
        case ResourceActionType.REQUEST_RESOURCE_OBJECT:
            return {
                ...state,
                data: state.data.set(action.id, new ResourceObjectCache(FetchingState.FETCHING))
            };
        case ResourceActionType.REQUEST_RESOURCE_COLLECTION:
            return {
                ...state,
                pageInfo: {
                    ...state.pageInfo,
                    pages: state.pageInfo.pages.set(action.page, new ResourceObjectCache(FetchingState.FETCHING))
                }
            };
        case ResourceActionType.RECEIVE_RESOURCE:
            return {
                ...state,
                pageInfo: mergePages(List(action.data.keys()), state.pageInfo, action.page),
                data: state.data.merge(action.data.map(it => new ResourceObjectCache(FetchingState.FETCHED, it)))
            };
        case ResourceActionType.REMOVE_RESOURCE_OBJECT:
            return {
                ...state,
                data: state.data.set(action.removed, new ResourceObjectCache(FetchingState.FETCHED))
            };
        default:
            return state;
    }
};