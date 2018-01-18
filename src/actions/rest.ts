import { getIdTokenPromise } from './session';
import { PageDescriptor, PageResultsMeta } from '../reducers/resource/page';
import { ResourceObject } from '../reducers/resource';

export interface MetaResponse {
    meta: {
        status: number,
        page?: PageResultsMeta
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
        page: PageResultsMeta
    };
    data: Array<T>;
    included?: Array<ResourceObject>;
}

interface RequestOptions extends RequestInit {
    method: RequestMethod;
    headers: Array<Array<string>>;
    body?: {};
}

type RequestMethod = 'GET' | 'POST' | 'DELETE';

interface JsonResponse {
    request: {
        url: string;
        options: RequestOptions;
    };
    status: number;
    headers: Headers;
    json: {};
}

class InvalidRequestError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidRequestError';
    }
}

class NotFoundServerResponseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundServerResponseError';
    }
}

class UnexpectedServerResponseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UnexpectedServerResponseError';
    }
}

async function fetchJson(url: string, options: RequestOptions): Promise<JsonResponse> {
    const token = await getIdTokenPromise();
    options.headers.push(['Authorization', 'Bearer ' + token]);
    const response = await fetch(url, options);
    const json = await response.json();
    return {request: {url, options}, status: response.status, headers: response.headers, json};
}

async function getJsonGetResponse<T>(url: string): Promise<T> {
    const response = await fetchJson(url, {
        method: 'GET',
        headers: []
    });
    if (response.status === 200) {
        return response.json as T;
    } else if (response.status === 404) {
        throw new NotFoundServerResponseError(`not found:  ${url}`);
    } else {
        throw formatUnexpectedResponseError(response);
    }

}

async function getJsonPostResponse<T extends ResourceObject>(url: string, body: T): Promise<ObjectResponse<T>> {
    const response = await fetchJson(url, {
        headers: [['Content-Type', 'application/json']],
        method: 'POST',
        body: JSON.stringify({data: body})
    });
    if (response.status !== 201) {
        throw formatUnexpectedResponseError(response);

    }
    return response.json as Promise<ObjectResponse<T>>;
}

async function getJsonDeleteResponse(url: string): Promise<{ meta: { status: number } }> {
    const response = await fetchJson(url, {
        headers: [],
        method: 'DELETE'
    });
    if (response.status !== 200) {
        throw formatUnexpectedResponseError(response);
    }
    return response.json as ObjectResponse<ResourceObject>;
}

function getFormattedUrl(baseUrl: string, page?: PageDescriptor, includes?: Array<string>) {
    const params: Array<string> = [];
    if (page) {
        const adjustedPage = page.pageNumber - 1;
        if (0 > adjustedPage) {
            throw new Error('Invalid page number for request: ' + page.pageNumber);
        }
        params.push(`page=${adjustedPage}`);
        page.filters.forEach((value, key) => params.push(`filter[${key}]=${value}`));
        page.searches.forEach((value, key) => params.push(`search[${key}]=${value}`));
    }

    if (includes) {
        includes.forEach(include => params.push(`include=${include}`));
    }

    const joinedParams = params.join('&');
    if (joinedParams.length > 0) {
        baseUrl += `?${joinedParams}`;
    }
    return baseUrl;
}

export async function fetchCollection<T extends ResourceObject>(
    type: string, page: PageDescriptor, includes?: Array<string>
): Promise<CollectionResponse<T>> {
    const url = getFormattedUrl(`/rest/${type}`, page, includes);
    const collectionResponse = await getJsonGetResponse<CollectionResponse<T>>(url);
    collectionResponse.meta.page.number = page.pageNumber;
    return collectionResponse;
}

export async function fetchObject<T extends ResourceObject>(type: string, id: string, includes?: Array<string>)
: Promise<ObjectResponse<T> | null> {
    if (id.trim().length < 1) {
        throw new InvalidRequestError('Object ID is missing or invalid. Request type: ' + type);
    }
    const url = getFormattedUrl(`/rest/${type}/${id}`, undefined, includes);
    try {
        return await getJsonGetResponse<ObjectResponse<T>>(url);
    } catch (e) {
        if (e instanceof NotFoundServerResponseError) {
            return null;
        } else {
            throw e;
        }
    }

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

function formatUnexpectedResponseError(response: JsonResponse): UnexpectedServerResponseError {
    return new UnexpectedServerResponseError(
        `Got an unexpected response [${response.status}] for ${response.request.options.method} `
        + `${response.request.url}\n${JSON.stringify(response.json)}`
    );
}
