import {keyBy} from "lodash";
import {RECEIVE_PLAYERS} from "../../actions/players";

export const players = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_PLAYERS:
            return {
                ...state,
                ...keyBy(action.data, team => team.id)
            };
        default:
            return state;
    }
};