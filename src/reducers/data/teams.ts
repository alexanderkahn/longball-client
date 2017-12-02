import { TeamAction, TeamActionTypeKeys } from '../../actions/teams';
import { Team } from '../../models/models';
import { Map } from 'immutable';

export interface TeamsState {
    readonly data: Map<string, Team>;
}

const initialState: TeamsState = {
    data: Map(),
};

export const teams = (state: TeamsState = initialState, action: TeamAction): TeamsState => {
    switch (action.type) {
        case TeamActionTypeKeys.RECEIVE_TEAMS:
            return {
                ...state,
                data: state.data.merge(Map(action.data.map(team => [team.id, team])))
            };
        case TeamActionTypeKeys.REMOVE_TEAM:
            return {
                ...state,
                data: state.data.delete(action.removed)
            };
        default:
            return state;
    }
};