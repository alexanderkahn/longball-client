import { connect, Dispatch } from 'react-redux';
import { fetchTeamDetail, saveTeam } from '../../../../actions/resource/teamsActions';
import TeamDetailForm, { TeamDetailFormActions, TeamDetailProps } from '../presenters/TeamDetailForm';
import { RootState } from '../../../../reducers';
import { RouteComponentProps } from 'react-router';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import { FetchedState, League, Team } from '../../../../models/models';
import {
    updateTeamAttribute, updateTeamRelationship,
    updateTeamRelationshipDisplay
} from '../../../../actions/form/formUpdateActions';
import { nonNull } from '../../players/containers/TeamPickerContainer';

// TODO: should these three also be handled by state?
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

function getItemDisplay(obj?: League | string): string {
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

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>): TeamDetailProps => {
    const teamId = ownProps.match.params.itemId;
    const stateLeagueDisplay = state.form.team.relationshipDisplayFields.get('league', '');
    if (teamId === 'add') {
        return {
            leagues: getSuggestions(stateLeagueDisplay, nonNull(state.resource.leagues.data)),
            team: state.form.team.resource,
            leagueDisplay: stateLeagueDisplay,
            currentView: {
                fetchedState: FetchedState.FETCHED
            },
            isEdit: true
        };
    } else {
        const teamCache = state.resource.teams.data.get(teamId);
        const team = teamCache ? teamCache.object : null;
        const league = team ? state.resource.leagues.data.get(team.relationships.league.data.id) : null;
        return {
            leagues: nonNull(state.resource.leagues.data),
            team: team,
            leagueDisplay: league && league.object ? league.object.attributes.name : '',
            currentView: {
                fetchedState: teamCache ? teamCache.fetchingState : FetchedState.NOT_FETCHED
            },
            isEdit: false
        };
    }
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<ManageItemRouteProps>)
    : TeamDetailFormActions => {
    const teamId = ownProps.match.params.itemId;
    return {
        fetchItemDetail: function () {
            dispatch(fetchTeamDetail(teamId));
        },
        updateLeague: (leagueId: string) => dispatch(updateTeamRelationship('league', {
            data: {
                type: 'leagues',
                id: leagueId
            }
        })),
        updateLeagueDisplay: (leagueDisplay: string) =>
            dispatch(updateTeamRelationshipDisplay('league', leagueDisplay)),
        getDisplay: getItemDisplay,
        updateAbbreviation: (abbreviation: string) => dispatch(updateTeamAttribute('abbreviation', abbreviation)),
        updateLocation: (location: string) => dispatch(updateTeamAttribute('location', location)),
        updateNickname: (nickname: string) => dispatch(updateTeamAttribute('nickname', nickname)),
        saveTeam: function (team: Team) {
            dispatch(saveTeam(team));
        }
    };
};

const TeamDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamDetailForm);

export default TeamDetailContainer;