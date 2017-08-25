export const addTeam = team => {
    return {
        type: 'ADD_TEAM',
        team
    }
};

export function logIn() {
    return {
        type: 'LOG_IN'
    }
}

export function logOut() {
    return {
        type: 'LOG_OUT'
    }
}