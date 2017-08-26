export const ADD_TEAM = 'ADD_TEAM';
export function addTeam(team) {
    return {
        type: ADD_TEAM,
        team
    }
};

export const LOG_IN = 'LOG_IN';
export function logIn() {
    return {
        type: LOG_IN
    }
}

export const LOG_OUT = 'LOG_OUT';
export function logOut() {
    return {
        type: LOG_OUT
    }
}