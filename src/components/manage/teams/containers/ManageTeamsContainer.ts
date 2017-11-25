import { connect, Dispatch } from 'react-redux';
import { deleteTeam, fetchTeams } from '../../../../actions/teams';
import ManageTeamsForm, { ManageTeamsFormActions, ManageTeamsFormProps } from '../presenters/ManageTeamsForm';
import { resetView } from '../../../../actions/currentView';
import { RootState } from '../../../../reducers/index';
import { push } from 'react-router-redux';
import { Team } from '../../../../models/models';

const mapStateToProps = (state: RootState): ManageTeamsFormProps => {
    return {
        teams: Array.from(state.data.teams.values()),
        currentView: state.currentView,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>): ManageTeamsFormActions => {
    return {
        resetView: () => dispatch(resetView()),
        fetchListItems: () => dispatch(fetchTeams(0)),
        onClickAdd: () => dispatch(push('/manage/teams/add')),
        buildHandleSelectTeamDetail: (team: Team) => () => dispatch(push(`/manage/teams/${team.id}`)),
        buildHandleDeleteTeam: (team: Team) => () => dispatch(deleteTeam(team))
    };
};

const ManageTeamsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageTeamsForm);

export default ManageTeamsContainer;