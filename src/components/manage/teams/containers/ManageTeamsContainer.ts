import { connect, Dispatch } from 'react-redux';
import { deleteTeam, fetchTeams } from '../../../../actions/resourceobjects/teams';
import ManageTeamsForm, { ManageTeamsFormActions, ManageTeamsFormProps } from '../presenters/ManageTeamsForm';
import { RootState } from '../../../../reducers/index';
import { push } from 'react-router-redux';
import { getSafePage, getUrlForPage, Team } from '../../../../models/models';
import { RouteComponentProps } from 'react-router';
import { getObjectsForPage } from '../../../../reducers/data/index';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<{}>): ManageTeamsFormProps => {
    const currentPage = getSafePage(state.data.teams, ownProps.location);
    return {
        teams: getObjectsForPage(state.data.teams, currentPage.page),
        currentView: currentPage,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<{}>)
    : ManageTeamsFormActions => {
    return {
        fetchListItems: (page: number) => () => dispatch(fetchTeams(page)),
        onClickAdd: () => dispatch(push('/manage/teams/add')),
        getPage: (page: number) => () => dispatch(push(getUrlForPage(ownProps.location, page))),
        buildHandleSelectTeamDetail: (team: Team) => () => dispatch(push(`/manage/teams/${team.id}`)),
        buildHandleDeleteTeam: (team: Team) => () => dispatch(deleteTeam(team))
    };
};

const ManageTeamsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageTeamsForm);

export default ManageTeamsContainer;