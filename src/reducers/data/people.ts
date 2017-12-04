import { FetchingState, Person } from '../../models/models';
import { PeopleAction, PeopleActionTypeKeys } from '../../actions/resourceobjects/people';
import { List } from 'immutable';
import { initialState, mergePages, ResourceObjectCache, ResourceObjectState } from './index';

export const people = (state: ResourceObjectState<Person> = initialState(), action: PeopleAction)
    : ResourceObjectState<Person> => {
    switch (action.type) {
        case PeopleActionTypeKeys.RECEIVE_PEOPLE:
            return {
                ...state,
                pageInfo: mergePages(List(action.data.keys()), state.pageInfo, action.page),
                data: state.data.merge(action.data.map(it => new ResourceObjectCache(FetchingState.FETCHED, it)))
            };
        case PeopleActionTypeKeys.REMOVE_PERSON:
            return {
                ...state,
                data: state.data.delete(action.removed)
            };
        default:
            return state;
    }
};