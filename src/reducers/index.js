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

const numbers = (state = [], action) => {
    switch (action.type) {
        case 'ADD_NUMBER':
            return [
                ...state,
                action.number
            ];
        default:
            return state;
    }
};

const longballStore = combineReducers({
    user,
    numbers
});

export default longballStore