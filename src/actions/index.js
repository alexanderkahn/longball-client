export const ADD_TEAM = team => {
    return {
        type: 'ADD_TEAM',
        team
    }
};

export function LOG_IN() {
    return {
        type: 'LOG_IN'
    }
}

export function LOG_OUT() {
    return {
        type: 'LOG_OUT'
    }
}