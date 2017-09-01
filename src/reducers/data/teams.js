import {RECEIVE_TEAM_DETAIL, RECEIVE_TEAMS} from "../../actions/teams";
import {keyBy} from "lodash";

export const teams = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_TEAMS:
            return {
                ...state,
                ...keyBy(action.data, team => team.id)
            };
        case RECEIVE_TEAM_DETAIL:
            return {
                ...state,
                [action.data.id]: action.data
            };
        default:
            return state;
    }
};