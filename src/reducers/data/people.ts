import {keyBy} from "lodash";
import {RECEIVE_PEOPLE} from "../../actions/rosterpositions";

export const people = (state = {}, action: any): any => {
    switch (action.type) {
        case RECEIVE_PEOPLE:
            return {
                ...state,
                ...keyBy(action.data, person => person.id)
            };
        default:
            return state;
    }
};