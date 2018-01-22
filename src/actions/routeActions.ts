import { RootState } from '../reducers/rootReducer';
import { Dispatch } from 'redux';
import { replace } from 'react-router-redux';

export function redirectToManagementRoute(type: string, id?: string) {
    return (dispatch: Dispatch<RootState>) => {
        const location = `/manage/${type}/${id}`;
        dispatch(replace(location));
    };
}