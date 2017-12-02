import { connect, Dispatch } from 'react-redux';
import { deleteTeam, fetchTeams } from '../../../../actions/teams';
import ManageTeamsForm, { ManageTeamsFormActions, ManageTeamsFormProps } from '../presenters/ManageTeamsForm';
import { resetView } from '../../../../actions/currentView';
import { RootState } from '../../../../reducers/index';
import { push } from 'react-router-redux';
import { getNext, getPrevious, getSafePage, Team } from '../../../../models/models';
import { RouteComponentProps } from 'react-router';
import { List } from 'immutable';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<{}>): ManageTeamsFormProps => {
    const currentPage = getSafePage(ownProps.location);
    const teamIds = state.data.teams.pageInfo.pages.get(currentPage, List());
    return {
        teams: teamIds.map(id => state.data.teams.data.get(id || '', undefined)).toArray(),
        currentView: state.currentView,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<{}>)
    : ManageTeamsFormActions => {
    const currentPage = getSafePage(ownProps.location);
    const previous = getPrevious(dispatch, ownProps.location, currentPage);
    const next = getNext(dispatch, ownProps.location, currentPage);
    return {
        resetView: () => dispatch(resetView()),
        fetchListItems: () => dispatch(fetchTeams(currentPage)),
        onClickAdd: () => dispatch(push('/manage/teams/add')),
        onClickPrevious: previous,
        onClickNext: next,
        buildHandleSelectTeamDetail: (team: Team) => () => dispatch(push(`/manage/teams/${team.id}`)),
        buildHandleDeleteTeam: (team: Team) => () => dispatch(deleteTeam(team))
    };
};

const ManageTeamsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageTeamsForm);

export default ManageTeamsContainer;