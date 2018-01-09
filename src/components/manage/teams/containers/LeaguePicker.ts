import { RootState } from '../../../../reducers';
import { connect } from 'react-redux';
import ResourcePickerPresenter, {
    ResourcePickerActions,
    ResourcePickerProps
} from '../presenters/ResourcePickerPresenter';
import { Dispatch } from 'redux';
import { FetchedState, League } from '../../../../models/models';
import { updateTeamRelationship, updateTeamRelationshipDisplay } from '../../../../actions/form/formUpdateActions';
import { PageDescriptor } from '../../../../reducers/resource/page';
import { Map as ImmutableMap } from 'immutable';
import { fetchLeagues } from '../../../../actions/resource/leaguesActions';

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
    const descriptor: PageDescriptor = new PageDescriptor(1, ImmutableMap([['name', leagueDisplay]]));
    const pageCache = state.resource.leagues.pages.get(descriptor);
    return {
        matchingResources: state.resource.leagues.getNonNullPageItems(descriptor),
        selectedResourceId: state.form.team.resource.relationships.league.data.id,
        inputDisplayValue: leagueDisplay,
        inputDisplayPlaceholder: 'Leagues',
        currentView: {
            fetchedState: leagueDisplay.length > 0 ? pageCache.fetchingState : FetchedState.FETCHED
        }
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>): ResourcePickerActions<League> => {
    return {
        fetchSuggestions: (searchTerm: string) =>
            dispatch(fetchLeagues(new PageDescriptor(1, ImmutableMap([['name', searchTerm]])))),
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