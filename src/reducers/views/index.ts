import {RESET_VIEW, SET_EDIT, SET_FETCHING} from "../../actions/currentView";

const initialState = {
    isFetching: false,
    isEdit: false,
    lastUpdated: null
};

export const currentView = (state = initialState, action: any) => {
    switch (action.type) {
        case RESET_VIEW:
            return {
                isFetching: false,
                isEdit: false,
                lastUpdated: null
            };
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
                lastUpdated: Date.now(),
            };
        case SET_EDIT:
            return {
                ...state,
                isEdit: !state.isEdit
            };
        default:
            return state;
    }
};