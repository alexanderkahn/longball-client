import {DEV_AUTH_HEADER} from "../local/index";

const fetchInit = {
    headers: {
        //TODO temporary prototype solution until oauth is implemented
        Authorization: DEV_AUTH_HEADER,
    }
};

export function fetchJson(resourceUrl) {
    return fetch(resourceUrl, fetchInit)
        .then(
            response => response,
            error => console.log('An error occurred.', error) //TODO this is obviously not good enough
        )
        .then(response => response.json());
}