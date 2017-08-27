import {ADD_TEAM} from "../actions/teams";

export const teams = (state = {}, action) => {
    switch (action.type) {
        case ADD_TEAM:
            return {
                ...state,
                [action.team.id]: action.team
            };
        default:
            return state;
    }
};