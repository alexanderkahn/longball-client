import { EasterEggActions, EasterEggActionTypeKeys } from '../actions/easteregg';

export interface EasterEggState {
    creditsCount: number;
}

const initialState = {creditsCount: 0};

export const easterEgg = (state: EasterEggState = initialState, action: EasterEggActions): EasterEggState => {
    switch (action.type) {
        case EasterEggActionTypeKeys.INCREMENT_CREDITS:
            return {
                creditsCount: state.creditsCount + 1
            };
        case EasterEggActionTypeKeys.RESET_CREDITS:
            return {
                creditsCount: 0
            };
        default:
            return state;
    }
};