import { EasterEggActions, EasterEggActionTypeKeys } from '../actions/easteregg';

interface EasterEggState {
    creditsCount: number;
}

const initialState = {creditsCount: 0};

export const easterEgg = (state: EasterEggState = initialState, action: EasterEggActions): any => {
    switch (action.type) {
        case EasterEggActionTypeKeys.INCREMENT_CREDITS:
            return {
                ...state,
                creditsCount: state.creditsCount + 1
            };
        case EasterEggActionTypeKeys.RESET_CREDITS:
            return {
                ...state,
                creditsCount: 0
            };
        default:
            return state;
    }
};