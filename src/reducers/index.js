import {combineReducers} from "redux";

const user = (state = null, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {first: 'Keith', last: 'Fudge'};
        case 'LOG_OUT':
            return null;
        default:
            return state;
    }
};

const teams = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TEAM':
            return {
                ...state,
                [action.team.id]: action.team
            };
        default:
            return state;
    }
};

const data = combineReducers({
    teams,
});

const rootReducer = combineReducers({
    user,
    data
});

export default rootReducer