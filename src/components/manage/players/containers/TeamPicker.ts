import { RootState } from '../../../../reducers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ResourcePickerPresenter, {
    ResourcePickerActions,
    ResourcePickerProps
} from '../../teams/presenters/ResourcePickerPresenter';
import { FetchingState, Team } from '../../../../models/models';
import { PageDescriptor } from '../../../../reducers/resource/page';
import { Map as ImmutableMap } from 'immutable';
import { fetchTeams } from '../../../../actions/resource/teamsActions';
import {
    updateRosterPositionRelationship,
    updateRosterPositionRelationshipDisplay
} from '../../../../actions/form/formUpdateActions';

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
    const teamDisplay = state.form.rosterPosition.relationshipDisplayFields.get('formTeam', '');
    const suggestionsPage: PageDescriptor = new PageDescriptor(1, ImmutableMap([[SEARCH_TERM, teamDisplay]]));
    const pageCache = state.resource.teams.pages.get(suggestionsPage);
    return {
        matchingResources: state.resource.teams.getNonNullPageItems(suggestionsPage),
        selectedResourceId: state.form.rosterPosition.resource.relationships.team.data.id,
        inputDisplayValue: teamDisplay,
        inputDisplayPlaceholder: 'Teams',
        currentView: {
            fetchedState: teamDisplay.length > 0 ? pageCache.fetchingState : FetchingState.FETCHED
        },
        isEdit: ownProps.isEdit
    };
}

function  mapDispatchToProps(dispatch: Dispatch<RootState>): ResourcePickerActions<Team> {
    return {
        fetchSuggestions: (searchTerm: string) =>
            dispatch(fetchTeams(new PageDescriptor(1, ImmutableMap([[SEARCH_TERM, searchTerm]])))),
        getResourceDisplay: getTeamDisplay,
        onChangeDisplay: (teamDisplay: string) =>
            dispatch(updateRosterPositionRelationshipDisplay('formTeam', teamDisplay)),
        onSelectResource: (teamId: string) => dispatch(updateRosterPositionRelationship('formTeam', {
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