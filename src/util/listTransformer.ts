import { PageDescriptor, PageResult } from '../reducers/resource/page';
import { PresentItemCache, ResourceCache } from '../reducers/resource/cache';
import * as Immutable from 'immutable';

export function copyContentsToCache<T>(
    original: PresentItemCache<PageDescriptor, PageResult<{}>>,
    contents: Array<T>)
: ResourceCache<PageDescriptor, PageResult<T>> {
    return {
        ...original,
        object: {
            ...original.object,
            contents: Immutable.List(contents)
        }
    };
}