import { combineReducers, Reducer } from 'redux';
import { League, ResourceObject, Team } from '../../models/models';
import { ResourceFormUpdateAction, ResourceFormUpdateActionType } from '../../actions/form/formUpdateActions';
import { ReceiveResourceObjectAction, ResourceActionType } from '../../actions/resource';
import * as _ from 'lodash';

interface ResourceFormState<T extends ResourceObject> {
    readonly resource: T;
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

const teamFormState: ResourceFormState<Team> = {
    resource: {
        type: 'teams',
        id: '',
        attributes: {
            abbreviation: '',
            location: '',
            nickname: ''
        },
        relationships: {
            league: {
                data: {
                    type: 'leagues',
                    id: ''
                },
            }
        }
    }
};

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
        case ResourceFormUpdateActionType.UPDATE_RELATIONSHIP:
            return _.set(_.cloneDeep(state), `resource.relationships.${action.relationship}`, action.value);
        default:
            return state;
    }
};

export interface FormState {
    league: ResourceFormState<League>;
    team: ResourceFormState<Team>;
}

export const form: Reducer<FormState> = combineReducers({
    league: resourceFormReducerBuilder(leagueFormState),
    team: resourceFormReducerBuilder(teamFormState),
});
