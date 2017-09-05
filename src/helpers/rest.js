import {getSessionJwtToken} from "./session";

export function fetchJson(resourceUrl) {
    const authHeader = "Bearer " + getSessionJwtToken();
    const fetchInit = {
        headers: {
            //TODO temporary prototype solution until oauth is implemented
            Authorization: authHeader,
        }
    };

    console.info(fetchInit);
    return fetch(resourceUrl, fetchInit)
        .then(
            response => response,
            error => console.log('An error occurred.', error) //TODO this is obviously not good enough
        )
        .then(response => response.json());
}