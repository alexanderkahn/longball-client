import { RosterPositionAction, RosterPositionActionTypeKeys } from '../../actions/resourceobjects/rosterpositions';
import { RosterPosition } from '../../models/models';
import { List } from 'immutable';
import { initialState, mergePages, ResourceObjectState } from './index';

export const rosterPositions = (state: ResourceObjectState<RosterPosition> = initialState(),
                                action: RosterPositionAction): ResourceObjectState<RosterPosition> => {
    switch (action.type) {
        case RosterPositionActionTypeKeys.RECEIVE_ROSTER_POSITIONS:
            return {
                ...state,
                pageInfo: mergePages(List(action.data.keys()), state.pageInfo, action.page),
                data: state.data.merge(action.data),
            };
        case RosterPositionActionTypeKeys.REMOVE_ROSTER_POSITION:
            return {
                ...state,
                data: state.data.delete(action.removed)
            };
        default:
            return state;
    }
};