import { parse } from 'querystring';
import { Location } from 'history';
import { PageDescriptor } from '../reducers/resource/page';
import { Map as ImmutableMap } from 'immutable';
import { isNumber } from 'util';

// TODO: move and rename this file.
export function parseQueryParameters(location: Location): PageDescriptor {
    const params = parse(location.search.substr(1));

    const pageNumber = params.page && isNumber(Number(params.page)) ? Number(params.page) : 1;
    const searches = getParameterCollection(params, 'search');
    const filters = getParameterCollection(params, 'filter');

    return new PageDescriptor(pageNumber, searches, filters);
}

function getParameterCollection(params: {}, parameterKey: 'filter'|'search'): ImmutableMap<string, string> {
    const prefix = `${parameterKey}[`;
    const suffix = ']';
    const paramsWithValues = Object.getOwnPropertyNames(params)
        .filter(it => it.startsWith(prefix) && it.endsWith(suffix))
        .map((key: string) => [key, params[key]])
        .map(([key, value]) => [key.slice(prefix.length, key.length - suffix.length), value])
        .filter(value => typeof value === 'string');
    return ImmutableMap(paramsWithValues);
}