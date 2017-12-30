import { connect, Dispatch } from 'react-redux';
import { fetchTeamDetail, saveTeam } from '../../../../actions/resource/teamsActions';
import TeamDetailForm, { TeamDetailFormActions, TeamDetailProps } from '../presenters/TeamDetailForm';
import { RootState } from '../../../../reducers';
import { RouteComponentProps } from 'react-router';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import { FetchedState, Team } from '../../../../models/models';
import {
    updateTeamAttribute, updateTeamRelationship,
    updateTeamRelationshipDisplay
} from '../../../../actions/form/formUpdateActions';
import { nonNull } from '../../players/containers/TeamPickerContainer';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>): TeamDetailProps => {
    const teamId = ownProps.match.params.itemId;
    if (teamId === 'add') {
        return {
            leagues: nonNull(state.resource.leagues.data),
            team: state.form.team.resource,
            leagueDisplay: state.form.team.relationshipDisplayFields.get('league', ''),
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