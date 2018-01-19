import { connect, Dispatch } from 'react-redux';
import { deleteTeam, fetchTeams } from '../../../../actions/resource/teamsActions';
import ManageTeamsForm, { ManageTeamsFormActions, ManageTeamsFormProps } from '../presenters/ManageTeamsForm';
import { RootState } from '../../../../reducers/rootReducer';
import { push } from 'react-router-redux';
import { RouteComponentProps } from 'react-router';
import { PageDescriptor } from '../../../../reducers/resource/page';
import { Team } from '../../../../reducers/resource/team';
import { parseQueryParameters } from '../../../../models/models';

const MANAGE_TEAMS_BASE_URL = '/manage/teams';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<{}>): ManageTeamsFormProps => {
    const currentPage = parseQueryParameters(ownProps.location);
    return {
        teams: state.resource.teams.getMappedPage(currentPage)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>)
    : ManageTeamsFormActions => {
    return {
        fetchListItems: (page: PageDescriptor) => () => dispatch(fetchTeams(page)),
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