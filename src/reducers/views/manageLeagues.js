import {RECEIVE_LEAGUES, REQUEST_LEAGUES} from "../../actions/leagues";

const initialState = {
    isFetching: false,
    lastFetched: null,
};

export const manageLeagues = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_LEAGUES:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_LEAGUES:
            return {
                ...state,
                isFetching: false,
                lastFetched: Date.now()
            };
        default:
            return state;
    }
};