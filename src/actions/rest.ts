import { getIdTokenPromise } from './session';
import { ResourceObject } from '../models/models';

export interface DataResponse<T extends ResourceObject> {
    data: Map<string, T>;
    included?: Map<string, ResourceObject>;
}

async function getJsonResponse(url: string): Promise<{ data: {}, included?: {} }> {
    const token = await getIdTokenPromise();
    const response = await fetch(url, {
        headers: getHeaders(token)
    });
    return await response.json();
}

async function getJsonPostResponse(url: string, body: ResourceObject): Promise<{ data: {} }> {
    const token = await getIdTokenPromise();
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({data: body}),
        headers: {...getHeaders(token), 'Content-Type': 'application/json'}
    });
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

function toMap<T extends ResourceObject>(objects: Array<T>): Map<string, T> {
    let map: Map<string, T> = new Map();
    objects.forEach(obj => map.set(obj.id, obj));
    return map;
}

export async function fetchCollection<T extends ResourceObject>(type: string, page: number, includes?: Array<string>)
: Promise<DataResponse<T>> {
    const url = getFormattedUrl(`/rest/${type}?page=${page}`, includes);
    const json = await getJsonResponse(url);
    const data = json.data as Array<T>;

    const included = json.included as Array<ResourceObject>;
    if (included) {
        return {data: toMap(data), included: toMap(included)};
    }
    return {data: toMap(data)};
}

export async function fetchObject<T extends ResourceObject>(type: string, id: string, includes?: Array<string>)
: Promise<DataResponse<T>> {
    const url = getFormattedUrl(`/rest/${type}/${id}`, includes);
    const json = await getJsonResponse(url);
    const data = json.data as T;
    const included = json.included as Array<ResourceObject>;
    if (included) {
        return {data: new Map().set(data.id, data), included: toMap(included)};
    }
    return {data: new Map().set(data.id, data)};
}

export async function postObject<T extends ResourceObject>(object: T): Promise<T> {
    const url = `/rest/${object.type}`;
    const json = await getJsonPostResponse(url, object);
    return json.data as T;
}

function getHeaders(authToken: string) {
    return {
        Authorization: 'Bearer ' + authToken,
    };
}
