export const ADD_TEAM = 'ADD_TEAM';
export function addTeam(team) {
    return {
        type: ADD_TEAM,
        team
    }
};

export const REQUEST_TEAMS = 'REQUEST_TEAMS';
export function requestTeams(pageStart) {
    return {
        type: REQUEST_TEAMS,
        pageStart
    }
}