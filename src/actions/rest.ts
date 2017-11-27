import { getIdTokenPromise } from './session';
import { ResourceObject } from '../models/models';

export interface MetaResponse {
    meta: {
        status: number,
    };
}

export interface ObjectResponse<T extends ResourceObject> extends MetaResponse {
    meta: {
        status: number,
    };
    data: T;
    included?: Array<ResourceObject>;
}

export interface CollectionResponse<T extends ResourceObject> extends MetaResponse {
    meta: {
        status: number,
    };
    data: Array<T>;
    included?: Array<ResourceObject>;
}

interface RequestOptions {
    method: string;
    headers: { [header: string]: {} }; // TODO: can I change this to a map?
    body?: {};
}

interface JsonResponse {
    request: {
        url: string;
        options: RequestOptions;
    };
    status: number;
    headers: Headers;
    json: {};
}

async function fetchJson(url: string, options: RequestOptions): Promise<JsonResponse> {
    const token = await getIdTokenPromise();
    options.headers.Authorization = 'Bearer ' + token;
    const response = await fetch(url, options);
    const json = await response.json();
    return {request: {url, options}, status: response.status, headers: response.headers, json};
}

async function getJsonResponse<T>(url: string): Promise<T> {
    const response = await fetchJson(url, {
        method: 'GET',
        headers: {}
    });
    if (response.status !== 200) {
        throw formatResponseError(response);
    }
    return response.json as T;
}

async function getJsonPostResponse<T extends ResourceObject>(url: string, body: T): Promise<ObjectResponse<T>> {
    const response = await fetchJson(url, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({data: body})
    });
    if (response.status !== 201) {
        throw formatResponseError(response);

    }
    return response.json as Promise<ObjectResponse<T>>;
}

async function getJsonDeleteResponse(url: string): Promise<{ meta: { status: number } }> {
    const response = await fetchJson(url, {
        headers: {},
        method: 'DELETE'
    });
    if (response.status !== 200) {
        throw formatResponseError(response);
    }
    return response.json as ObjectResponse<ResourceObject>;
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

export async function fetchCollection<T extends ResourceObject>(type: string, page: number, includes?: Array<string>)
: Promise<CollectionResponse<T>> {
    const url = getFormattedUrl(`/rest/${type}?page=${page}`, includes);
    return await getJsonResponse<CollectionResponse<T>>(url);
}

export async function fetchObject<T extends ResourceObject>(type: string, id: string, includes?: Array<string>)
: Promise<ObjectResponse<T>> {
    const url = getFormattedUrl(`/rest/${type}/${id}`, includes);
    return await getJsonResponse<ObjectResponse<T>>(url);

}

// TODO: why not return ObjectResponse<T>?
export async function postObject<T extends ResourceObject>(object: T): Promise<T> {
    const url = `/rest/${object.type}`;
    const json = await getJsonPostResponse(url, object);
    return json.data as T;
}

export async function deleteObject<T extends ResourceObject>(object: T): Promise<number> {
    const url = `/rest/${object.type}/${object.id}`;
    const json = await getJsonDeleteResponse(url);
    return json.meta.status; // TODO: is returning the number necessary here?
}

function formatResponseError(response: JsonResponse): Error {
    return new Error(`Got an unexpected response [${response.status}] for ${response.request.options.method} `
    + `${response.request.url}\n${JSON.stringify(response.json)}`);
}
