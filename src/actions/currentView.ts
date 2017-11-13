export enum CurrentViewActionTypeKeys {
    RESET_VIEW = 'RESET_VIEW',
    SET_FETCHING = 'SET_FETCHING',
    SET_EDIT = 'SET_EDIT'
}

export type CurrentViewAction =
    | ResetCurrentViewAction
    | SetCurrentViewFetchingAction
    | ToggleCurrentViewEditAction

interface ResetCurrentViewAction {
    type: CurrentViewActionTypeKeys.RESET_VIEW
}

export function resetView(): ResetCurrentViewAction {
    return {
        type: CurrentViewActionTypeKeys.RESET_VIEW
    }
}

interface SetCurrentViewFetchingAction {
    type: CurrentViewActionTypeKeys.SET_FETCHING,
    isFetching: boolean
}

export function setCurrentViewFetching(isFetching: boolean): SetCurrentViewFetchingAction {
    return {
        type: CurrentViewActionTypeKeys.SET_FETCHING,
        isFetching: isFetching
    }
}

interface ToggleCurrentViewEditAction {
    type: CurrentViewActionTypeKeys.SET_EDIT,
}

export function toggleCurrentViewEdit(): ToggleCurrentViewEditAction {
    return {
        type: CurrentViewActionTypeKeys.SET_EDIT,
    }
}