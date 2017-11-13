import {keyBy} from "lodash";
import {RECEIVE_ROSTER_POSITIONS} from "../../actions/rosterpositions";

export const rosterPositions = (state = {}, action: any): any => {
    switch (action.type) {
        case RECEIVE_ROSTER_POSITIONS:
            return {
                ...state,
                ...keyBy(action.data, rosterPosition => rosterPosition.id)
            };
        default:
            return state;
    }
};