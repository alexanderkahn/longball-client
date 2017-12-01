import { Person } from '../../models/models';
import { PeopleAction, PeopleActionTypeKeys } from '../../actions/people';
import { Map } from 'immutable';

export const people = (state: Map<string, Person> = Map(), action: PeopleAction): Map<string, Person> => {
    switch (action.type) {
        case PeopleActionTypeKeys.RECEIVE_PEOPLE:
            return state.merge(Map(action.data.map(person => [person.id, person])));
        case PeopleActionTypeKeys.REMOVE_PERSON:
            return state.delete(action.removed);
        default:
            return state;
    }
};