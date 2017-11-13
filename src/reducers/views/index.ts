import {CurrentViewAction, CurrentViewActionTypeKeys} from "../../actions/currentView";

export interface CurrentViewState {
    isFetching: boolean,
    isEdit: boolean,
    lastUpdated?: number
}

const initialState = {
    isFetching: false,
    isEdit: false,
};

export const currentView = (state: CurrentViewState = initialState, action: CurrentViewAction): CurrentViewState => {
    switch (action.type) {
        case CurrentViewActionTypeKeys.RESET_VIEW:
            return {
                isFetching: false,
                isEdit: false,
            };
        case CurrentViewActionTypeKeys.SET_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
                lastUpdated: Date.now(),
            };
        case CurrentViewActionTypeKeys.SET_EDIT:
            return {
                ...state,
                isEdit: !state.isEdit
            };
        default:
            return state;
    }
};