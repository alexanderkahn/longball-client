import { RosterPositionAction, RosterPositionActionTypeKeys } from '../../actions/rosterpositions';
import { RosterPosition } from '../../models/models';

export const rosterPositions = (state: Map<string, RosterPosition> = new Map(), action: RosterPositionAction):
    Map<string, RosterPosition> => {
    switch (action.type) {
        case RosterPositionActionTypeKeys.RECEIVE_ROSTER_POSITIONS:
            return new Map([...state, ...action.data]);
        case RosterPositionActionTypeKeys.REMOVE_ROSTER_POSITION:
            let newMap = new Map([...state]);
            newMap.delete(action.removed);
            return newMap;
        default:
            return state;
    }
};