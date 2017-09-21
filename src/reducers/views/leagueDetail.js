import {RECEIVE_LEAGUE_DETAIL, REQUEST_LEAGUE_DETAIL, SELECT_LEAGUE_DETAIL} from "../../actions/leagues";

const initialState = {
    leagueId: "",
    isFetching: false,
};

export const leagueDetail = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_LEAGUE_DETAIL:
            return {
                leagueId: action.leagueId,
                isFetching: false
            };
        case REQUEST_LEAGUE_DETAIL:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_LEAGUE_DETAIL:
            return {
                ...state,
                isFetching: false,
            };
        default:
            return state;
    }
};