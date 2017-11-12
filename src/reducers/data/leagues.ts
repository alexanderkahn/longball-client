import {keyBy} from "lodash";
import {RECEIVE_LEAGUES} from "../../actions/leagues";

export const leagues = (state = {}, action: any) => {
    switch (action.type) {
        case RECEIVE_LEAGUES:
            return {
                ...state,
                ...keyBy(action.data, league => league.id)
            };
        default:
            return state;
    }
};