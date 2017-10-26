import {RESET_VIEW, SET_FETCHING} from "../../actions/currentView";

const initialState = {
    isFetching: false,
    lastUpdated: null
};

export const currentView = (state = initialState, action) => {
    switch (action.type) {
        case RESET_VIEW:
            return {
                isFetching: false,
                lastUpdated: null
            };
        case SET_FETCHING:
            return {
                isFetching: action.isFetching,
                lastUpdated: Date.now()
            };
        default:
            return state;
    }
};