import { FetchedState, Person } from '../../models/models';
import { List } from 'immutable';
import { initialState, mergePages, ResourceObjectCache, ResourceObjectState } from './index';
import { ResourceObjectAction, ResourceActionType } from '../../actions/resourceobjects/index';

export const people = (state: ResourceObjectState<Person> = initialState(), action: ResourceObjectAction<Person>)
    : ResourceObjectState<Person> => {
    if (action.resourceType !== 'people') {
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