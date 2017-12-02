import { Person } from '../../models/models';
import { PeopleAction, PeopleActionTypeKeys } from '../../actions/people';
import { List, Map } from 'immutable';
import { initialState, PageInfo, ResourceObjectState } from './index';
import { isNullOrUndefined } from 'util';

export const people = (state: ResourceObjectState<Person> = initialState(), action: PeopleAction): ResourceObjectState<Person> => {
    switch (action.type) {
        case PeopleActionTypeKeys.RECEIVE_PEOPLE:
            return {
                ...state,
                pageInfo: peoplePages(state.pageInfo, action),
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

function peoplePages(state: PageInfo, action: PeopleAction): PageInfo {
    if (action.type !== PeopleActionTypeKeys.RECEIVE_PEOPLE || isNullOrUndefined(action.page)) {
        return state;
    } else {
        return {
            ...state,
            totalPages: action.page.totalPages,
            pages: state.pages.set(action.page.number, List(action.data.map(league => league.id)))
        };
    }
}