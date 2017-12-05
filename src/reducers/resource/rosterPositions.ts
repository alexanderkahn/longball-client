import { FetchedState, RosterPosition } from '../../models/models';
import { List } from 'immutable';
import { initialState, mergePages, ResourceObjectCache, ResourceObjectState } from './index';
import { ResourceObjectAction, ResourceActionType } from '../../actions/resource/index';

export const rosterPositions = (state: ResourceObjectState<RosterPosition> = initialState(),
                                action: ResourceObjectAction<RosterPosition>)
    : ResourceObjectState<RosterPosition> => {
    if (action.resourceType !== 'rosterpositions') {
        return state;
    }

    switch (action.type) {
        case ResourceActionType.REQUEST_RESOURCE_OBJECT:
            return {
                ...state,
                data: state.data.set(action.id, new ResourceObjectCache(FetchedState.FETCHING))
            };
        case ResourceActionType.REQUEST_RESOURCE_COLLECTION:
            return {
                ...state,
                pageInfo: {
                    ...state.pageInfo,
                    pages: state.pageInfo.pages.set(action.page, new ResourceObjectCache(FetchedState.FETCHING))
                }
            };
        case ResourceActionType.RECEIVE_RESOURCE:
            return {
                ...state,
                pageInfo: mergePages(List(action.data.keys()), state.pageInfo, action.page),
                data: state.data.merge(action.data.map(it => new ResourceObjectCache(FetchedState.FETCHED, it)))
            };
        case ResourceActionType.REMOVE_RESOURCE_OBJECT:
            return {
                ...state,
                data: state.data.set(action.removed, new ResourceObjectCache(FetchedState.FETCHED))
            };
        default:
            return state;
    }
};