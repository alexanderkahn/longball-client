import {combineReducers} from "redux";

const numbers = (state = [], action) => {
    switch (action.type) {
        case 'ADD_NUMBER':
            return [
                ...state,
                action.number
            ];
        default:
            return state
    }
};

const longballStore = combineReducers({
    numbers
});

export default longballStore