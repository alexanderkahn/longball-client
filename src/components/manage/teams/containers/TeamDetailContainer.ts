import { connect, Dispatch } from 'react-redux';
import { fetchTeam, saveTeam } from '../../../../actions/resource/teamsActions';
import TeamDetailForm, { TeamDetailFormActions, TeamDetailProps } from '../presenters/TeamDetailForm';
import { RootState } from '../../../../reducers';
import { RouteComponentProps } from 'react-router';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import { resetForm, updateTeamAttribute } from '../../../../actions/form/formUpdateActions';
import { FetchingState, ResourceCache } from '../../../../reducers/resource';
import { Team } from '../../../../reducers/resource/team';

const newTeam: ResourceCache<Team> = {
    fetchingState: FetchingState.FETCHED,
    object: Team.empty()
};

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>): TeamDetailProps => {
    const teamId = ownProps.match.params.itemId;
    const isNew = teamId === 'add';
    return {
        storedTeam: isNew ? newTeam : state.resource.teams.data.get(teamId),
        formTeam: state.form.team.resource,
        isEdit: isNew
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<ManageItemRouteProps>)
    : TeamDetailFormActions => {
    const teamId = ownProps.match.params.itemId;
    return {
        fetchItem: () => dispatch(fetchTeam(teamId)),
        resetFormItem: (team: Team) => dispatch(resetForm('teams', team)),
        updateAbbreviation: (abbreviation: string) => dispatch(updateTeamAttribute('abbreviation', abbreviation)),
        updateLocation: (location: string) => dispatch(updateTeamAttribute('location', location)),
        updateNickname: (nickname: string) => dispatch(updateTeamAttribute('nickname', nickname)),
        saveTeam: (team: Team) => dispatch(saveTeam(team))
    };
};

const TeamDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamDetailForm);

export default TeamDetailContainer;