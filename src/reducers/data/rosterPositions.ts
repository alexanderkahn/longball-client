import { RosterPositionAction, RosterPositionActionTypeKeys } from '../../actions/resourceobjects/rosterpositions';
import { FetchingState, RosterPosition } from '../../models/models';
import { List } from 'immutable';
import { initialState, mergePages, ResourceObjectCache, ResourceObjectState } from './index';
import { ResourceObjectAction, ResourceObjectActionType } from '../../actions/resourceobjects/index';

export const rosterPositions = (state: ResourceObjectState<RosterPosition> = initialState(),
                                action: RosterPositionAction | ResourceObjectAction)
    : ResourceObjectState<RosterPosition> => {
    if (action.type === ResourceObjectActionType.REMOVE_RESOURCE_OBJECT
        && action.resourceObjectType === 'rosterpositions') {
        return {
            ...state,
            data: state.data.set(action.removed, new ResourceObjectCache(FetchingState.FETCHED))
        };
    }

    switch (action.type) {
        case RosterPositionActionTypeKeys.REQUEST_ROSTER_POSITION:
            return {
                ...state,
                data: state.data.set(action.id, new ResourceObjectCache(FetchingState.FETCHING))
            };
        case RosterPositionActionTypeKeys.REQUEST_ROSTER_POSITION_COLLECTION:
            return {
                ...state,
                pageInfo: {
                    ...state.pageInfo,
                    pages: state.pageInfo.pages.set(action.page, new ResourceObjectCache(FetchingState.FETCHING))
                }
            };
        case RosterPositionActionTypeKeys.RECEIVE_ROSTER_POSITIONS:
            return {
                ...state,
                pageInfo: mergePages(List(action.data.keys()), state.pageInfo, action.page),
                data: state.data.merge(action.data.map(it => new ResourceObjectCache(FetchingState.FETCHED, it))),
            };
        default:
            return state;
    }
};