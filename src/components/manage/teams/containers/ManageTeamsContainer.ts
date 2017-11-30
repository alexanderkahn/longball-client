import { connect, Dispatch } from 'react-redux';
import { deleteTeam, fetchTeams } from '../../../../actions/teams';
import ManageTeamsForm, { ManageTeamsFormActions, ManageTeamsFormProps } from '../presenters/ManageTeamsForm';
import { resetView } from '../../../../actions/currentView';
import { RootState } from '../../../../reducers/index';
import { push } from 'react-router-redux';
import { getSafePage, Team } from '../../../../models/models';
import { RouteComponentProps } from 'react-router';

const mapStateToProps = (state: RootState): ManageTeamsFormProps => {
    return {
        teams: Array.from(state.data.teams.values()),
        currentView: state.currentView,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<{}>)
    : ManageTeamsFormActions => {
    return {
        resetView: () => dispatch(resetView()),
        fetchListItems: () => dispatch(fetchTeams(getSafePage(ownProps.location))),
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