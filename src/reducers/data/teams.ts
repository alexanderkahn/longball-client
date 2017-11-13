import { TeamAction, TeamActionTypeKeys } from '../../actions/teams';
import { keyBy } from 'lodash';

export const teams = (state = {}, action: TeamAction): any => {
    switch (action.type) {
        case TeamActionTypeKeys.RECEIVE_TEAMS:
            return {
                ...state,
                ...keyBy(action.data, team => team.id)
            };
        default:
            return state;
    }
};