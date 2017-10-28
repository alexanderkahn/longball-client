export const RESET_VIEW = 'RESET_VIEW';
export function resetView() {
    return {
        type: RESET_VIEW
    }
}

export const SET_FETCHING = 'SET_FETCHING';
export function setCurrentViewFetching(isFetching) {
    return {
        type: SET_FETCHING,
        isFetching
    }
}

export const SET_EDIT = 'SET_EDIT';
export function toggleCurrentViewEdit() {
    return {
        type: SET_EDIT
    }
}