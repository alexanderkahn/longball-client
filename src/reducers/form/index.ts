import { combineReducers, Reducer } from 'redux';
import { League, Person, ResourceObject, RosterPosition, Team } from '../../models/models';
import { ResourceFormUpdateAction, ResourceFormUpdateActionType } from '../../actions/form/formUpdateActions';
import { ReceiveResourceObjectAction, ResourceActionType } from '../../actions/resource';
import * as _ from 'lodash';
import { Map } from 'immutable';

interface ResourceFormState<T extends ResourceObject> {
    readonly resource: T;
    readonly relationshipDisplayFields: Map<string, string>;
}

const leagueFormState: ResourceFormState<League> = {
    resource: {
        type: 'leagues',
        id: '',
        attributes: {
            name: ''
        }
    },
    relationshipDisplayFields: Map()
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
    },
    relationshipDisplayFields: Map()
};

const personFormState: ResourceFormState<Person> = {
    resource: {
        type: 'people',
        id: '',
        attributes: {
            first: '',
            last: '',
        }
    },
    relationshipDisplayFields: Map()
};

const rosterPositionFormState: ResourceFormState<RosterPosition> = {
    resource: {
        type: 'rosterpositions',
        id: '',
        attributes: {
            jerseyNumber: 1,
            startDate: '',
        },
        relationships: {
            team: {
                data: {
                    type: 'teams',
                    id: ''
                },
            },
            player: {
                data: {
                    type: 'people',
                    id: ''
                },
            }
        }
    },
    relationshipDisplayFields: Map()
};

const resourceFormReducerBuilder = <T extends ResourceObject>(initialState: ResourceFormState<T>) =>
    (state: ResourceFormState<T> = initialState,
     action: ResourceFormUpdateAction | ReceiveResourceObjectAction<T>): ResourceFormState<T> => {

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
        case ResourceFormUpdateActionType.UPDATE_RELATIONSHIP_DISPLAY:
            return {
                ...state,
                resource: state.resource,
                relationshipDisplayFields: state.relationshipDisplayFields.set(action.relationship, action.value)
            };
        default:
            return state;
    }
};

export interface FormState {
    league: ResourceFormState<League>;
    team: ResourceFormState<Team>;
    person: ResourceFormState<Person>;
    rosterPosition: ResourceFormState<RosterPosition>;
}

export const form: Reducer<FormState> = combineReducers({
    league: resourceFormReducerBuilder(leagueFormState),
    team: resourceFormReducerBuilder(teamFormState),
    person: resourceFormReducerBuilder(personFormState),
    rosterPosition: resourceFormReducerBuilder(rosterPositionFormState),
});
