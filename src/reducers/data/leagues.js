import {keyBy} from "lodash";
import {RECEIVE_LEAGUE_DETAIL, RECEIVE_LEAGUES} from "../../actions/leagues";

export const leagues = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_LEAGUES:
            return {
                ...state,
                ...keyBy(action.data, league => league.id)
            };
        case RECEIVE_LEAGUE_DETAIL:
            return {
                ...state,
                [action.data.id]: action.data
            };
        default:
            return state;
    }
};