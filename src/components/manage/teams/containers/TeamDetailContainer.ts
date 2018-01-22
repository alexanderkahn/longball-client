import { connect, Dispatch } from 'react-redux';
import { fetchTeam, saveTeam } from '../../../../actions/resource/teamsActions';
import TeamDetailForm, { TeamDetailFormActions, TeamDetailProps } from '../presenters/TeamDetailForm';
import { RootState } from '../../../../reducers/rootReducer';
import { RouteComponentProps } from 'react-router';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import { resetForm, updateFormAttribute } from '../../../../actions/form/formUpdateActions';
import { Team } from '../../../../reducers/resource/team';
import { redirectToManagementRoute } from '../../../../actions/routeActions';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>): TeamDetailProps => {
    const teamId = ownProps.match.params.itemId;
    return {
        storedTeam: state.resource.teams.data.get(teamId),
        formTeam: state.form.team.resource,
        isEdit: state.form.team.isEdit
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<ManageItemRouteProps>)
    : TeamDetailFormActions => {
    const teamId = ownProps.match.params.itemId;
    return {
        fetchItem: () => dispatch(fetchTeam(teamId)),
        resetFormItem: (team: Team) => dispatch(resetForm('teams', team)),
        updateAbbreviation: (abbreviation: string) => dispatch(updateFormAttribute(
            'teams', 'abbreviation', abbreviation)
        ),
        updateLocation: (location: string) => dispatch(updateFormAttribute('teams', 'location', location)),
        updateNickname: (nickname: string) => dispatch(updateFormAttribute('teams', 'nickname', nickname)),
        saveTeam: async (team: Team) => {
            const savedId = await dispatch(saveTeam(team));
            dispatch(redirectToManagementRoute('teams', savedId));
        }
    };
};

const TeamDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamDetailForm);

export default TeamDetailContainer;