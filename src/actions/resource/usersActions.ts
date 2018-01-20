import { fetchObject } from '../rest';
import { RootState } from '../../reducers/rootReducer';
import { Dispatch } from 'redux';
import { receiveCurrentUser, requestCurrentUser } from '../authActions';
import { User } from '../../reducers/resource/user';

export function fetchCurrentUser(): Dispatch<RootState> {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(requestCurrentUser());
        const object = await fetchObject<User>('users', 'current');
        dispatch(receiveCurrentUser(object ? object.data : null));
    };
}