import { parse } from 'querystring';
import { Location } from 'history';
import { FetchingState } from '../reducers/resource';
import { PageDescriptor } from '../reducers/resource/page';
import { Map as ImmutableMap } from 'immutable';
import { isNumber } from 'util';

// TODO: get this from the server, not directly from firebase. Will look like the other models
export interface User {
    name: string;
}

// TODO: can we get rid of this?
export interface ViewState {
    fetchedState: FetchingState;
}

// // TODO: this whole function should probably be part of the state object
// export function getSafePage(state: ResourceObjectState<ResourceObject>, location: Location): PagedView {
//     const pageDescriptor = parseQueryParameters(location);
//
//     const pageGroup = state.pages.get(pageDescriptor);
//     if (!pageGroup) {
//         return {
//             page: pageDescriptor.pageNumber,
//             fetchedState: FetchingState.NOT_FETCHED,
//             hasPrevious: false,
//             hasNext: false,
//         };
//     } else {
//         return {
//             page: pageDescriptor.pageNumber,
//             fetchedState: pageGroup.fetchingState,
//             hasPrevious: pageGroup.object ? pageGroup.object.meta.hasPrevious : false,
//             hasNext: pageGroup.object ? pageGroup.object.meta.hasNext : false,
//         };
//     }
// }

export function parseQueryParameters(location: Location): PageDescriptor {
    const params = parse(location.search.substr(1));

    const pageNumber = params.page && isNumber(Number(params.page)) ? Number(params.page) : 1;
    const searches = getParameterCollection(params, 'search');
    const filters = getParameterCollection(params, 'filter');

    return new PageDescriptor(pageNumber, searches, filters);
}

// FIXME: request can have multiple filters of the same type. Need to filter these out (business logic does not allow)
function getParameterCollection(params: {}, parameterKey: 'filter'|'search'): ImmutableMap<string, string> {
    const prefix = `${parameterKey}[`;
    const suffix = ']';
    const paramsWithValues = Object.getOwnPropertyNames(params)
        .filter(it => it.startsWith(prefix) && it.endsWith(suffix))
        .map((key: string) => [key, params[key]])
        .map(([key, value]) => [key.slice(prefix.length, key.length - suffix.length), value]);
    return ImmutableMap(paramsWithValues);
}