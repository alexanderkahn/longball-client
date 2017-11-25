export enum CurrentViewActionTypeKeys {
    RESET_VIEW = 'RESET_VIEW',
    SET_FETCHING = 'SET_FETCHING',
}

export type CurrentViewAction =
    | ResetCurrentViewAction
    | SetCurrentViewFetchingAction;

interface ResetCurrentViewAction {
    type: CurrentViewActionTypeKeys.RESET_VIEW;
}

export function resetView(): ResetCurrentViewAction {
    return {
        type: CurrentViewActionTypeKeys.RESET_VIEW
    };
}

interface SetCurrentViewFetchingAction {
    type: CurrentViewActionTypeKeys.SET_FETCHING;
    isFetching: boolean;
}

export function setCurrentViewFetching(isFetching: boolean): SetCurrentViewFetchingAction {
    return {
        type: CurrentViewActionTypeKeys.SET_FETCHING,
        isFetching: isFetching
    };
}