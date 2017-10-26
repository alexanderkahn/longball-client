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