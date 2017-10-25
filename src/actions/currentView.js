export const SET_FETCHING = 'SET_FETCHING';
export function setCurrentViewFetching(isFetching) {
    return {
        type: SET_FETCHING,
        isFetching
    }
}