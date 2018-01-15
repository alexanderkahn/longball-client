import { parse } from 'querystring';
import { Location } from 'history';
import { isNumber } from 'util';
import { FetchingState, ResourceObject, ResourceObjectState } from '../reducers/resource';
import { PageDescriptor, PagedView, PagedViewParams } from '../reducers/resource/page';

// TODO: get this from the server, not directly from firebase. Will look like the other models
export interface User {
    name: string;
}

// TODO: can we get rid of this?
export interface ViewState {
    fetchedState: FetchingState;
}

// TODO: this whole function should probably be part of the state object
export function getSafePage(state: ResourceObjectState<ResourceObject>, location: Location): PagedView {
    const params = parse(location.search.substr(1)) as PagedViewParams;
    const pageNumber = Number(params.page);
    const safePage = (isNumber(pageNumber) && pageNumber > 0) ? pageNumber : 1;

    // FIXME: this will not work for filtered collections. Need a way to parse out pagenumber from filter.
    const pageGroup = state.pages.get(new PageDescriptor(safePage));
    if (!pageGroup) {
        return {
            page: safePage,
            fetchedState: FetchingState.NOT_FETCHED,
            hasPrevious: false,
            hasNext: false,
        };
    } else {
        return {
            page: safePage,
            fetchedState: pageGroup.fetchingState,
            hasPrevious: pageGroup.object ? pageGroup.object.meta.hasPrevious : false,
            hasNext: pageGroup.object ? pageGroup.object.meta.hasNext : false,
        };
    }
}