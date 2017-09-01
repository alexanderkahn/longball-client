import {RECEIVE_PLAYER_DETAIL, REQUEST_PLAYER_DETAIL, SELECT_PLAYER_DETAIL} from "../../actions/players";

const initialState = {
    playerId: "",
    isFetching: false,
};

export const playerDetail = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_PLAYER_DETAIL:
            return {
                playerId: action.playerId,
                isFetching: false
            };
        case REQUEST_PLAYER_DETAIL:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_PLAYER_DETAIL:
            return {
                ...state,
                isFetching: false,
            };
        default:
            return state;
    }
};