import { connect, Dispatch } from 'react-redux';
import { deleteLeague, fetchLeagues } from '../../../../actions/resource/leaguesActions';
import ManageLeaguesForm, { ManageLeaguesActions, ManageLeaguesProps } from '../presenters/ManageLeaguesForm';
import { RootState } from '../../../../reducers';
import { push } from 'react-router-redux';
import { RouteComponentProps } from 'react-router';
import { PageDescriptor } from '../../../../reducers/resource/page';
import { League } from '../../../../reducers/resource/league';
import { parseQueryParameters } from '../../../../models/models';
import { getResourcePageResult } from '../../teams/containers/ManageTeamsContainer';

const MANAGE_LEAGUES_BASE_URL = '/manage/leagues';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<{}>): ManageLeaguesProps => {
    const currentPage = parseQueryParameters(ownProps.location);
    const pageResults = state.resource.leagues.pages.get(currentPage);
    return {
        leagues: getResourcePageResult(pageResults, state.resource.leagues.getNonNullPageItems(currentPage)),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>): ManageLeaguesActions => {
    return {
        fetchListItems: (page: number) => () => dispatch(fetchLeagues(new PageDescriptor(page))),
        onClickAdd: () => dispatch(push(MANAGE_LEAGUES_BASE_URL + '/add')),
        getPage: (page: number) => () => dispatch(push(MANAGE_LEAGUES_BASE_URL + `?page=${page}`)),
        buildHandleSelectDetail: (league: League) => () => dispatch(push(`${MANAGE_LEAGUES_BASE_URL}/${league.id}`)),
        buildHandleDeleteLeague: (league: League) => () => dispatch(deleteLeague(league))
    };
};

const ManageLeaguesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageLeaguesForm);

export default ManageLeaguesContainer;