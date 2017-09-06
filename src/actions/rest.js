import {getIdTokenPromise} from "./session";

export function fetchJson(resourceUrl) {
    return getIdTokenPromise()
        .then(token => fetch(resourceUrl, getHeaders(token)))
        .then(
            response => response,
            error => console.log('An error occurred.', error) //TODO this is obviously not good enough
        )
        .then(response => response.json());
}

function getHeaders(authToken) {
    return {
        headers: {
            Authorization: "Bearer " + authToken,
        }
    };
}
