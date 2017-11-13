import {getIdTokenPromise} from "./session";

export function fetchJson(resourceUrl: string): any {
    return getIdTokenPromise()
        .then(token => fetch(resourceUrl, getHeaders(token)))
        .then(response => response.json());
}

function getHeaders(authToken: string) {
    return {
        headers: {
            Authorization: "Bearer " + authToken,
        }
    };
}
