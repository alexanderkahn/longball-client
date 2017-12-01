import { RosterPositionAction, RosterPositionActionTypeKeys } from '../../actions/rosterpositions';
import { RosterPosition } from '../../models/models';
import { Map } from 'immutable';

export const rosterPositions = (state: Map<string, RosterPosition> = Map(), action: RosterPositionAction):
    Map<string, RosterPosition> => {
    switch (action.type) {
        case RosterPositionActionTypeKeys.RECEIVE_ROSTER_POSITIONS:
            return state.merge(Map(action.data.map(position => [position.id, position])));
        case RosterPositionActionTypeKeys.REMOVE_ROSTER_POSITION:
            return state.delete(action.removed);
        default:
            return state;
    }
};