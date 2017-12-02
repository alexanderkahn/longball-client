import { Person } from '../../models/models';
import { PeopleAction, PeopleActionTypeKeys } from '../../actions/people';
import { Map } from 'immutable';

export interface PeopleState {
    readonly data: Map<string, Person>;
}

const initialState: PeopleState = {
    data: Map(),
};

export const people = (state: PeopleState = initialState, action: PeopleAction): PeopleState => {
    switch (action.type) {
        case PeopleActionTypeKeys.RECEIVE_PEOPLE:
            return {
                ...state,
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