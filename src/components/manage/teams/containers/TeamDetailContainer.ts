import { connect, Dispatch } from 'react-redux';
import { fetchTeamDetail, saveTeam } from '../../../../actions/resource/teamsActions';
import TeamDetailForm, { TeamDetailFormActions, TeamDetailProps } from '../presenters/TeamDetailForm';
import { RootState } from '../../../../reducers';
import { RouteComponentProps } from 'react-router';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import { FetchingState, Team } from '../../../../models/models';
import { updateTeamAttribute } from '../../../../actions/form/formUpdateActions';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>): TeamDetailProps => {
    const teamId = ownProps.match.params.itemId;
    if (teamId === 'add') {
        return {
            team: state.form.team.resource,
            currentView: {
                fetchedState: FetchingState.FETCHED
            },
            isEdit: true
        };
    } else {
        // TODO: wrap 'get' so it returns an empty/unfetched cache if not found
        const teamCache = state.resource.teams.data.get(teamId);
        const team = teamCache ? teamCache.object : null;
        return {
            team: team,
            currentView: {
                fetchedState: teamCache ? teamCache.fetchingState : FetchingState.NOT_FETCHED
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