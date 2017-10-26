import {getIdTokenPromise} from "./session";

export function fetchJson(resourceUrl) {
    return getIdTokenPromise()
        .then(token => fetch(resourceUrl, getHeaders(token)))
        .then(
            response => response,

            //TODO this is obviously not good enough. push to an error page or something, or the app breaks on error
            error => console.log('An error occurred.', error)
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
