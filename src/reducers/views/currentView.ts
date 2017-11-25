import { CurrentViewAction, CurrentViewActionTypeKeys } from '../../actions/currentView';
import { CurrentView } from '../../models/models';

const initialState = {
    isFetching: false,
};

export const currentView = (state: CurrentView = initialState, action: CurrentViewAction): CurrentView => {
    switch (action.type) {
        case CurrentViewActionTypeKeys.RESET_VIEW:
            return {
                isFetching: false,
            };
        case CurrentViewActionTypeKeys.SET_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
                lastUpdated: Date.now(),
            };
        default:
            return state;
    }
};