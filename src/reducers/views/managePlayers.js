// TODO this is pretty much the exact same class as manageTeams.
// Can I use one class, pass in different actions and give it a different name in the parent reducer?

import {RECEIVE_PLAYERS, REQUEST_PLAYERS} from "../../actions/players";

const initialState = {
    isFetching: false,
    lastFetched: null,
};

export const managePlayers = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_PLAYERS:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_PLAYERS:
            return {
                ...state,
                isFetching: false,
                lastFetched: Date.now()
            };
        default:
            return state;
    }
};