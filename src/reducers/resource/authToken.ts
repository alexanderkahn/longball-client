import { FetchingState } from './cache';

export interface AuthToken {
    isFetching: FetchingState;
    isValid: boolean;
}