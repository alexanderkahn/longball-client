import { connect, Dispatch } from 'react-redux';
import { fetchTeamDetail, saveTeam } from '../../../../actions/resource/teamsActions';
import TeamDetailForm, { TeamDetailFormActions, TeamDetailProps } from '../presenters/TeamDetailForm';
import { RootState } from '../../../../reducers';
import { RouteComponentProps } from 'react-router';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import {  FetchedState, Team } from '../../../../models/models';
import { updateTeamAttribute, updateTeamRelationship } from '../../../../actions/form/formUpdateActions';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>): TeamDetailProps => {
    const teamId = ownProps.match.params.itemId;
    if (teamId === 'add') {
        console.info(state.form.team.resource);
        return {
            team: state.form.team.resource,
            currentView: {
                fetchedState: FetchedState.FETCHED
            },
            isEdit: true
        };
    } else {
        const teamCache = state.resource.teams.data.get(teamId);
        return {
            team: teamCache ? teamCache.object : null,
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
        updateLeague: (leagueId: string) => dispatch(updateTeamRelationship('league', {data: {type: 'leagues', id: leagueId}})),
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