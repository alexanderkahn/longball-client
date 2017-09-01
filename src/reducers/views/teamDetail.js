import {RECEIVE_TEAM_DETAIL, REQUEST_TEAM_DETAIL, SELECT_TEAM_DETAIL} from "../../actions/teams";

const initialState = {
    teamId: "",
    isFetching: false,
};

export const teamDetail = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_TEAM_DETAIL:
            return {
                teamId: action.teamId,
                isFetching: false
            };
        case REQUEST_TEAM_DETAIL:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_TEAM_DETAIL:
            return {
                ...state,
                isFetching: false,
            };
        default:
            return state;
    }
};