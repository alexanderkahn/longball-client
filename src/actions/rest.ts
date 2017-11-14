import { getIdTokenPromise } from './session';
import { ResourceObject } from '../models/models';

export interface DataResponse<T extends ResourceObject> {
    data: Array<T>;
    included?: Array<ResourceObject>;
}
async function getJsonResponse(url: string): Promise<{data: {}, included?: {}}> {
    const token = await getIdTokenPromise();
    const response = await fetch(url, getHeaders(token));
    return await response.json();
}

function getFormattedUrl(url: string, includes?: Array<string>) {
    if (includes) {
        includes.forEach(include => {
            let operator = url.indexOf('?') >= 0 ? '&' : '?';
            url += `${operator}include=${include}`;
        });
    }
    return url;
}

export async function fetchCollection<T extends ResourceObject>(type: string, page: number, includes?: Array<string>):
Promise<DataResponse<T>> {
    let url = getFormattedUrl(`/rest/${type}?page=${page}`, includes);
    const json = await getJsonResponse(url);
    let data = json.data as Array<T>;
    let included = json.included as Array<ResourceObject>;
    return {data, included};
}

export async function fetchObject<T extends ResourceObject>(type: string, id: string, includes?: Array<string>):
Promise<DataResponse<T>> {
    let url = getFormattedUrl(`/rest/${type}/${id}`, includes);
    const json = await getJsonResponse(url);
    let data = json.data as T;
    return {data: new Array(data)};
}

function getHeaders(authToken: string) {
    return {
        headers: {
            Authorization: 'Bearer ' + authToken,
        }
    };
}
