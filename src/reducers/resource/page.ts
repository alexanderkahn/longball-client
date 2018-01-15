import { List, Map as ImmutableMap } from 'immutable';
import { ViewState } from '../../models/models';

export interface PageResult<V> {
    descriptor: PageDescriptor;
    meta: PageResultsMeta;
    contents: List<V>;
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

export interface PageResultsMeta {
    totalPages: number;
    number: number;
    hasPrevious: boolean;
    hasNext: boolean;
}

// TODO: this is essentially the same as PageResultsMeta. Should be able to get rid of it.
export interface PagedView extends ViewState {
    page: number;
    hasPrevious: boolean;
    hasNext: boolean;
}