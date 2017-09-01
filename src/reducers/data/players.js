import {keyBy} from "lodash";
import {RECEIVE_PLAYER_DETAIL, RECEIVE_PLAYERS} from "../../actions/players";

export const players = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_PLAYERS:
            return {
                ...state,
                ...keyBy(action.data, team => team.id)
            };
        case RECEIVE_PLAYER_DETAIL:
            return {
                ...state,
                [action.data.id]: action.data
            };
        default:
            return state;
    }
};