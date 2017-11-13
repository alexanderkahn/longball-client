export enum EasterEggActionTypeKeys {
    INCREMENT_CREDITS = 'INCREMENT_CREDITS',
    RESET_CREDITS = 'RESET_CREDITS'
}

export type EasterEggActions = | IncrementCreditsAction | ResetCreditsAction

interface IncrementCreditsAction {
    type: EasterEggActionTypeKeys.INCREMENT_CREDITS
}

export function incrementCreditsClick(): IncrementCreditsAction {
    return {
        type: EasterEggActionTypeKeys.INCREMENT_CREDITS,
    }
}

interface ResetCreditsAction {
    type: EasterEggActionTypeKeys.RESET_CREDITS,
}

export function resetCreditsClick(): ResetCreditsAction {
    return {
        type: EasterEggActionTypeKeys.RESET_CREDITS,
    }
}