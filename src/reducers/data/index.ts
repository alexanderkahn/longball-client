import { teams } from './teams';
import { people } from './people';
import { rosterPositions } from './rosterPositions';
import { leagues } from './leagues';
import { combineReducers } from 'redux';

export const data = combineReducers({
    leagues,
    teams,
    people,
    rosterPositions,
});