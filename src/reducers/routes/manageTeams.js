import {RECEIVE_TEAMS, REQUEST_TEAMS} from "../../actions/teams";

const initialState = {
    isFetching: false,
    lastFetched: null,
};

export const manageTeams = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_TEAMS:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_TEAMS:
            return {
                ...state,
                isFetching: false,
                lastFetched: Date.now()
            };
        default:
            return state;
    }
};