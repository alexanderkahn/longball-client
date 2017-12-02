import { Person } from '../../models/models';
import { PeopleAction, PeopleActionTypeKeys } from '../../actions/people';
import { List, Map } from 'immutable';
import { initialState, mergePages, ResourceObjectState } from './index';

export const people = (state: ResourceObjectState<Person> = initialState(), action: PeopleAction): ResourceObjectState<Person> => {
    switch (action.type) {
        case PeopleActionTypeKeys.RECEIVE_PEOPLE:
            return {
                ...state,
                pageInfo: mergePages(List(action.data.map(person => person.id)), state.pageInfo, action.page),
                data: state.data.merge(Map(action.data.map(person => [person.id, person])))
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