import { combineReducers, Reducer } from 'redux';
import { ResourceFormUpdateAction, ResourceFormUpdateActionType } from '../../actions/form/formUpdateActions';
import * as _ from 'lodash';
import { Map } from 'immutable';
import { ResourceObject } from '../resource/resourceReducer';
import { blankLeague, League } from '../resource/league';
import { blankTeam, Team } from '../resource/team';
import { blankPerson, Person } from '../resource/person';
import { blankRosterPosition, RosterPosition } from '../resource/rosterPosition';
import { NEW_RESOURCE_FORM_ROUTE } from '../resource/cache';

interface ResourceFormState<T extends ResourceObject> {
    readonly isEdit: boolean;
    readonly resource: T;
    readonly relationshipDisplayFields: Map<string, string>;
}

function  initialStateFor<T extends ResourceObject>(resource: T): ResourceFormState<T> {
    return {
        isEdit: true,
        resource,
        relationshipDisplayFields: Map()
    };
}

const resourceFormReducerBuilder = <T extends ResourceObject>(initialStateResource: T) => (
    state: ResourceFormState<T> = initialStateFor(initialStateResource), action: ResourceFormUpdateAction<T>
): ResourceFormState<T> => {

        if (action.resourceType !== state.resource.type) {
            return state;
        }

        switch (action.type) {
            case ResourceFormUpdateActionType.RESET_FORM:
                return {
                    isEdit: action.resource.id === NEW_RESOURCE_FORM_ROUTE,
                    resource: _.cloneDeep(action.resource),
                    relationshipDisplayFields: Map()
                };
            case ResourceFormUpdateActionType.UPDATE_ATTRIBUTE:
                return _.set(_.cloneDeep(state), `resource.attributes.${action.attribute}`, action.value);
            case ResourceFormUpdateActionType.UPDATE_RELATIONSHIP:
                return _.set(_.cloneDeep(state), `resource.relationships.${action.relationship}`, action.value);
            case ResourceFormUpdateActionType.UPDATE_RELATIONSHIP_DISPLAY:
                const displayFields = state.relationshipDisplayFields.set(action.relationship, action.value);
                return {
                    ...state,
                    resource: state.resource,
                    relationshipDisplayFields: displayFields
                };
            case ResourceFormUpdateActionType.TOGGLE_EDIT:
                return {
                    ...state,
                    isEdit: action.isEdit
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
    league: resourceFormReducerBuilder(blankLeague),
    team: resourceFormReducerBuilder(blankTeam),
    person: resourceFormReducerBuilder(blankPerson),
    rosterPosition: resourceFormReducerBuilder(blankRosterPosition),
});