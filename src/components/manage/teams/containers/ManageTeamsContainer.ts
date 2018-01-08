import { connect, Dispatch } from 'react-redux';
import { deleteTeam, fetchTeams } from '../../../../actions/resource/teamsActions';
import ManageTeamsForm, { ManageTeamsFormActions, ManageTeamsFormProps } from '../presenters/ManageTeamsForm';
import { RootState } from '../../../../reducers';
import { push } from 'react-router-redux';
import { getSafePage, Team } from '../../../../models/models';
import { RouteComponentProps } from 'react-router';
import { PageDescriptor } from '../../../../reducers/resource/page';

const MANAGE_TEAMS_BASE_URL = '/manage/teams';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<{}>): ManageTeamsFormProps => {
    const currentPage = getSafePage(state.resource.teams, ownProps.location);
    return {
        teams: state.resource.teams.getNonNullPageItems(new PageDescriptor(currentPage.page)),
        currentView: currentPage,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<{}>)
    : ManageTeamsFormActions => {
    return {
        fetchListItems: (page: number) => () => dispatch(fetchTeams(new PageDescriptor(page))),
        onClickAdd: () => dispatch(push(`${MANAGE_TEAMS_BASE_URL}/add`)),
        getPage: (page: number) => () => dispatch(push(`${MANAGE_TEAMS_BASE_URL}?page=${page}`)),
        buildHandleSelectTeamDetail: (team: Team) => () => dispatch(push(`${MANAGE_TEAMS_BASE_URL}/${team.id}`)),
        buildHandleDeleteTeam: (team: Team) => () => dispatch(deleteTeam(team))
    };
};

const ManageTeamsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageTeamsForm);

export default ManageTeamsContainer;