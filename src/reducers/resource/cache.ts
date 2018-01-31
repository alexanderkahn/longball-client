import * as Immutable from 'immutable';
import * as _ from 'lodash';

export enum FetchingState {
    NOT_FETCHED,
    FETCHING,
    FETCHED
}

interface UnfetchedItemCache<K> {
    readonly id: K;
    readonly fetchingState: FetchingState.NOT_FETCHED | FetchingState.FETCHING;
}

interface AbsentItemCache<K> {
    readonly id: K;
    readonly fetchingState: FetchingState.FETCHED;
    readonly object: null;
}

export interface PresentItemCache<K, V> {
    readonly id: K;
    readonly fetchingState: FetchingState.FETCHED;
    readonly object: V;
}

export function  toFetchedCache<K, V>(key: K, value: V | undefined | null): ResourceCache<K, V> {
    if (value) {
        return {
            id: key,
            fetchingState: FetchingState.FETCHED,
            object: value
        };
    } else {
        return {
            id: key,
            fetchingState: FetchingState.FETCHED,
            object: null
        };
}
}

export type ResourceCache<K, V> = UnfetchedItemCache<K> | AbsentItemCache<K> | PresentItemCache<K, V>;

export function isUnfetched(value: ResourceCache<{}, {}> | null): value is UnfetchedItemCache<{}> {
    return value !== null && FetchingState.NOT_FETCHED === value.fetchingState;
}

export function isAbsent(value: ResourceCache<{}, {}> | null): value is AbsentItemCache<{}> {
    return value !== null && value.fetchingState === FetchingState.FETCHED && value.object === null;
}

export function isPresent(value: ResourceCache<{}, {}> | null): value is PresentItemCache<{}, {}> {
    return value !== null && value.fetchingState === FetchingState.FETCHED && value.object !== null;
}

export class CachedStateWrapper<K, V> {

    private readonly internal: Immutable.Map<K, ResourceCache<K, V>>;
    private readonly synthetic: Immutable.Map<K, ResourceCache<K, V>>;

    constructor(synthetic: Immutable.Map<K, ResourceCache<K, V>>, internal: Immutable.Map<K, ResourceCache<K, V>>) {
        this.synthetic = synthetic;
        this.internal = internal;
    }

    get(key: K): ResourceCache<K, V> {
        const syntheticValue = this.synthetic.get(key);
        if (syntheticValue) {
            return _.cloneDeep(syntheticValue);
        }
        return this.internal.get(key, {id: key, fetchingState: FetchingState.NOT_FETCHED});
    }

    getAll(keys: K[]): Immutable.List<ResourceCache<K, V>> {
        return Immutable.List(this.internal.toArray().filter((value) => keys.indexOf(value.id) >= 0));
    }

    setOneFetching(key: K): CachedStateWrapper<K, V> {
        return new CachedStateWrapper<K, V>(this.synthetic, this.internal.set(
            key, {id: key, fetchingState: FetchingState.FETCHING})
        );
    }

    setOneFetched(key: K, value: V | null): CachedStateWrapper<K, V> {
        return new CachedStateWrapper<K, V>(this.synthetic, this.internal.set(key, toFetchedCache(key, value)));
    }

    setAllFetched(other: Immutable.Map<K, V>): CachedStateWrapper<K, V> {
        const cachedValues = other.map((value, key) => toFetchedCache(<K> key, value));
        return new CachedStateWrapper<K, V>(this.synthetic, this.internal.merge(cachedValues));
    }
}

export const NEW_RESOURCE_FORM_ROUTE: string = 'add';
