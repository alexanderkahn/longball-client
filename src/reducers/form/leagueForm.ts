import { League } from '../../models/models';
import { ReceiveResourceObjectAction, ResourceActionType } from '../../actions/resource';
import { LeagueFormAction, LeagueFormActionType } from '../../actions/form/leagueFormActions';

export interface LeagueFormState {
    league: League;
}

const initialState: LeagueFormState = {
    league: {
        type: 'leagues',
        id: '',
        attributes: {
            name: ''
        }
    }
};

// TODO: I bet I could generalize this by using lodash to insert data into arbitrary spaces. Can that be typed?
export const leagueForm = (
    state: LeagueFormState = initialState,
    action: LeagueFormAction | ReceiveResourceObjectAction<League>
): LeagueFormState => {

    if (action.type === ResourceActionType.RECEIVE_RESOURCE_OBJECT && action.resourceType === 'leagues') {
        return initialState;
    }

    switch (action.type) {
        case LeagueFormActionType.UPDATE_LEAGUE_NAME:
            return {
                ...state,
                league: {
                    ...state.league,
                    attributes: {
                        ...state.league.attributes,
                        name: action.name
                    }
                }
            };
        default:
            return state;
    }
};