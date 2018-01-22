import { PageDescriptor, PageResult } from '../reducers/resource/page';
import { isPresent, ResourceCache } from '../reducers/resource/cache';

export function getListElements<T>(
    pageCache: ResourceCache<PageDescriptor, PageResult<T>>,
    transform: (original: T | undefined) => JSX.Element
): ResourceCache<PageDescriptor, PageResult<JSX.Element>> {
    if (isPresent(pageCache)) {
        const elements = pageCache.object.contents.map(it => transform(it)).toList();
        return {
            ...pageCache,
            object: {
                ...pageCache.object,
                contents: elements
            }
        };
    } else {
        return pageCache;
    }
}