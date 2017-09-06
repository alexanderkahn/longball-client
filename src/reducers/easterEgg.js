import {INCREMENT_CREDITS_CLICK, RESET_CREDITS_CLICK} from "../actions/easteregg";

const initialState = {creditsCount: 0};

export const easterEgg = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT_CREDITS_CLICK:
            return {
                ...state,
                creditsCount: state.creditsCount + 1
            };
        case RESET_CREDITS_CLICK:
            return {
                ...state,
                creditsCount: 0
            };
        default:
            return state;
    }
};