import { RosterPositionAction, RosterPositionActionTypeKeys } from '../../actions/rosterpositions';
import { RosterPosition } from '../../models/models';
import { Map } from 'immutable';

export interface RosterPositionsState {
    readonly data: Map<string, RosterPosition>;
}

const initialState: RosterPositionsState = {
    data: Map(),
};

export const rosterPositions = (state: RosterPositionsState = initialState, action: RosterPositionAction)
    : RosterPositionsState => {
    switch (action.type) {
        case RosterPositionActionTypeKeys.RECEIVE_ROSTER_POSITIONS:
            return {
                ...state,
                data: state.data.merge(Map(action.data.map(position => [position.id, position]))),
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