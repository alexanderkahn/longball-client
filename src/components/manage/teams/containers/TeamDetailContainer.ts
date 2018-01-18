import { connect, Dispatch } from 'react-redux';
import { fetchTeam, saveTeam } from '../../../../actions/resource/teamsActions';
import TeamDetailForm, { TeamDetailFormActions, TeamDetailProps } from '../presenters/TeamDetailForm';
import { RootState } from '../../../../reducers/rootReducer';
import { RouteComponentProps } from 'react-router';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import { resetForm, updateTeamAttribute } from '../../../../actions/form/formUpdateActions';
import { Team } from '../../../../reducers/resource/team';
import { NEW_RESOURCE_FORM_ROUTE } from '../../../../reducers/resource/resourceReducer';

// FIXME: isEdit should probably be stored in state somewhere (in form? Seems like a form prop to me)
const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>): TeamDetailProps => {
    const teamId = ownProps.match.params.itemId;
    const isNew = teamId === NEW_RESOURCE_FORM_ROUTE;
    return {
        storedTeam: state.resource.teams.data.get(teamId),
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