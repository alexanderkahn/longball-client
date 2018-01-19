import { connect, Dispatch } from 'react-redux';
import { deleteLeague, fetchLeagues } from '../../../../actions/resource/leaguesActions';
import ManageLeaguesForm, { ManageLeaguesActions, ManageLeaguesProps } from '../presenters/ManageLeaguesForm';
import { RootState } from '../../../../reducers/rootReducer';
import { push } from 'react-router-redux';
import { RouteComponentProps } from 'react-router';
import { PageDescriptor } from '../../../../reducers/resource/page';
import { League } from '../../../../reducers/resource/league';
import { parseQueryParameters } from '../../../../models/models';

const MANAGE_LEAGUES_BASE_URL = '/manage/leagues';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<{}>): ManageLeaguesProps => {
    const currentPage = parseQueryParameters(ownProps.location);
    return {
        leagues: state.resource.leagues.getMappedPage(currentPage)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>): ManageLeaguesActions => {
    return {
        fetchListItems: (page: PageDescriptor) => () => dispatch(fetchLeagues(page)),
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