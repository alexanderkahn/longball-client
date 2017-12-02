import { RosterPositionAction, RosterPositionActionTypeKeys } from '../../actions/rosterpositions';
import { RosterPosition } from '../../models/models';
import { List, Map } from 'immutable';
import { initialState, PageInfo, ResourceObjectState } from './index';
import { isNullOrUndefined } from 'util';

export const rosterPositions = (state: ResourceObjectState<RosterPosition> = initialState(), action: RosterPositionAction)
    : ResourceObjectState<RosterPosition> => {
        switch (action.type) {
            case RosterPositionActionTypeKeys.RECEIVE_ROSTER_POSITIONS:
                return {
                    ...state,
                    pageInfo: rosterPositionsPages(state.pageInfo, action),
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

function rosterPositionsPages(state: PageInfo, action: RosterPositionAction): PageInfo {
    if (action.type !== RosterPositionActionTypeKeys.RECEIVE_ROSTER_POSITIONS || isNullOrUndefined(action.page)) {
        return state;
    } else {
        return {
            ...state,
            totalPages: action.page.totalPages,
            pages: state.pages.set(action.page.number, List(action.data.map(league => league.id)))
        };
    }
}