import { connect, Dispatch } from 'react-redux';
import { deleteTeam, fetchTeams } from '../../../../actions/resourceobjects/teams';
import ManageTeamsForm, { ManageTeamsFormActions, ManageTeamsFormProps } from '../presenters/ManageTeamsForm';
import { RootState } from '../../../../reducers/index';
import { push } from 'react-router-redux';
import { FetchingState, getSafePage, getUrlForPage, hasNext, hasPrevious, Team } from '../../../../models/models';
import { RouteComponentProps } from 'react-router';
import { getObjectsForPage } from '../../../../reducers/data/index';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<{}>): ManageTeamsFormProps => {
    const currentPage = getSafePage(ownProps.location);
    const pageInfo = state.data.teams.pageInfo.pages.get(currentPage);
    return {
        teams: getObjectsForPage(state.data.teams, currentPage),
        currentView: {
            fetchingState: pageInfo ? pageInfo.fetchingState : FetchingState.NOT_FETCHED,
            page: currentPage,
            hasNext: hasNext(state.data.leagues, currentPage),
            hasPrevious: hasPrevious(currentPage),
        },
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<{}>)
    : ManageTeamsFormActions => {
    const currentPage = getSafePage(ownProps.location);
    return {
        fetchListItems: () => dispatch(fetchTeams(currentPage)),
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