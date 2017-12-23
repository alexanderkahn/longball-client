import { combineReducers, Reducer } from 'redux';
import { League, ResourceObject } from '../../models/models';
import { ResourceFormUpdateAction, ResourceFormUpdateActionType } from '../../actions/form/leagueFormActions';
import { ReceiveResourceObjectAction, ResourceActionType } from '../../actions/resource';
import * as _ from 'lodash';

export interface FormState {
    league: ResourceFormState<League>;
}

const leagueFormState: ResourceFormState<League> = {
    resource: {
        type: 'leagues',
        id: '',
        attributes: {
            name: ''
        }
    }
};
interface ResourceFormState<T extends ResourceObject> {
    readonly resource: T;
}

const resourceFormReducerBuilder = <T extends ResourceObject>(initialState: ResourceFormState<T>) => (
    state: ResourceFormState<T> = initialState,
    action: ResourceFormUpdateAction | ReceiveResourceObjectAction<T>
): ResourceFormState<T> => {

    if (action.resourceType !== initialState.resource.type) {
        return state;
    } else if (action.type === ResourceActionType.RECEIVE_RESOURCE_OBJECT) {
        return initialState;
    }

    switch (action.type) {
        case ResourceFormUpdateActionType.UPDATE_ATTRIBUTE:
            return _.set(_.cloneDeep(state), `resource.attributes.${action.attribute}`, action.value);
        default:
            return state;
    }
};

export const form: Reducer<FormState> = combineReducers({
    league: resourceFormReducerBuilder(leagueFormState)
});
