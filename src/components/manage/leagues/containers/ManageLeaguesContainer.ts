import { connect, Dispatch } from 'react-redux';
import { deleteLeague, fetchLeagues } from '../../../../actions/resourceobjects/leagues';
import ManageLeaguesForm, { ManageLeaguesActions, ManageLeaguesProps } from '../presenters/ManageLeaguesForm';
import { RootState } from '../../../../reducers/index';
import { push } from 'react-router-redux';
import { FetchingState, hasNext, hasPrevious, getSafePage, League, getUrlForPage } from '../../../../models/models';
import { RouteComponentProps } from 'react-router';
import { getObjectsForPage } from '../../../../reducers/data/index';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<{}>): ManageLeaguesProps => {
    const currentPage = getSafePage(ownProps.location);
    const pageInfo = state.data.leagues.pageInfo.pages.get(currentPage);
    return {
        leagues: getObjectsForPage(state.data.leagues, currentPage),
        currentView: {
            page: currentPage,
            hasPrevious: hasPrevious(currentPage),
            hasNext: hasNext(state.data.leagues, currentPage),
            fetchingState: pageInfo ? pageInfo.fetchingState : FetchingState.NOT_FETCHED,
        },
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<{}>): ManageLeaguesActions => {
    const currentPage = getSafePage(ownProps.location);
    return {
        fetchListItems: () => dispatch(fetchLeagues(currentPage)),
        onClickAdd: () => dispatch(push('/manage/leagues/add')),
        getPage: (page: number) => () => dispatch(push(getUrlForPage(ownProps.location, page))),
        buildHandleSelectDetail: (id: string) => () => dispatch(push(`/manage/leagues/${id}`)),
        buildHandleDeleteLeague: (league: League) => () => dispatch(deleteLeague(league))
    };
};

const ManageLeaguesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageLeaguesForm);

export default ManageLeaguesContainer;