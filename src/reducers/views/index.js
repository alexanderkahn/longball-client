import {SET_FETCHING} from "../../actions/currentView";

const initialState = {
    isFetching: false,
    lastUpdated: null
};

//TODO: resetView should be a separate action that nulls out lastUpdated
export const currentView = (state = initialState, action) => {
    switch (action.type) {
        case SET_FETCHING:
            return {
                isFetching: action.isFetching,
                lastUpdated: Date.now()
            };
        default:
            return state;
    }
};