import {keyBy} from "lodash";
import {LeagueAction, LeagueActionTypeKeys} from "../../actions/leagues";

export const leagues = (state: any = {}, action: LeagueAction): any => {
    switch (action.type) {
        case LeagueActionTypeKeys.RECEIVE_LEAGUES:
            return {
                ...state,
                ...keyBy(action.data, league => league.id)
            };
        default:
            return state;
    }
};