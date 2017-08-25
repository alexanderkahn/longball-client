export const addNumber = number => {
    return {
        type: 'ADD_NUMBER',
        number
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