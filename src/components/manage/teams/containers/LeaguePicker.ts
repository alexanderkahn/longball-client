import { RootState } from '../../../../reducers/rootReducer';
import { connect } from 'react-redux';
import ResourcePickerPresenter, { ResourcePickerActions, ResourcePickerProps }
from '../presenters/ResourcePickerPresenter';
import { Dispatch } from 'redux';
import { updateFormRelationship, updateFormRelationshipDisplay } from '../../../../actions/form/formUpdateActions';
import { PageDescriptor } from '../../../../reducers/resource/page';
import { Map as ImmutableMap } from 'immutable';
import { fetchLeague, fetchLeagues } from '../../../../actions/resource/leaguesActions';
import { League } from '../../../../reducers/resource/league';
import { getMatchingResources } from '../../players/containers/TeamPicker';

function getLeagueDisplay(obj: League | string | null): string {
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

interface LeaguePickerProps {
    isEdit: boolean;
}

const mapStateToProps = (state: RootState, ownProps: LeaguePickerProps): ResourcePickerProps<League> => {
    const leagueDisplay = state.form.team.relationshipDisplayFields.get('league', '');
    const descriptor: PageDescriptor = new PageDescriptor(1, ImmutableMap([['name', leagueDisplay]]));
    const selectedResourceId = state.form.team.resource.relationships.league.data.id;
    const pageCache = state.resource.leagues.pages.get(descriptor);
    return {
        matchingResources: getMatchingResources(pageCache, state.resource.leagues.getNonNullPageItems(descriptor)),
        selectedResource:
    state.resource.leagues.data.get(selectedResourceId),
        inputDisplayValue: leagueDisplay,
        inputDisplayPlaceholder: 'Leagues',
        isEdit: ownProps.isEdit
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>): ResourcePickerActions<League> => {
    return {
        populateDisplayValue: (value: string) => dispatch(updateFormRelationshipDisplay('teams', 'league', value)),
        fetchMatchingResource: (id: string) => dispatch(fetchLeague(id)),
        fetchSuggestions: (searchTerm: string) =>
            dispatch(fetchLeagues(new PageDescriptor(1, ImmutableMap([['name', searchTerm]])))),
        parseDisplayValue: getLeagueDisplay,
        onChangeDisplay: (leagueDisplay: string) =>
            dispatch(updateFormRelationshipDisplay('teams', 'league', leagueDisplay)),
        onSelectResource: (leagueId: string) => dispatch(updateFormRelationship('teams', 'league', {
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