import { connect, Dispatch } from 'react-redux';
import { deleteLeague, fetchLeagues } from '../../../../actions/resource/leagues';
import ManageLeaguesForm, { ManageLeaguesActions, ManageLeaguesProps } from '../presenters/ManageLeaguesForm';
import { RootState } from '../../../../reducers/index';
import { push } from 'react-router-redux';
import { getSafePage, League } from '../../../../models/models';
import { RouteComponentProps } from 'react-router';
import { getObjectsForPage } from '../../../../reducers/resource/index';

const MANAGE_LEAGUES_BASE_URL = '/manage/leagues';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<{}>): ManageLeaguesProps => {
    const currentPage = getSafePage(state.resource.leagues, ownProps.location);
    return {
        leagues: getObjectsForPage(state.resource.leagues, currentPage.page),
        currentView: currentPage,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>): ManageLeaguesActions => {
    return {
        fetchListItems: (page: number) => () => dispatch(fetchLeagues(page)),
        onClickAdd: () => dispatch(push(MANAGE_LEAGUES_BASE_URL + 'add')),
        getPage: (page: number) => () => dispatch(push(MANAGE_LEAGUES_BASE_URL + `?page=${page}`)),
        buildHandleSelectDetail: (id: string) => () => dispatch(push(`${MANAGE_LEAGUES_BASE_URL}/${id}`)),
        buildHandleDeleteLeague: (league: League) => () => dispatch(deleteLeague(league))
    };
};

const ManageLeaguesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageLeaguesForm);

export default ManageLeaguesContainer;