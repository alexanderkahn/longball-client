import { RootState } from '../../../../reducers/rootReducer';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ResourcePickerPresenter, { ResourcePickerActions, ResourcePickerProps }
from '../../teams/presenters/ResourcePickerPresenter';
import { PageDescriptor } from '../../../../reducers/resource/page';
import { Map as ImmutableMap } from 'immutable';
import { fetchTeam, fetchTeams } from '../../../../actions/resource/teamsActions';
import { Team } from '../../../../reducers/resource/team';
import { updateFormRelationship, updateFormRelationshipDisplay } from '../../../../actions/form/formUpdateActions';

const SEARCH_TERM = 'location,_,nickname';

function getTeamDisplay(obj: Team | string | null): string {
    if (!obj) {
        return '';
    } else if (isTeam(obj)) {
        return `${obj.attributes.location} ${obj.attributes.nickname}`;
    } else {
        return obj.toString();
    }
}

function isTeam(value: Team | string | null): value is Team {
    return value !== null && (<Team> value).type === 'teams';
}

interface TeamPickerProps {
    isEdit: boolean;
}

function mapStateToProps(state: RootState, ownProps: TeamPickerProps): ResourcePickerProps<Team> {
    const teamDisplay = state.form.rosterPosition.relationshipDisplayFields.get('team', '');
    const suggestionsPage: PageDescriptor = new PageDescriptor(1, ImmutableMap([[SEARCH_TERM, teamDisplay]]));
    const selectedTeamId = state.form.rosterPosition.resource.relationships.team.data.id;
    return {
        matchingResources: state.resource.teams.getMappedPage(suggestionsPage),
        selectedResource: state.resource.teams.data.get(selectedTeamId),
        inputDisplayValue: teamDisplay,
        inputDisplayPlaceholder: 'Teams',
        isEdit: ownProps.isEdit
    };
}

function mapDispatchToProps(dispatch: Dispatch<RootState>): ResourcePickerActions<Team> {
    return {
        populateDisplayValue: (value: string) =>
            dispatch(updateFormRelationshipDisplay('rosterpositions', 'team', value)),
        fetchMatchingResource: (id: string) => dispatch(fetchTeam(id)),
        fetchSuggestions: (searchTerm: string) =>
            dispatch(fetchTeams(new PageDescriptor(1, ImmutableMap([[SEARCH_TERM, searchTerm]])))),
        parseDisplayValue: getTeamDisplay,
        onChangeDisplay: (teamDisplay: string) =>
            dispatch(updateFormRelationshipDisplay('rosterpositions', 'team', teamDisplay)),
        onSelectResource: (teamId: string) => dispatch(updateFormRelationship('rosterpositions', 'team', {
            data: {
                type: 'teams',
                id: teamId
            }
        })),
    };
}

const TeamPicker = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourcePickerPresenter);

export default TeamPicker;