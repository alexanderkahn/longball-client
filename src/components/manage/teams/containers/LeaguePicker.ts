import { RootState } from '../../../../reducers';
import { connect } from 'react-redux';
import ResourcePickerPresenter, {
    ResourcePickerActions,
    ResourcePickerProps
} from '../presenters/ResourcePickerPresenter';
import { Dispatch } from 'redux';
import { League } from '../../../../models/models';
import { nonNull } from '../../players/containers/TeamPickerContainer';
import { updateTeamRelationship, updateTeamRelationshipDisplay } from '../../../../actions/form/formUpdateActions';

// TODO: should these four also be handled by state?
function getSuggestions(inputValue: string, unfilteredLeagues: Array<League>): Array<League> {
    if (inputValue.length === 0) {
        return Array();
    }
    return unfilteredLeagues.filter(league => matches(inputValue, league)).slice(0, 5);
}

function matches(searchValue: string, league: League) {
    if (!league) {
        return false;
    }
    return (!searchValue || getItemDisplay(league).toLowerCase().includes(searchValue.toLowerCase()));
}

function getItemDisplay(obj: League | string | null): string {
    if (!obj) {
        return '';
    } else if (isLeague(obj)) {
        return obj.attributes.name;
    } else {
        return obj.toString();
    }
}

function isLeague(value: League | string | null): value is League {
    return value !== null && (<League> value).type === 'leagues';
}

const mapStateToProps = (state: RootState): ResourcePickerProps<League> => {
    const leagueDisplay = state.form.team.relationshipDisplayFields.get('league', '');
    return {
        matchingResources: getSuggestions(leagueDisplay, nonNull(state.resource.leagues.data)),
        selectedResourceId: state.form.team.resource.relationships.league.data.id,
        inputDisplayValue: leagueDisplay,
        inputDisplayPlaceholder: 'Leagues'
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>): ResourcePickerActions<League> => {
    return {
        getResourceDisplay: getItemDisplay,
        onChangeDisplay: (leagueDisplay: string) =>
            dispatch(updateTeamRelationshipDisplay('league', leagueDisplay)),
        onSelectResource: (leagueId: string) => dispatch(updateTeamRelationship('league', {
            data: {
                type: 'leagues',
                id: leagueId
            }
        })),
    };
};

const LeaguePicker = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourcePickerPresenter);

export default LeaguePicker;