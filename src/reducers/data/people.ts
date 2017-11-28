import { Person } from '../../models/models';
import { PeopleAction, PeopleActionTypeKeys } from '../../actions/people';

export const people = (state: Map<string, Person> = new Map(), action: PeopleAction): Map<string, Person> => {
    switch (action.type) {
        case PeopleActionTypeKeys.RECEIVE_PEOPLE:
            return new Map([...state, ...action.data]);
        default:
            return state;
    }
};