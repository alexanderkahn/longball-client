import {RECEIVE_TEAMS} from "../../actions/teams";
import {keyBy} from "lodash";

export const teams = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_TEAMS:
            return {
                ...state,
                ...keyBy(action.data, team => team.id)
            };
        default:
            return state;
    }
};