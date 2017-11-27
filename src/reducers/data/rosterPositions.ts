import { RosterPositionAction, RosterPositionActionTypeKeys } from '../../actions/rosterpositions';
import { RosterPosition } from '../../models/models';
import { toMap } from './index';

export const rosterPositions = (state: Map<string, RosterPosition> = new Map(), action: RosterPositionAction):
    Map<string, RosterPosition> => {
    switch (action.type) {
        case RosterPositionActionTypeKeys.RECEIVE_ROSTER_POSITIONS:
            return toMap(state, action.data);
        default:
            return state;
    }
};