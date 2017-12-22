
export enum LeagueFormActionType {
    UPDATE_LEAGUE_NAME = 'REQUEST_RESOURCE_OBJECT',
}

export interface UpdateLeagueNameAction {
    type: LeagueFormActionType.UPDATE_LEAGUE_NAME;
    name: string;
}

export type LeagueFormAction =
    | UpdateLeagueNameAction;

export function updateLeagueName(name: string): UpdateLeagueNameAction {
    return {
        type: LeagueFormActionType.UPDATE_LEAGUE_NAME,
        name
    };
}
