import { List, Map as ImmutableMap } from 'immutable';
import { PageResultsMeta } from '../../actions/rest';
import { ViewState } from '../../models/models';

export interface PageResult {
    descriptor: PageDescriptor;
    meta: PageResultsMeta;
    itemIds: List<string>;
}

export class PageDescriptor {
    pageNumber: number;
    searches: ImmutableMap<string, string>;
    filters: ImmutableMap<string, string>;

    constructor(page: number, searches?: ImmutableMap<string, string>, filters?: ImmutableMap<string, string>) {
        this.pageNumber = page;
        this.searches = searches ? searches : ImmutableMap();
        this.filters = filters ? filters : ImmutableMap();
    }

    equals(other: PageDescriptor): boolean {
        return this.pageNumber === other.pageNumber
            && this.searches.equals(other.searches)
            && this.filters.equals(other.filters);
    }
}

// TODO: this is essentially the same as PageResultsMeta. Should be able to get rid of it.
export interface PagedView extends ViewState {
    page: number;
    hasPrevious: boolean;
    hasNext: boolean;
}

export interface PagedViewParams {
    page?: string;
}